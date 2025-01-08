import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  
  return (
    <div className="alignment mt-10 md:mt-20">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
