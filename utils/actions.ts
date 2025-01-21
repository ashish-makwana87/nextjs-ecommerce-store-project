"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

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
    where: { id: productId, clerkId: user.id },
    select: { id: true },
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
    
    if(favoriteId) {
      await db.favorite.delete({where: {id: favoriteId}})
    } else {
      await db.favorite.create({data: {productId: productId, clerkId: user.id}})
    }
    revalidatePath(pathname)
    return { message: favoriteId ? 'Removed from favorites' : 'Added to favorites' };
  } catch (error) {
    console.log(error);
    
    return renderError(error)
  }
};
