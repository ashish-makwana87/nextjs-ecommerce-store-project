import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, { message: "product name must be of at least 4 characters" }),
  company: z
    .string()
    .min(4, { message: "company name must be of at least 4 characters" }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;

      return wordCount >= 10 && wordCount <= 1000;
    },
    { message: "description must be between 10 and 1000 words" }
  ),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "price must be greater than 0" }),
  featured: z.coerce.boolean(),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }

  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const imageSize = 1024 * 1024;
  const acceptedFileType = ["image/"];

  return z
    .instanceof(File)
    .refine(
      (file) => {
        return !file || file.size <= imageSize;
      },
      { message: "Image must be less than 1MB" }
    )
    .refine(
      (file) => {
        return (
          !file || acceptedFileType.some((item) => file.type.startsWith(item))
        );
      },
      { message: "Invalid file type" }
    );
}
