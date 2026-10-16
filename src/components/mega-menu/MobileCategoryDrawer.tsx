'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES, Category } from '@/lib/categories';

interface MobileCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileCategoryDrawer: React.FC<MobileCategoryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tiroir des catégories"
      className="fixed inset-0 z-50 bg-white flex flex-col md:hidden overflow-hidden animate-in slide-in-from-left duration-200"
    >
      {/* Header bar of drawer */}
      <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-card shrink-0">
        {selectedCategory ? (
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-primary min-h-[48px] px-2"
          >
            <ArrowLeft size={18} />
            <span>Toutes les catégories</span>
          </button>
        ) : (
          <span className="font-extrabold text-base text-ink">
            Toutes les catégories PhamaFind
          </span>
        )}

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-slate-500 hover:text-ink min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="Fermer le menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {!selectedCategory ? (
          /* LEVEL 1: LIST OF 13 CATEGORIES */
          CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className="w-full min-h-[52px] px-5 py-3.5 flex items-center justify-between text-left text-body hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-semibold text-ink leading-snug">
                {cat.label}
              </span>
              <ChevronRight size={18} className="text-slate-400 shrink-0 ml-2" />
            </button>
          ))
        ) : (
          /* LEVEL 2: SUBCATEGORIES OF SELECTED CATEGORY */
          <div className="p-5 space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-ink">{selectedCategory.label}</h2>
              {selectedCategory.description && (
                <p className="text-xs text-muted mt-1">{selectedCategory.description}</p>
              )}
            </div>

            <div className="divide-y divide-slate-100">
              {selectedCategory.children.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/categorie/${selectedCategory.slug}/${sub.slug}`}
                  onClick={onClose}
                  className="min-h-[48px] py-3 flex items-center text-sm font-medium text-body hover:text-primary transition-colors"
                >
                  <span>{sub.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href={`/categorie/${selectedCategory.slug}`}
                onClick={onClose}
                className="w-full min-h-[48px] bg-accent-soft hover:bg-accent hover:text-white text-accent font-extrabold text-sm rounded-full flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Voir tout {selectedCategory.label}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
