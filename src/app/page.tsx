import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/home/ProductGrid";
import { SocialProof } from "@/components/home/SocialProof";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <ProductGrid />
      <SocialProof />
    </div>
  );
}
