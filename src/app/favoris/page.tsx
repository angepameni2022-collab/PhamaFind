'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ChevronLeft } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import mockData from '@/data/mockData.json';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

export default function FavorisPage() {
  const { favorites } = useShop();

  const allProducts: Product[] = mockData.products as Product[];
  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Continuer mes achats</span>
          </Link>

          <span className="text-xs font-semibold text-muted">
            {favorites.length} article{favorites.length > 1 ? 's' : ''} dans vos favoris
          </span>
        </div>

        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center text-accent">
            <Heart size={24} className="fill-accent text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Mes Favoris
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Retrouvez facilement les médicaments et produits de soins que vous commandez régulièrement à Douala.
            </p>
          </div>
        </div>

        {/* Content */}
        {favoriteProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-card p-10 sm:p-14 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Heart size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-ink">Vous n&apos;avez pas encore de favoris</h2>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
                Cliquez sur le petit cœur présent sur chaque produit pour l&apos;ajouter à votre liste et le retrouver rapidement.
              </p>
            </div>

            <Link
              href="/"
              className="inline-block bg-primary hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all active:scale-95 shadow-sm"
            >
              Découvrir les médicaments
            </Link>
          </div>
        )}

        {/* Suggestions section if empty or few items */}
        {favoriteProducts.length === 0 && (
          <div className="pt-8 space-y-4">
            <h3 className="text-lg font-extrabold text-ink">
              Les produits les plus demandés à Douala
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {allProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
