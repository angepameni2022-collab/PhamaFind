'use client';

import React from 'react';
import Link from 'next/link';
import { PackageSearch, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

interface CatalogEmptyStateProps {
  onResetFilters?: () => void;
}

export const CatalogEmptyState: React.FC<CatalogEmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="bg-card rounded-card p-8 sm:p-12 text-center border border-slate-200/80 shadow-2xs space-y-6 max-w-2xl mx-auto my-6">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <PackageSearch size={34} />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-ink">
          Aucun produit ne correspond à vos critères
        </h3>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Essayez d&apos;élargir vos filtres de prix, de forme ou de marque, ou consultez nos autres univers de santé disponibles à Douala.
        </p>
      </div>

      {/* Reset filters button if available */}
      {onResetFilters && (
        <div>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-bold text-xs sm:text-sm transition-colors"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      )}

      {/* Suggested categories pills */}
      <div className="pt-2">
        <span className="text-xs font-bold text-muted block mb-3">
          Suggestions de catégories :
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-body rounded-full text-xs font-semibold transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* WhatsApp Support Callout */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs text-muted mb-2.5">
          Vous cherchez une spécialité pharmaceutique rare à Douala ?
        </p>
        <a
          href="https://wa.me/237681192943?text=Bonjour%20PhamaFind,%20je%20recherche%20un%20médicament%20spécifique"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-xs transition-transform active:scale-95"
        >
          <MessageCircle size={18} />
          <span>Vous ne trouvez pas ? Écrivez-nous sur WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
