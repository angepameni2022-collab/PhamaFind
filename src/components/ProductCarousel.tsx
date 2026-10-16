'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

interface ProductCarouselProps {
  id?: string;
  title: string;
  products: Product[];
  bgColorClass: string; // e.g. 'bg-mint' or 'bg-lavender'
  ctaLabel?: string;
  ctaLink?: string;
}

const LIMIT_OPTIONS = [5, 10, 20, 50, 100];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  id,
  title,
  products,
  bgColorClass,
  ctaLabel = 'Découvrir toute la sélection',
  ctaLink,
}) => {
  // Number filter from 5, 10 up to 100 (default 5 for perfect 5-col desktop layout)
  const [limit, setLimit] = useState<number>(5);

  const displayedProducts = products.slice(0, limit);

  return (
    <section id={id} className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-sans">
      <div className={`${bgColorClass} rounded-section p-5 sm:p-7 md:p-9 relative`}>
        
        {/* Section Header: Title on Left, Number Filter (5, 10 ... 100) on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
              {title}
            </h2>
            <span className="text-xs font-extrabold text-primary bg-white/90 px-2.5 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              {displayedProducts.length} affiché{displayedProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Number filter: 5, 10 jusqu'à 100 */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-xs font-extrabold text-muted mr-1">Afficher :</span>
            
            {/* Desktop & Tablet: Pills 5, 10, 20, 50, 100 */}
            <div className="hidden sm:flex items-center gap-1.5">
              {LIMIT_OPTIONS.map((val) => {
                const isActive = limit === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLimit(val)}
                    className={`min-w-[38px] h-8 px-2.5 rounded-full text-xs font-black transition-all active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-white/85 hover:bg-white text-ink border border-slate-200/70 hover:border-slate-300'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>

            {/* Mobile: Clean select with 5, 10, 20, 50, 100 */}
            <div className="sm:hidden relative">
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="h-8 pl-3 pr-7 bg-white text-ink text-xs font-black rounded-full border border-slate-200 shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                {LIMIT_OPTIONS.map((val) => (
                  <option key={val} value={val}>
                    {val} produits
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Grid: All products 100% visible, zero products cut in half! */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 items-stretch">
          {displayedProducts.map((product) => (
            <div key={product.id} className="h-full flex">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Centered White Pill Button under the section */}
        <div className="flex justify-center mt-7">
          {ctaLink ? (
            <Link
              href={ctaLink}
              className="bg-card hover:bg-white text-accent-link font-extrabold text-xs sm:text-sm md:text-base px-7 py-3 sm:px-9 sm:py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-slate-100/80 inline-flex items-center justify-center gap-2"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setLimit((prev) => Math.min(100, prev + 5))}
              className="bg-card hover:bg-white text-accent-link font-extrabold text-xs sm:text-sm md:text-base px-7 py-3 sm:px-9 sm:py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-slate-100/80 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
