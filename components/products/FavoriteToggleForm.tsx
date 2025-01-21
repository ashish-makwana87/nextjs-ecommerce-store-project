"use client";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";

type ToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({favoriteId, productId}: ToggleFormProps) {
  const pathname = usePathname();
  
  const toggleAction = toggleFavoriteAction.bind(null, {productId, favoriteId, pathname})

  return <FormContainer action={toggleAction}>
  <CardSubmitButton isFavorite={favoriteId ? true : false} />
  </FormContainer>
} 

export default FavoriteToggleForm;
