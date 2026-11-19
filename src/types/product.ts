export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  installments: string;
  rating: number;
  reviewsCount: number;
  stockLeft: number;
  images: string[];
  variants: {
    colors?: { name: string; hex: string }[];
    sizes?: string[];
  };
  features: string[];
  description: string;
}
