import React from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductCarousel } from '@/components/ProductCarousel';
import { CategoryRow } from '@/components/CategoryRow';
import { Reviews } from '@/components/Reviews';
import { PartnerGrid } from '@/components/PartnerGrid';
import { Faq } from '@/components/Faq';
import mockData from '@/data/mockData.json';
import { PRODUCTS_CATALOG } from '@/lib/products';
import type { Product } from '@/types';

export default function HomePage() {
  const allMockProducts: Product[] = mockData.products as Product[];

  // Convert catalog items so we have up to 100 products for filters
  const catalogAsProducts: Product[] = PRODUCTS_CATALOG.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    packaging: p.packaging,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    category: 'medicaments' as const,
    rating: p.rating || 4.8,
    reviewCount: p.reviewCount || 35,
    hasFrenchFlag: true,
  }));

  // Separate products with plenty of inventory for 5, 10, 20, 50, 100 filters
  const medicamentsMap = new Map<string, Product>();
  [
    ...allMockProducts.filter((p) => p.category === 'medicaments'),
    ...catalogAsProducts.filter((p) => p.category === 'medicaments'),
    ...catalogAsProducts,
  ].forEach((p) => {
    if (!medicamentsMap.has(p.name)) medicamentsMap.set(p.name, p);
  });
  const medicaments = Array.from(medicamentsMap.values()).slice(0, 100);

  const promotions = allMockProducts.filter((p) => p.category === 'promotions');
  const nouveautes = allMockProducts.filter((p) => p.category === 'nouveautes');

  return (
    <div className="space-y-6 sm:space-y-10 pb-12 font-sans">
      {/* 4. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 5. SECTION "Médicaments les plus demandés" (Fond Mint) */}
      <ProductCarousel
        id="medicaments-section"
        title="Médicaments les plus demandés"
        products={medicaments}
        bgColorClass="bg-mint"
        ctaLabel="Découvrir toute la sélection"
        ctaLink="/categorie/medicaments"
      />

      {/* 6. LES TOP CATÉGORIES */}
      <CategoryRow />

      {/* 7. SECTION "Promotions" (Fond Lavender) */}
      <ProductCarousel
        id="promotions-section"
        title="Promotions"
        products={promotions}
        bgColorClass="bg-lavender"
        ctaLabel="Voir toutes les promotions"
        ctaLink="/promotions"
      />

      {/* 8. NOS AVIS CLIENTS (Grille 2 colonnes fond pale-green) */}
      <Reviews />

      {/* 9. SECTION "Nouveautés" (Fond Lavender) */}
      <ProductCarousel
        id="nouveautes-section"
        title="Nouveautés"
        products={nouveautes}
        bgColorClass="bg-lavender"
        ctaLabel="Découvrez toutes les nouveautés"
        ctaLink="/categorie/medicaments"
      />

      {/* 10. PHARMACIES PARTENAIRES */}
      <PartnerGrid />

      {/* 11. FAQ ACCORDÉON & COMMENT ÇA MARCHE EN 3 ÉTAPES */}
      <Faq />
    </div>
  );
}
