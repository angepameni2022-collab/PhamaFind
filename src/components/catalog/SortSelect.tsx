'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/lib/products';

interface SortSelectProps {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="catalog-sort" className="text-xs sm:text-sm font-semibold text-muted hidden sm:inline">
        Trier par :
      </label>
      <div className="relative">
        <select
          id="catalog-sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-card border border-slate-200 hover:border-slate-300 rounded-full pl-3.5 pr-8 py-2 text-xs sm:text-sm font-bold text-ink focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
        >
          <option value="relevance">Pertinence</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="newest">Nouveautés</option>
          <option value="rating">Mieux notés</option>
        </select>
        <ArrowUpDown size={14} className="text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};
