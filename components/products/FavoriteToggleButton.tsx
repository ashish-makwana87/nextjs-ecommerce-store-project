import { auth } from "@clerk/nextjs/server";
import { fetchFavoriteId } from "@/utils/actions";
import { CardSignInButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  const { userId } = auth();
  if (!userId) {
    return <CardSignInButton />;
  }

  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />;
}

export default FavoriteToggleButton;
