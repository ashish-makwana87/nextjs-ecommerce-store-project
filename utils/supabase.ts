import { createClient } from "@supabase/supabase-js";

const bucket = "main-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (!data) {
    throw new Error("Image upload failed");
  }

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};


export const deleteImage = async(url: string) => {
 
  const imageUrl = url.split('/').pop(); 
  if(!imageUrl) throw new Error('count not find image in a database')

  return supabase.storage.from(bucket).remove([imageUrl]);
}