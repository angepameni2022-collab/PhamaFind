'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import mockData from '@/data/mockData.json';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const allProducts: Product[] = mockData.products as Product[];

  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Accueil / Catégories</span>
        </Link>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Catalogue par Univers Santé
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Explorez l&apos;ensemble de nos médicaments, parapharmacie et soins disponibles en stock à Douala.
        </p>
      </div>

      {/* 6 Category Cards / Circles */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {mockData.categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all ${
                isActive
                  ? 'bg-primary/10 border-2 border-primary shadow-xs'
                  : 'bg-card border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center p-2 mb-2 overflow-hidden shadow-2xs">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={60}
                  height={60}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <span className={`text-xs font-bold leading-tight ${isActive ? 'text-primary' : 'text-ink'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter / Reset Bar */}
      <div className="flex items-center justify-between pt-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-ink text-white'
                : 'bg-slate-100 text-muted hover:text-ink'
            }`}
          >
            Tous ({allProducts.length})
          </button>
          <span className="text-xs text-muted font-medium">
            Affichage de {filteredProducts.length} référence{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20 text-muted">Chargement du catalogue...</div>}>
          <CategoriesContent />
        </Suspense>
      </div>
    </main>
  );
}
