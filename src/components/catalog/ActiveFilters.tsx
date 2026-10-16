'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ProductFilters } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';
import { formatFCFA } from '@/lib/format';

interface ActiveFiltersProps {
  filters: ProductFilters;
  onRemoveFilter: (key: keyof ProductFilters, value?: string) => void;
  onResetAll: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onResetAll,
}) => {
  // Collect all active chips
  const chips: { label: string; onRemove: () => void }[] = [];

  // Search chip
  if (filters.search) {
    chips.push({
      label: `Recherche: "${filters.search}"`,
      onRemove: () => onRemoveFilter('search'),
    });
  }

  // Subcategories
  if (filters.subCategories && filters.subCategories.length > 0) {
    filters.subCategories.forEach((slug) => {
      // Find label
      let subLabel = slug;
      CATEGORIES.forEach((c) => {
        const found = c.children.find((s) => s.slug === slug);
        if (found) subLabel = found.label;
      });
      chips.push({
        label: subLabel,
        onRemove: () => onRemoveFilter('subCategories', slug),
      });
    });
  }

  // Brands
  if (filters.brands && filters.brands.length > 0) {
    filters.brands.forEach((brand) => {
      chips.push({
        label: brand,
        onRemove: () => onRemoveFilter('brands', brand),
      });
    });
  }

  // Forms
  if (filters.forms && filters.forms.length > 0) {
    filters.forms.forEach((form) => {
      chips.push({
        label: `Forme: ${form}`,
        onRemove: () => onRemoveFilter('forms', form),
      });
    });
  }

  // Target Audiences
  if (filters.targetAudiences && filters.targetAudiences.length > 0) {
    filters.targetAudiences.forEach((aud) => {
      chips.push({
        label: `Pour: ${aud}`,
        onRemove: () => onRemoveFilter('targetAudiences', aud),
      });
    });
  }

  // Price range
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const minText = filters.minPrice !== undefined ? formatFCFA(filters.minPrice) : '0 FCFA';
    const maxText = filters.maxPrice !== undefined ? formatFCFA(filters.maxPrice) : '+∞';
    chips.push({
      label: `Prix: ${minText} - ${maxText}`,
      onRemove: () => {
        onRemoveFilter('minPrice');
        onRemoveFilter('maxPrice');
      },
    });
  }

  // Available now
  if (filters.availableNow) {
    chips.push({
      label: 'Disponible maintenant',
      onRemove: () => onRemoveFilter('availableNow'),
    });
  }

  // Without prescription
  if (filters.withoutPrescription) {
    chips.push({
      label: 'Sans ordonnance',
      onRemove: () => onRemoveFilter('withoutPrescription'),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold text-muted mr-1">Filtres actifs :</span>
      {chips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 bg-card border border-slate-200 text-ink text-xs font-semibold px-3 py-1 rounded-full shadow-2xs group"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            className="text-slate-400 group-hover:text-accent transition-colors"
            aria-label={`Supprimer le filtre ${chip.label}`}
          >
            <X size={13} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-bold text-accent-link hover:underline ml-1"
      >
        Réinitialiser tout
      </button>
    </div>
  );
};
