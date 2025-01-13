import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import { Suspense } from "react";


export default function Home() {
  
  return (
    <div className="alignment mt-8 md:mt-16">
      <HeroSection />
      <Suspense fallback={<LoadingContainer />}>
      <FeaturedProducts />
      </Suspense>
    </div>
  );
}
