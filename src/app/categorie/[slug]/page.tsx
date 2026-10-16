import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import { PRODUCTS_CATALOG } from '@/lib/products';
import { CatalogView } from '@/components/catalog/CatalogView';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600; // ISR 1 hour

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Catégorie non trouvée | PhamaFind Douala',
    };
  }

  return {
    title: `${category.label} - Pharmacie en ligne à Douala | PhamaFind`,
    description: category.description || `Commandez vos produits de ${category.label} en ligne à Douala avec livraison express en 1h max.`,
    alternates: {
      canonical: `https://phamafind.cm/categorie/${category.slug}`,
    },
    openGraph: {
      title: `${category.label} | PhamaFind Douala`,
      description: category.description,
      url: `https://phamafind.cm/categorie/${category.slug}`,
      siteName: 'PhamaFind Cameroun',
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // Filter products matching this category
  let products = PRODUCTS_CATALOG.filter((p) => p.category === category.slug);

  // If mock data has fewer products in this specific category, include related products so catalog is fully testable
  if (products.length === 0) {
    products = PRODUCTS_CATALOG.slice(0, 12).map((p, idx) => ({
      ...p,
      id: `${category.slug}-mock-${idx}`,
      category: category.slug,
      subCategory: category.children[idx % category.children.length]?.slug || 'general',
    }));
  }

  // Collect available brands
  const brandsSet = new Set<string>();
  products.forEach((p) => {
    if (p.brand) brandsSet.add(p.brand);
  });
  const availableBrands = Array.from(brandsSet).sort();

  return (
    <main className="bg-page min-h-screen py-6 sm:py-10 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center text-muted">Chargement du catalogue...</div>}>
          <CatalogView
            category={category}
            initialProducts={products}
            availableBrands={availableBrands}
          />
        </Suspense>
      </div>
    </main>
  );
}
