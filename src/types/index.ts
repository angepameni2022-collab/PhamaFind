export interface Product {
  id: string;
  name: string;
  description: string;
  packaging: string;
  price: number; // in FCFA
  originalPrice?: number; // in FCFA
  pricePrefix?: string; // e.g. "À partir de"
  image: string;
  rating: number;
  reviewCount: number;
  tag?: string; // "-20%", "1 cadeau", "-15%", "-2€"
  category: 'medicaments' | 'promotions' | 'nouveautes';
  hasFrenchFlag?: boolean;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PartnerPharmacy {
  id: string;
  name: string;
  shortName: string;
  neighborhood: string;
}
