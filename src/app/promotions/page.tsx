'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronLeft, Truck } from 'lucide-react';
import mockData from '@/data/mockData.json';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

export default function PromotionsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const allProducts: Product[] = mockData.products as Product[];

  // Filter products that have discount tags or original prices
  const promoProducts = allProducts.filter((p) => p.tag || p.originalPrice);

  const filteredProducts = selectedFilter === 'all'
    ? promoProducts
    : promoProducts.filter((p) => p.category === selectedFilter);

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Promotions</span>
          </Link>
        </div>

        {/* Hero Banner fond Lavender #CCD7EE */}
        <div className="bg-lavender rounded-section p-6 sm:p-10 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 bg-accent text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-2xs">
              <Sparkles size={14} />
              <span>Bons plans de la semaine à Douala</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Promotions & Ventes Flash Santé
            </h1>
            <p className="text-xs sm:text-base text-body leading-relaxed">
              Profitez jusqu&apos;à -25% sur les essentiels de santé, dermatologie et pédiatrie avec livraison express en 1h dans tout Douala.
            </p>
          </div>

          <div className="shrink-0 bg-white/80 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/60 text-center space-y-1 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-accent block">Jusqu&apos;à -25%</span>
            <span className="text-xs text-muted font-bold block">Sur plus de 40 références</span>
            <div className="flex items-center justify-center gap-1 text-[11px] text-primary font-semibold pt-1">
              <Truck size={13} />
              <span>Livré en 1h max</span>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-card text-muted hover:text-ink border border-slate-200'
            }`}
          >
            Toutes les promos ({promoProducts.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('medicaments')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedFilter === 'medicaments'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-card text-muted hover:text-ink border border-slate-200'
            }`}
          >
            Médicaments
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('sante')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedFilter === 'sante'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-card text-muted hover:text-ink border border-slate-200'
            }`}
          >
            Santé & Bien-être
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('hygiene')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedFilter === 'hygiene'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-card text-muted hover:text-ink border border-slate-200'
            }`}
          >
            Hygiène & Beauté
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('bebe')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedFilter === 'bebe'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-card text-muted hover:text-ink border border-slate-200'
            }`}
          >
            Bébé & Maternité
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </main>
  );
}
