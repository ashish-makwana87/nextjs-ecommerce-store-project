"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getUserId = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "there was an error",
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
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price") as string);
  const featured = Boolean(formData.get("featured") as string);
  const user = await getUserId();

  await db.product.create({
    data: {
      name,
      company,
      price,
      description,
      featured,
      image: "/e1.JPG",
      clerkId: user.id,
    },
  });

  try {
    return { message: "product created" };
  } catch (error) {
    console.log(error);

    return renderError(error);
  }
};
