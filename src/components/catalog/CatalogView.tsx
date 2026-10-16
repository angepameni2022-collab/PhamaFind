'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { SortSelect } from './SortSelect';
import { ActiveFilters } from './ActiveFilters';
import { FiltersSidebar } from './FiltersSidebar';
import { CatalogProductGrid } from './CatalogProductGrid';
import { Category, SubCategory } from '@/lib/categories';
import {
  ProductCatalogItem,
  ProductFilters,
  SortOption,
  filterProducts,
  sortProducts,
} from '@/lib/products';

interface CatalogViewProps {
  category: Category;
  subcategory?: SubCategory;
  initialProducts: ProductCatalogItem[];
  availableBrands: string[];
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  category,
  subcategory,
  initialProducts,
  availableBrands,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse filters from URL searchParams
  const currentFilters: ProductFilters = useMemo(() => {
    const subParam = searchParams.get('sub');
    const brandParam = searchParams.get('brand');
    const formParam = searchParams.get('form');
    const audienceParam = searchParams.get('audience');
    const breastfeedingParam = searchParams.get('breastfeeding');
    const pregnancyParam = searchParams.get('pregnancy');
    const pharmacyParam = searchParams.get('pharmacy');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const stockParam = searchParams.get('stock');
    const otcParam = searchParams.get('otc');
    const searchParam = searchParams.get('search');

    return {
      subCategories: subcategory
        ? [subcategory.slug]
        : subParam
        ? subParam.split(',').filter(Boolean)
        : undefined,
      brands: brandParam ? brandParam.split(',').filter(Boolean) : undefined,
      forms: formParam ? formParam.split(',').filter(Boolean) : undefined,
      targetAudiences: audienceParam ? audienceParam.split(',').filter(Boolean) : undefined,
      breastfeeding: breastfeedingParam ? breastfeedingParam.split(',').filter(Boolean) : undefined,
      pregnancy: pregnancyParam ? pregnancyParam.split(',').filter(Boolean) : undefined,
      pharmacies: pharmacyParam ? pharmacyParam.split(',').filter(Boolean) : undefined,
      minPrice: minPriceParam ? Number(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
      availableNow: stockParam === 'true',
      withoutPrescription: otcParam === 'true',
      search: searchParam || undefined,
    };
  }, [searchParams, subcategory]);

  // Current sorting option
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(initialProducts, currentFilters);
    return sortProducts(filtered, sortBy);
  }, [initialProducts, currentFilters, sortBy]);

  // Breadcrumbs items
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const list: BreadcrumbItem[] = [
      {
        label: category.label,
        href: `/categorie/${category.slug}`,
      },
    ];

    if (subcategory) {
      list.push({
        label: subcategory.label,
        href: `/categorie/${category.slug}/${subcategory.slug}`,
      });
    }

    return list;
  }, [category, subcategory]);

  // Remove individual filter chip
  const handleRemoveFilter = (key: keyof ProductFilters, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'search' || key === 'minPrice' || key === 'maxPrice' || key === 'availableNow' || key === 'withoutPrescription') {
      if (key === 'search') params.delete('search');
      if (key === 'minPrice') params.delete('minPrice');
      if (key === 'maxPrice') params.delete('maxPrice');
      if (key === 'availableNow') params.delete('stock');
      if (key === 'withoutPrescription') params.delete('otc');
    } else if (value) {
      const currentVals = (currentFilters[key] as string[]) || [];
      const updated = currentVals.filter((v) => v !== value);
      const queryParamKey =
        key === 'subCategories'
          ? 'sub'
          : key === 'brands'
          ? 'brand'
          : key === 'forms'
          ? 'form'
          : key === 'targetAudiences'
          ? 'audience'
          : key === 'pharmacies'
          ? 'pharmacy'
          : key;

      if (updated.length > 0) {
        params.set(queryParamKey, updated.join(','));
      } else {
        params.delete(queryParamKey);
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleResetAll = () => {
    router.push(pathname, { scroll: false });
  };

  const pageTitle = subcategory ? subcategory.label : category.label;

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Header Area: H1 + Count & Sort Select */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''} en pharmacie à Douala
          </p>
        </div>

        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {/* 3. Active Filters Pills */}
      <ActiveFilters
        filters={currentFilters}
        onRemoveFilter={handleRemoveFilter}
        onResetAll={handleResetAll}
      />

      {/* 4. Main 2 Columns: Filters Sidebar (~280px) on Left, Product Grid on Right */}
      <div className="flex flex-col lg:flex-row items-start gap-8 pt-2">
        <FiltersSidebar
          availableSubcategories={category.children}
          availableBrands={availableBrands}
          products={initialProducts}
          currentFilters={currentFilters}
          totalFilteredCount={filteredProducts.length}
        />

        <CatalogProductGrid
          products={filteredProducts}
          onResetFilters={handleResetAll}
        />
      </div>
    </div>
  );
};
