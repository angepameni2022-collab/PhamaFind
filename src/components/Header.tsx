'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { AnimatedSearch } from '@/components/AnimatedSearch';

export const Header: React.FC = () => {
  const { cartCount, favorites } = useShop();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-slate-200/90 shadow-xs font-sans">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          
          {/* 1. OFFICIAL PHAMAFIND LOGO */}
          <Link href="/" className="flex items-center shrink-0 group select-none py-1">
            <Image
              src="/images/logo.png"
              alt="PhamaFind - Pharmacie en ligne Douala"
              width={190}
              height={46}
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>

          {/* 2. DESKTOP ANIMATED SEARCH BAR (Rotating placeholder, autocomplete & voice search) */}
          <AnimatedSearch className="flex-1 max-w-2xl lg:max-w-3xl hidden md:block" />

          {/* 3. RIGHT ICONS (Compte, Favoris, Panier) */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            
            {/* Compte */}
            <Link
              href="/compte"
              className="flex flex-col items-center text-muted hover:text-primary transition-colors group"
              aria-label="Mon compte"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                <User size={24} className="stroke-[1.8]" />
              </div>
              <span className="text-xs font-semibold text-body -mt-0.5">Compte</span>
            </Link>

            {/* Favoris */}
            <Link
              href="/favoris"
              className="flex flex-col items-center text-muted hover:text-primary transition-colors group relative"
              aria-label="Mes favoris"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                <Heart
                  size={24}
                  className={`stroke-[1.8] ${
                    favorites.length > 0 ? 'text-accent fill-accent' : ''
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-body -mt-0.5">Favoris</span>
            </Link>

            {/* Panier with circular primary badge */}
            <Link
              href="/panier"
              className="flex flex-col items-center text-muted hover:text-primary transition-colors group relative"
              aria-label="Mon panier"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors relative">
                <ShoppingBag size={24} className="stroke-[1.8]" />
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-semibold text-body -mt-0.5">Panier</span>
            </Link>

          </div>

        </div>

        {/* MOBILE ANIMATED SEARCH BAR (underneath logo + icons) */}
        <AnimatedSearch className="mt-2.5 md:hidden" isMobile />

      </div>
    </header>
  );
};
