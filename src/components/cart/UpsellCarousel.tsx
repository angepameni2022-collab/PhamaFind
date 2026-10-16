'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatFCFA } from '@/lib/format';

interface UpsellProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  pricePrefix?: string;
  rating?: number;
  reviewCount?: number;
  hasFrenchFlag?: boolean;
  promoTag?: string;
  hasFormats?: boolean;
}

const UPSELL_PRODUCTS: UpsellProduct[] = [
  {
    id: 'up-1',
    name: 'La Roche Posay Effaclar lotion astringente micro-exfoliante',
    image: '/images/products/effaclar.webp',
    price: 6800,
    hasFrenchFlag: true,
  },
  {
    id: 'up-2',
    name: 'Bioderma Atoderm Huile de douche ultra-nourrissante',
    image: '/images/products/bioderma-atoderm.webp',
    price: 2950,
    pricePrefix: 'À partir de',
    rating: 4.9,
    reviewCount: 41,
    hasFrenchFlag: true,
    hasFormats: true,
  },
  {
    id: 'up-3',
    name: 'Citrate de Bétaïne UPSA 2 g Citron effervescent',
    image: '/images/products/upsa-betaine.webp',
    price: 2500,
    rating: 4.8,
    reviewCount: 94,
    hasFrenchFlag: true,
  },
  {
    id: 'up-4',
    name: 'Marimer Hypertonique Nez bouché spray marin stérile',
    image: '/images/products/marimer.webp',
    price: 1900,
    originalPrice: 2550,
    promoTag: '-2 000 FCFA',
    pricePrefix: 'À partir de',
    rating: 4.9,
    reviewCount: 11,
    hasFrenchFlag: true,
  },
];

export const UpsellCarousel: React.FC = () => {
  const { addItem, toggleFavorite, isFavorite } = useCart();

  return (
    <section className="space-y-4 pt-4 select-none font-sans">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-ink">
          Complétez votre commande
        </h2>
        <span className="text-xs font-bold text-muted bg-white px-2.5 py-1 rounded-full border border-slate-200">
          Sélection recommandée
        </span>
      </div>

      {/* Responsive Grid: All cards 100% visible, zero cards cut in half! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {UPSELL_PRODUCTS.map((product) => {
          const favorite = isFavorite(product.id);

          return (
            <div
              key={product.id}
              className="w-full bg-card rounded-[12px] border border-slate-200/90 p-4 shadow-xs relative flex items-center gap-3.5 transition-all duration-200 hover:shadow-md group"
            >
              {/* Promo Badge top left if applicable */}
              {product.promoTag && (
                <div className="absolute top-2 left-2 z-10 bg-accent text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-2xs whitespace-nowrap">
                  {product.promoTag}
                </div>
              )}

              {/* Product Image on Left (w-20 to w-24) */}
              <div className="w-20 sm:w-24 h-24 sm:h-28 flex items-center justify-center shrink-0 bg-white rounded-md p-1 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={90}
                  height={90}
                  className="max-h-full max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info on Right */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Top: Flag + Favorite Heart */}
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    {product.hasFrenchFlag && (
                      <span
                        className="w-3.5 h-2.5 rounded-xs border border-slate-200 inline-block overflow-hidden"
                        title="Origine France"
                      >
                        <svg viewBox="0 0 3 2" className="w-full h-full">
                          <rect width="1" height="2" fill="#002395" />
                          <rect width="1" height="2" x="1" fill="#FFFFFF" />
                          <rect width="1" height="2" x="2" fill="#ED2939" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    className="text-slate-400 hover:text-accent p-1 transition-colors"
                    aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Heart
                      size={17}
                      className={`transition-colors ${
                        favorite ? 'text-accent fill-accent' : 'stroke-[1.8]'
                      }`}
                    />
                  </button>
                </div>

                {/* Name (2 lines max) */}
                <h3 className="font-bold text-ink text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[34px]">
                  {product.name}
                </h3>

                {/* Rating if present */}
                {product.rating && (
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex text-star">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i < Math.floor(product.rating || 0)
                              ? 'fill-star text-star'
                              : 'text-slate-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-product-grey font-medium whitespace-nowrap">
                      {product.rating.toFixed(1)} ({product.reviewCount})
                    </span>
                  </div>
                )}

                {/* Price Row: accent bold - guaranteed on one line */}
                <div className="flex items-baseline gap-1.5 pt-0.5 flex-wrap">
                  {product.pricePrefix && (
                    <span className="text-[10px] text-product-grey whitespace-nowrap">{product.pricePrefix}</span>
                  )}
                  <span className="text-sm sm:text-base font-extrabold text-accent whitespace-nowrap">
                    {formatFCFA(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-product-grey line-through font-normal whitespace-nowrap">
                      {formatFCFA(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Pill Button: "Ajouter au panier" or "Voir le produit" */}
                <div className="pt-1">
                  {product.hasFormats ? (
                    <button
                      type="button"
                      onClick={() => alert(`Formats disponibles pour : ${product.name}`)}
                      className="w-full py-1.5 px-3 rounded-full border border-accent text-accent hover:bg-accent-soft text-xs font-bold transition-all active:scale-95 text-center bg-white"
                    >
                      Voir le produit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.image,
                          packaging: 'Format standard',
                        })
                      }
                      className="w-full py-1.5 px-3 rounded-full bg-accent-soft hover:bg-[#fadce8] text-accent text-xs font-bold transition-all active:scale-95 text-center"
                    >
                      Ajouter au panier
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
