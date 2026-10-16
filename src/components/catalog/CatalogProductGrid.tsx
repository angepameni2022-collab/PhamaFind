'use client';

import React, { useState } from 'react';
import { CatalogProductCard } from './CatalogProductCard';
import { CatalogEmptyState } from './CatalogEmptyState';
import { ProductCatalogItem } from '@/lib/products';
import { ArrowDown } from 'lucide-react';

interface CatalogProductGridProps {
  products: ProductCatalogItem[];
  onResetFilters?: () => void;
}

const PAGE_SIZE = 20;

export const CatalogProductGrid: React.FC<CatalogProductGridProps> = ({
  products,
  onResetFilters,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Aria Live Announcement of results */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}.
      </div>

      {products.length === 0 ? (
        <CatalogEmptyState onResetFilters={onResetFilters} />
      ) : (
        <>
          {/* Responsive Product Grid: 5 cols (1400px), 4 (1200px), 3 (tablet), 2 (mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
            {displayedProducts.map((product) => (
              <div key={product.id} className="h-full">
                <CatalogProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination: "Voir plus de produits" (20 per batch) */}
          {hasMore && (
            <div className="text-center pt-8 pb-4">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-card hover:bg-white text-accent-link border border-slate-200 font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <span>Voir plus de produits ({products.length - visibleCount} restants)</span>
                <ArrowDown size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
