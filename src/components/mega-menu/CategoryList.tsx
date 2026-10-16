'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/lib/categories';

interface CategoryListProps {
  categories: Category[];
  activeSlug: string;
  onSelectCategory: (slug: string) => void;
  onKeyDown?: (e: React.KeyboardEvent, index: number) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeSlug,
  onSelectCategory,
  onKeyDown,
}) => {
  return (
    <div
      role="menu"
      aria-label="Catégories principales"
      className="w-full md:w-[320px] shrink-0 border-r border-[#E5E7EB] bg-white overflow-y-auto max-h-[70vh] divide-y divide-[#E5E7EB]"
    >
      {categories.map((cat, idx) => {
        const isActive = cat.slug === activeSlug;
        return (
          <button
            key={cat.slug}
            id={`category-item-${idx}`}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            aria-haspopup="true"
            aria-expanded={isActive}
            onMouseEnter={() => onSelectCategory(cat.slug)}
            onFocus={() => onSelectCategory(cat.slug)}
            onClick={() => onSelectCategory(cat.slug)}
            onKeyDown={(e) => onKeyDown && onKeyDown(e, idx)}
            className={`w-full h-14 px-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none outline-none ${
              isActive
                ? 'bg-[#D5E5E1] text-primary font-bold'
                : 'text-ink hover:bg-[#D5E5E1]/60 hover:text-primary font-medium'
            }`}
          >
            <span className="text-[15px] sm:text-base leading-snug line-clamp-1 pr-2">
              {cat.label}
            </span>
            <ChevronRight
              size={18}
              className={`shrink-0 transition-transform ${
                isActive ? 'text-primary translate-x-0.5' : 'text-[#374151]'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
