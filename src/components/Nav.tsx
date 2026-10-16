'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, Tag, Menu } from 'lucide-react';

// Dynamic import of MegaMenu for performance
const MegaMenu = dynamic(
  () => import('./mega-menu/MegaMenu').then((mod) => mod.MegaMenu),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        className="flex items-center gap-2.5 text-ink hover:text-primary transition-colors py-2"
      >
        <Menu size={20} className="stroke-[2.2]" />
        <span className="font-bold text-sm sm:text-[15px]">Catégories</span>
      </button>
    ),
  }
);

export const Nav: React.FC = () => {
  return (
    <nav className="bg-card border-b border-slate-200/80 font-sans relative z-40">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-7 sm:gap-10 h-12 text-sm sm:text-[15px] font-bold">
          
          {/* MÉGA-MENU "CATÉGORIES" */}
          <MegaMenu />

          {/* Promotions (Accent Color #D6297A) */}
          <Link
            href="/promotions"
            className="flex items-center gap-1.5 text-accent hover:opacity-85 transition-opacity py-2 font-bold"
          >
            <Tag size={15} />
            <span>Promotions</span>
          </Link>

          {/* Par pharmacie */}
          <Link
            href="/pharmacies"
            className="flex items-center gap-1.5 text-body hover:text-primary transition-colors py-2 font-semibold"
          >
            <Building2 size={15} className="text-muted" />
            <span>Par pharmacie</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};
