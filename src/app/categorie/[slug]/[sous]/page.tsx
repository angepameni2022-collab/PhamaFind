import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, getSubcategory } from '@/lib/categories';
import { PRODUCTS_CATALOG } from '@/lib/products';
import { CatalogView } from '@/components/catalog/CatalogView';

interface SubcategoryPageProps {
  params: {
    slug: string;
    sous: string;
  };
}

export const revalidate = 3600; // ISR 1 hour

export async function generateStaticParams() {
  const paths: { slug: string; sous: string }[] = [];

  CATEGORIES.forEach((cat) => {
    cat.children.forEach((sub) => {
      paths.push({
        slug: cat.slug,
        sous: sub.slug,
      });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const result = getSubcategory(params.slug, params.sous);

  if (!result) {
    return {
      title: 'Sous-catégorie non trouvée | PhamaFind Douala',
    };
  }

  const { category, subcategory } = result;

  return {
    title: `${subcategory.label} - ${category.label} | PhamaFind Douala`,
    description: `Achetez vos produits de ${subcategory.label} (${category.label}) en pharmacie en ligne à Douala. Livraison express en 1h garantie.`,
    alternates: {
      canonical: `https://phamafind.cm/categorie/${category.slug}/${subcategory.slug}`,
    },
    openGraph: {
      title: `${subcategory.label} - ${category.label} | PhamaFind Douala`,
      description: `Achetez vos produits de ${subcategory.label} en pharmacie en ligne à Douala.`,
      url: `https://phamafind.cm/categorie/${category.slug}/${subcategory.slug}`,
      siteName: 'PhamaFind Cameroun',
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const result = getSubcategory(params.slug, params.sous);

  if (!result) {
    notFound();
  }

  const { category, subcategory } = result;

  // Filter products matching this subcategory or category
  let products = PRODUCTS_CATALOG.filter(
    (p) => p.category === category.slug && p.subCategory === subcategory.slug
  );

  // If mock data has fewer products in this specific subcategory, include category products
  if (products.length === 0) {
    const parentProducts = PRODUCTS_CATALOG.filter((p) => p.category === category.slug);
    products = (parentProducts.length > 0 ? parentProducts : PRODUCTS_CATALOG.slice(0, 10)).map(
      (p, idx) => ({
        ...p,
        id: `${subcategory.slug}-mock-${idx}`,
        category: category.slug,
        subCategory: subcategory.slug,
      })
    );
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
            subcategory={subcategory}
            initialProducts={products}
            availableBrands={availableBrands}
          />
        </Suspense>
      </div>
    </main>
  );
}
