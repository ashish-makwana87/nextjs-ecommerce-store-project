"use server";
import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

const getClerkId = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }
  return user;
};

const getAdminUser = async () => {
  const user = await getClerkId();

  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "there was an error...",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const getSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect("/products");

  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkId();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(productSchema, rawData);
    const file = formData.get("image") as File;

    const validatedImage = validateWithZodSchema(imageSchema, { image: file });
    const imageURL = await uploadImage(validatedImage.image);

    await db.product.create({
      data: { ...validatedData, image: imageURL, clerkId: user.id },
    });
  } catch (error) {
    console.log(error);

    return renderError(error);
  }

  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  await getAdminUser();
  const { productId } = prevState;

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);
    revalidatePath("/admin/products/");

    return { message: "Product deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  await getAdminUser();

  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: { id: productId },
      data: { ...validatedData },
    });

    revalidatePath(`admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    console.log(error);

    return renderError(error);
  }
};

export const updateImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  await getAdminUser();

  try {
    const file = formData.get("image") as File;
    const oldImageUrl = formData.get("url") as string;
    const productId = formData.get("id") as string;
    const validatedImage = validateWithZodSchema(imageSchema, { image: file });
    const imagePath = await uploadImage(validatedImage.image);
    await deleteImage(oldImageUrl);

    await db.product.update({
      where: { id: productId },
      data: { image: imagePath },
    });

    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: "Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getClerkId();

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const { productId, favoriteId, pathname } = prevState;
  const user = await getClerkId();

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from favorites" : "Added to favorites",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteProducts = async () => {
  const user = await getClerkId();

  const products = await db.favorite.findMany({
    where: { clerkId: user.id },
    select: { product: true },
  });

  return products;
};

export const submitReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getClerkId();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({ data: { ...validatedFields, clerkId: user.id } });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  await getClerkId();

  const reviews = await db.review.findMany({ where: { productId } });

  return reviews;
};

export const fetchProductRating = async ({
  productId,
}: {
  productId: string;
}) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: { rating: true },
    _count: { rating: true },
    where: { productId },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getClerkId();

  const reviews = await db.review.findMany({
    where: { clerkId: user.id },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: { select: { image: true, name: true } },
    },
  });

  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getClerkId();

  try {
    await db.review.delete({ where: { id: reviewId, clerkId: user.id } });
    revalidatePath("/reviews");
    return { message: "Review deleted" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (productId: string) => {
  const user = await getClerkId();

  return db.review.findFirst({ where: { productId, clerkId: user.id } });
};

export const fetchCartItems = async () => {
  const user = auth();

  const cart = await db.cart.findFirst({
    where: { clerkId: user.userId || "" },
    select: { numOfItems: true },
  });

  return cart?.numOfItems || 0;
};

export const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({ where: { id: productId } });

  if (!product) throw new Error("Product does not exist");

  return product;
};

const includeProductClause = { cartItems: { include: { product: true } } };

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: { clerkId: userId },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: { clerkId: userId },
      include: includeProductClause,
    });
  }

  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({ where: { cartId, productId } });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: { amount: cartItem.amount + amount },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { cartId, productId, amount },
    });
  }

  return cartItem;
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
  });

  let numOfItems = 0;
  let cartTotal = 0;

  cartItems.forEach((item) => {
    numOfItems += item.amount;
    cartTotal += item.amount * item.product.price;
  });

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: { id: cart.id },
    data: {
      numOfItems,
      cartTotal,
      tax,
      shipping,
      orderTotal,
    },
    include: includeProductClause,
  });

  return currentCart;
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getClerkId();

  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }

  redirect("/cart");
};


export const createOrderAction = async(prevState: any, formData: FormData):Promise<{message: string}> => {

return {message: 'abc'}; 
}