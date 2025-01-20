"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { uploadImage } from "./supabase";

const getClerkId = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }
  return user;
};

const getAdminUser = async () => {

  const user = await getClerkId(); 

  if (user.id !== process.env.ADMIN_USER_ID ) redirect('/')

    return user; 
}

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
  orderBy: {createdAt: 'desc'} 
 })

return products;
} 