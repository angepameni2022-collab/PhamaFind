'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/categories';

interface SubcategoryPanelProps {
  category: Category;
  onLinkClick: () => void;
}

export const SubcategoryPanel: React.FC<SubcategoryPanelProps> = ({
  category,
  onLinkClick,
}) => {
  // Automatically split subcategories into 2 columns (first half left, second half right)
  const midpoint = Math.ceil(category.children.length / 2);
  const leftCol = category.children.slice(0, midpoint);
  const rightCol = category.children.slice(midpoint);

  return (
    <div
      role="region"
      aria-label={`Sous-catégories de ${category.label}`}
      className="flex-1 p-6 sm:p-8 bg-white overflow-y-auto max-h-[70vh] flex flex-col justify-between animate-in fade-in duration-150"
    >
      <div>
        {/* Category Title 20px Bold */}
        <div className="pb-5 border-b border-[#E5E7EB] mb-6">
          <Link
            href={`/categorie/${category.slug}`}
            onClick={onLinkClick}
            className="text-xl font-extrabold text-ink hover:text-primary transition-colors tracking-tight inline-block"
          >
            {category.label}
          </Link>
          {category.description && (
            <p className="text-xs text-muted mt-1 leading-relaxed max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {/* 2 Columns of Subcategories (15px, vertical spacing 14px, hover underline + primary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5">
          {/* Left Column */}
          <div className="space-y-3.5">
            {leftCol.map((sub) => (
              <div key={sub.slug}>
                <Link
                  href={`/categorie/${category.slug}/${sub.slug}`}
                  onClick={onLinkClick}
                  className="text-[15px] font-medium text-body hover:text-primary hover:underline transition-colors block leading-snug"
                >
                  {sub.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3.5">
            {rightCol.map((sub) => (
              <div key={sub.slug}>
                <Link
                  href={`/categorie/${category.slug}/${sub.slug}`}
                  onClick={onLinkClick}
                  className="text-[15px] font-medium text-body hover:text-primary hover:underline transition-colors block leading-snug"
                >
                  {sub.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Underlined Link: "Voir tout [Catégorie]" */}
      <div className="pt-8 mt-6 border-t border-[#E5E7EB]">
        <Link
          href={`/categorie/${category.slug}`}
          onClick={onLinkClick}
          className="inline-flex items-center gap-2 text-base font-extrabold text-primary hover:underline group"
        >
          <span>Voir tout {category.label}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
