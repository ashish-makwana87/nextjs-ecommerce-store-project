import { Prisma } from "@prisma/client";

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;


export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
