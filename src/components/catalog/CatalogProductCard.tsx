'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Clock } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { ProductCatalogItem } from '@/lib/products';
import { formatFCFA } from '@/lib/format';
import type { Product } from '@/types';

interface CatalogProductCardProps {
  product: ProductCatalogItem;
}

export const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      packaging: product.packaging,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      hasFrenchFlag: false,
    } as Product);
  };

  return (
    <div className="bg-white/70 hover:bg-white rounded-card p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between h-full select-none group relative border border-transparent hover:border-slate-100">
      
      {/* Top area: Favorite Heart + Badge "Sans ordonnance" or "Pharmacie de garde" */}
      <div>
        <div className="flex items-start justify-between gap-1 mb-1">
          {/* Badge under heart or left side */}
          <div>
            {product.isDuty ? (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Clock size={10} />
                <span>Pharmacie de garde</span>
              </span>
            ) : product.withoutPrescription ? (
              <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Sans ordonnance
              </span>
            ) : null}
          </div>

          {/* Heart favorite button top-right */}
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-accent transition-colors"
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart
              size={19}
              className={`transition-colors ${
                favorite ? 'text-accent fill-accent' : 'stroke-[1.8]'
              }`}
            />
          </button>
        </div>

        {/* Product Image: centered, 160px high, lazy */}
        <div className="relative w-full h-[160px] flex items-center justify-center my-2 overflow-hidden bg-transparent">
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={160}
            loading="lazy"
            className="max-h-full max-w-[88%] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details: Name, description, packaging */}
        <div className="space-y-1 mt-1">
          <h3 className="font-bold text-ink text-base leading-snug line-clamp-2 min-h-[44px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-product-grey line-clamp-2 min-h-[38px] leading-relaxed">
            {product.description}
          </p>

          <p className="text-xs text-slate-400 font-medium line-clamp-1 pt-0.5">
            {product.packaging}
          </p>
        </div>
      </div>

      {/* Bottom Area: Price & Add to Cart button */}
      <div className="mt-4 pt-2 space-y-3">
        {/* Price row right-aligned */}
        <div className="flex items-baseline justify-end gap-1.5 flex-wrap">
          {product.hasFormats && (
            <span className="text-sm text-product-grey font-medium whitespace-nowrap">À partir de</span>
          )}
          {product.originalPrice && (
            <span className="text-xs text-product-grey line-through mr-1 font-normal whitespace-nowrap">
              {formatFCFA(product.originalPrice)}
            </span>
          )}
          <span className="text-[20px] sm:text-[22px] font-black text-accent tracking-tight leading-none whitespace-nowrap">
            {formatFCFA(product.price)}
          </span>
        </div>

        {/* Full-width pill button: bg accent-soft (#FBEAF2), text accent, hover: bg accent, text white */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2.5 sm:py-3 bg-accent-soft hover:bg-accent text-accent hover:text-white font-extrabold text-xs sm:text-[13px] rounded-full transition-all duration-200 active:scale-95 text-center flex items-center justify-center shadow-xs cursor-pointer"
        >
          Ajouter au panier
        </button>
      </div>

    </div>
  );
};
