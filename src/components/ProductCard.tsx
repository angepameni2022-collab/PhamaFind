'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatFCFA } from '@/lib/format';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const favorite = isFavorite(product.id);

  return (
    <div
      id={product.id}
      className="bg-card rounded-[18px] p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col justify-between w-full h-full select-none group relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Top badges & Favorite heart */}
      <div className="flex items-start justify-between gap-1 mb-2">
        {/* Tag on left (e.g. -20%, 1 cadeau) */}
        <div>
          {product.tag ? (
            <span className="inline-block bg-accent text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
              {product.tag}
            </span>
          ) : (
            <span className="w-1 h-1"></span>
          )}
        </div>

        {/* Favorite Heart on right + French flag miniature if applicable */}
        <div className="flex items-center gap-2">
          {product.hasFrenchFlag && (
            <span
              className="w-4 h-3 rounded-xs border border-slate-200 inline-block overflow-hidden"
              title="Fabriqué selon les normes françaises"
            >
              <svg viewBox="0 0 3 2" className="w-full h-full">
                <rect width="1" height="2" fill="#002395" />
                <rect width="1" height="2" x="1" fill="#FFFFFF" />
                <rect width="1" height="2" x="2" fill="#ED2939" />
              </svg>
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-accent transition-colors"
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              size={20}
              className={`transition-colors ${
                favorite ? 'text-accent fill-accent' : 'stroke-[1.8]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Centered Product Image */}
      <div className="relative w-full h-36 sm:h-44 flex items-center justify-center my-2 overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={160}
          className="max-h-full max-w-[90%] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-1.5 mt-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Product Name */}
          <h3 className="font-bold text-ink text-sm sm:text-[15px] leading-snug line-clamp-2 min-h-[42px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Short description in product-grey */}
          <p className="text-xs text-product-grey line-clamp-2 min-h-[32px] leading-relaxed">
            {product.description}
          </p>

          {/* Conditionnement */}
          <p className="text-xs text-product-grey font-medium line-clamp-1 pt-0.5">
            {product.packaging}
          </p>

          {/* Star rating if present */}
          {product.rating && (
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex text-star">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(product.rating || 0) ? 'fill-star text-star' : 'text-slate-300'}
                  />
                ))}
              </div>
              <span className="text-[11px] text-product-grey font-medium">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Price Row: large, bold, accent color (#D6297A) - guaranteed on one line with whitespace-nowrap */}
        <div className="pt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {product.pricePrefix && (
            <span className="text-xs text-muted font-medium whitespace-nowrap">
              {product.pricePrefix}
            </span>
          )}
          <span className="text-lg sm:text-2xl font-black text-accent tracking-tight whitespace-nowrap">
            {formatFCFA(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-product-grey line-through font-normal whitespace-nowrap">
              {formatFCFA(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Full-width pill button: accent-soft background (#FDECF3) and accent text (#D6297A) */}
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="w-full mt-3.5 py-2.5 sm:py-3 bg-accent-soft hover:bg-[#fbd6e6] text-accent font-extrabold text-xs sm:text-[13px] rounded-full transition-all active:scale-95 text-center flex items-center justify-center shadow-xs cursor-pointer"
      >
        Ajouter au panier
      </button>
    </div>
  );
};
