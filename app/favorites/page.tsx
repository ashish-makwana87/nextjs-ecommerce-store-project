import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFavoriteProducts } from "@/utils/actions";

async function FavoritesPage() {
  const favoriteProducts = await fetchFavoriteProducts();

  if (favoriteProducts.length < 1) {
    return (
      <div className='alignment mt-10 md:mt-20'>
        <SectionTitle text='No items found' />
      </div>
    );
  }

  const products = favoriteProducts.map((productObj) => {
    return productObj.product;
  });

  return (
    <div className='alignment mt-10 md:mt-20'>
      <SectionTitle text='Favorite products' />
      <ProductsGrid products={products} />
    </div>
  );
}

export default FavoritesPage;
