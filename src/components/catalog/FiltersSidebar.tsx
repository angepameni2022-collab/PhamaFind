'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Filter, X, Search, RotateCcw } from 'lucide-react';
import { FilterGroup } from './FilterGroup';
import { PriceRange } from './PriceRange';
import { ProductFilters, ProductCatalogItem } from '@/lib/products';
import { SubCategory } from '@/lib/categories';

interface FiltersSidebarProps {
  availableSubcategories: SubCategory[];
  availableBrands: string[];
  products: ProductCatalogItem[];
  currentFilters: ProductFilters;
  totalFilteredCount: number;
}

const PHARMACIES = [
  { id: 'ph-1', name: 'Pharmacie de la Liberté (Akwa)' },
  { id: 'ph-2', name: 'Pharmacie des Palmiers (Bonamoussadi)' },
  { id: 'ph-3', name: 'Pharmacie du Bon Secours (Bonapriso)' },
  { id: 'ph-4', name: 'Pharmacie Saint-Paul (Deido)' },
];

const FORMS = [
  'comprimé',
  'gélule',
  'sachet',
  'sirop',
  'crème',
  'gel',
  'spray',
  'solution buvable',
];

const AUDIENCES = [
  { id: 'adulte', label: 'Adulte' },
  { id: 'enfant', label: 'Enfant' },
  { id: 'bebe', label: 'Bébé' },
  { id: 'senior', label: 'Senior' },
];

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  availableSubcategories,
  availableBrands,
  products,
  currentFilters,
  totalFilteredCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');

  // Local copy of filters before clicking "Appliquer" or changing instant filters
  const [localFilters, setLocalFilters] = useState<ProductFilters>(currentFilters);

  // Filter count helper for subcategories
  const getSubcategoryCount = (subSlug: string) => {
    return products.filter((p) => p.subCategory === subSlug).length;
  };

  const getBrandCount = (brand: string) => {
    return products.filter((p) => p.brand === brand).length;
  };

  const getFormCount = (form: string) => {
    return products.filter((p) => p.form === form).length;
  };

  const toggleArrayFilter = (
    key: 'subCategories' | 'brands' | 'forms' | 'targetAudiences' | 'breastfeeding' | 'pregnancy' | 'pharmacies',
    val: string
  ) => {
    const list = localFilters[key] || [];
    const nextList = list.includes(val) ? list.filter((i) => i !== val) : [...list, val];
    setLocalFilters((prev) => ({ ...prev, [key]: nextList }));
  };

  // Sync to URL searchParams
  const applyFilters = (filtersToApply: ProductFilters = localFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 on filter
    params.delete('page');

    if (filtersToApply.subCategories && filtersToApply.subCategories.length > 0) {
      params.set('sub', filtersToApply.subCategories.join(','));
    } else {
      params.delete('sub');
    }

    if (filtersToApply.brands && filtersToApply.brands.length > 0) {
      params.set('brand', filtersToApply.brands.join(','));
    } else {
      params.delete('brand');
    }

    if (filtersToApply.forms && filtersToApply.forms.length > 0) {
      params.set('form', filtersToApply.forms.join(','));
    } else {
      params.delete('form');
    }

    if (filtersToApply.targetAudiences && filtersToApply.targetAudiences.length > 0) {
      params.set('audience', filtersToApply.targetAudiences.join(','));
    } else {
      params.delete('audience');
    }

    if (filtersToApply.breastfeeding && filtersToApply.breastfeeding.length > 0) {
      params.set('breastfeeding', filtersToApply.breastfeeding.join(','));
    } else {
      params.delete('breastfeeding');
    }

    if (filtersToApply.pregnancy && filtersToApply.pregnancy.length > 0) {
      params.set('pregnancy', filtersToApply.pregnancy.join(','));
    } else {
      params.delete('pregnancy');
    }

    if (filtersToApply.pharmacies && filtersToApply.pharmacies.length > 0) {
      params.set('pharmacy', filtersToApply.pharmacies.join(','));
    } else {
      params.delete('pharmacy');
    }

    if (filtersToApply.minPrice !== undefined) {
      params.set('minPrice', filtersToApply.minPrice.toString());
    } else {
      params.delete('minPrice');
    }

    if (filtersToApply.maxPrice !== undefined) {
      params.set('maxPrice', filtersToApply.maxPrice.toString());
    } else {
      params.delete('maxPrice');
    }

    if (filtersToApply.availableNow) {
      params.set('stock', 'true');
    } else {
      params.delete('stock');
    }

    if (filtersToApply.withoutPrescription) {
      params.set('otc', 'true');
    } else {
      params.delete('otc');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsMobileDrawerOpen(false);
  };

  const resetAllFilters = () => {
    const emptyFilters: ProductFilters = {};
    setLocalFilters(emptyFilters);
    router.push(pathname, { scroll: false });
    setIsMobileDrawerOpen(false);
  };

  // Active filters count
  const activeCount =
    (localFilters.subCategories?.length || 0) +
    (localFilters.brands?.length || 0) +
    (localFilters.forms?.length || 0) +
    (localFilters.targetAudiences?.length || 0) +
    (localFilters.breastfeeding?.length || 0) +
    (localFilters.pregnancy?.length || 0) +
    (localFilters.pharmacies?.length || 0) +
    (localFilters.minPrice ? 1 : 0) +
    (localFilters.maxPrice ? 1 : 0) +
    (localFilters.availableNow ? 1 : 0) +
    (localFilters.withoutPrescription ? 1 : 0);

  // Filtered list of brands matching brandSearch
  const filteredBrands = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase().trim())
  );

  const filterContent = (
    <div className="space-y-4">
      {/* 1. Sous-catégories */}
      {availableSubcategories.length > 0 && (
        <FilterGroup title="Sous-catégories" defaultOpen={true} count={localFilters.subCategories?.length}>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableSubcategories.map((sub) => {
              const isChecked = localFilters.subCategories?.includes(sub.slug) || false;
              const count = getSubcategoryCount(sub.slug);
              return (
                <label
                  key={sub.slug}
                  className="flex items-center justify-between gap-2 text-xs sm:text-sm text-body cursor-pointer hover:text-primary transition-colors py-0.5 select-none"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleArrayFilter('subCategories', sub.slug)}
                      className="rounded-sm text-primary focus:ring-primary h-4 w-4 accent-primary"
                    />
                    <span className="line-clamp-1">{sub.label}</span>
                  </div>
                  <span className="text-[11px] text-muted shrink-0">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {/* 2. Marques / laboratoires */}
      {availableBrands.length > 0 && (
        <FilterGroup title="Marques & Laboratoires" defaultOpen={true} count={localFilters.brands?.length}>
          <div className="space-y-2.5">
            {/* Internal search input */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
              <Search size={14} className="text-muted mr-1.5 shrink-0" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Rechercher une marque..."
                className="w-full bg-transparent focus:outline-none text-ink text-xs placeholder-product-grey"
              />
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredBrands.map((brand) => {
                const isChecked = localFilters.brands?.includes(brand) || false;
                const count = getBrandCount(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center justify-between gap-2 text-xs sm:text-sm text-body cursor-pointer hover:text-primary transition-colors py-0.5 select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArrayFilter('brands', brand)}
                        className="rounded-sm text-primary focus:ring-primary h-4 w-4 accent-primary"
                      />
                      <span className="line-clamp-1">{brand}</span>
                    </div>
                    <span className="text-[11px] text-muted shrink-0">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        </FilterGroup>
      )}

      {/* 3. Prix (FCFA) */}
      <FilterGroup title="Prix (FCFA)" defaultOpen={true}>
        <PriceRange
          min={1000}
          max={45000}
          currentMin={localFilters.minPrice}
          currentMax={localFilters.maxPrice}
          onChange={(minVal, maxVal) => {
            setLocalFilters((prev) => ({ ...prev, minPrice: minVal, maxPrice: maxVal }));
          }}
        />
      </FilterGroup>

      {/* 4. Forme galénique */}
      <FilterGroup title="Forme" defaultOpen={false} count={localFilters.forms?.length}>
        <div className="space-y-2">
          {FORMS.map((form) => {
            const isChecked = localFilters.forms?.includes(form) || false;
            const count = getFormCount(form);
            return (
              <label
                key={form}
                className="flex items-center justify-between gap-2 text-xs sm:text-sm text-body cursor-pointer hover:text-primary transition-colors py-0.5 select-none"
              >
                <div className="flex items-center gap-2 capitalize">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleArrayFilter('forms', form)}
                    className="rounded-sm text-primary focus:ring-primary h-4 w-4 accent-primary"
                  />
                  <span>{form}</span>
                </div>
                <span className="text-[11px] text-muted shrink-0">({count})</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* 5. Pour qui (Public) */}
      <FilterGroup title="Pour qui" defaultOpen={false} count={localFilters.targetAudiences?.length}>
        <div className="space-y-2">
          {AUDIENCES.map((aud) => {
            const isChecked = localFilters.targetAudiences?.includes(aud.id) || false;
            return (
              <label
                key={aud.id}
                className="flex items-center gap-2 text-xs sm:text-sm text-body cursor-pointer hover:text-primary transition-colors py-0.5 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayFilter('targetAudiences', aud.id)}
                  className="rounded-sm text-primary focus:ring-primary h-4 w-4 accent-primary"
                />
                <span>{aud.label}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* 6. Allaitement & Grossesse */}
      <FilterGroup title="Grossesse & Allaitement" defaultOpen={false}>
        <div className="space-y-2.5 text-xs sm:text-sm text-body">
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={localFilters.pregnancy?.includes('compatible') || false}
              onChange={() => toggleArrayFilter('pregnancy', 'compatible')}
              className="rounded-sm text-primary h-4 w-4 accent-primary"
            />
            <span>Compatible femme enceinte</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={localFilters.breastfeeding?.includes('compatible') || false}
              onChange={() => toggleArrayFilter('breastfeeding', 'compatible')}
              className="rounded-sm text-primary h-4 w-4 accent-primary"
            />
            <span>Compatible allaitement</span>
          </label>
        </div>
      </FilterGroup>

      {/* 7. Pharmacie partenaire */}
      <FilterGroup title="Pharmacie partenaire à Douala" defaultOpen={false} count={localFilters.pharmacies?.length}>
        <div className="space-y-2">
          {PHARMACIES.map((ph) => {
            const isChecked = localFilters.pharmacies?.includes(ph.id) || false;
            return (
              <label
                key={ph.id}
                className="flex items-center gap-2 text-xs text-body cursor-pointer hover:text-primary py-0.5 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayFilter('pharmacies', ph.id)}
                  className="rounded-sm text-primary focus:ring-primary h-4 w-4 accent-primary"
                />
                <span>{ph.name}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* 8. Disponible maintenant (Toggle switch) */}
      <div className="bg-card rounded-card border border-[#E5E7EB] p-4 shadow-2xs flex items-center justify-between select-none">
        <div>
          <span className="text-xs sm:text-sm font-bold text-ink block">Disponible maintenant</span>
          <span className="text-[11px] text-muted">En stock dans nos officines à Douala</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={localFilters.availableNow || false}
          onClick={() => {
            const next = !localFilters.availableNow;
            const updated = { ...localFilters, availableNow: next };
            setLocalFilters(updated);
            applyFilters(updated);
          }}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
            localFilters.availableNow ? 'bg-primary' : 'bg-slate-300'
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-xs ${
              localFilters.availableNow ? 'left-5.5' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Actions buttons */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={() => applyFilters()}
          className="w-full py-3 bg-accent hover:bg-accent-link text-white font-extrabold text-sm rounded-full shadow-sm hover:shadow transition-all active:scale-95"
        >
          Appliquer les filtres
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="w-full py-2 text-center text-xs font-bold text-muted hover:text-accent-link transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Réinitialiser les filtres ({activeCount})</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER BUTTON: "Filtres (n)" */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-full py-2.5 px-4 bg-card rounded-full border border-slate-200 text-ink font-bold text-sm flex items-center justify-between shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <span>Filtres</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-extrabold">
            {activeCount}
          </span>
        </button>
      </div>

      {/* DESKTOP SIDEBAR (~280px) */}
      <aside className="hidden lg:block w-[280px] shrink-0 font-sans space-y-4">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-[28px] font-bold text-ink tracking-tight">Filtres</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-bold text-accent-link hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </div>
        {filterContent}
      </aside>

      {/* MOBILE FULL-SCREEN FILTER DRAWER */}
      {isMobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom duration-200"
        >
          {/* Header */}
          <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-card">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <span className="font-extrabold text-base text-ink">Filtres de recherche</span>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold">
                  {activeCount}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="p-2 text-slate-500 hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Fermer les filtres"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable Filters */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            {filterContent}
          </div>

          {/* Sticky Bottom Bar with "Voir les N résultats" */}
          <div className="p-4 border-t border-slate-200 bg-white shadow-lg fixed bottom-0 left-0 right-0 z-10 flex gap-3">
            <button
              type="button"
              onClick={resetAllFilters}
              className="py-3 px-5 border border-slate-200 rounded-full font-bold text-xs text-muted hover:text-ink shrink-0"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              onClick={() => applyFilters()}
              className="flex-1 py-3 bg-accent hover:bg-accent-link text-white font-extrabold text-sm rounded-full shadow-md transition-transform active:scale-95 text-center"
            >
              Voir les {totalFilteredCount} résultat{totalFilteredCount > 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
