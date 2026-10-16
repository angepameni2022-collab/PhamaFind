'use client';

import React from 'react';
import Link from 'next/link';
import mockData from '@/data/mockData.json';

export const PartnerGrid: React.FC = () => {
  const pharmacies = mockData.partnerPharmacies;

  return (
    <section id="partners-section" className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-6">
        
        {/* Header: Title left, Pill button right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Pharmacies partenaires
            </h2>
            <p className="text-sm text-muted mt-1">
              Réseau d&apos;officines agréées à Akwa, Bonapriso, Deido, Bonamoussadi, Makepe, Kotto...
            </p>
          </div>

          <Link
            href="/pharmacies"
            className="bg-card hover:bg-white text-accent-link font-bold text-sm sm:text-[15px] px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all self-start sm:self-auto border border-slate-100"
          >
            Découvrir toutes les pharmacies
          </Link>
        </div>

        {/* Grid of round white badges on centered lines */}
        <div className="bg-slate-50 rounded-section p-6 sm:p-10 border border-slate-100/90">
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 max-w-5xl mx-auto">
            {pharmacies.map((pharm) => (
              <div
                key={pharm.id}
                className="bg-card rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-xs border border-slate-200/80 hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer flex items-center gap-3 group select-none hover:shadow-sm"
                onClick={() => alert(`Pharmacie ${pharm.name} (${pharm.neighborhood}) - Livraison disponible en 1h.`)}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-primary">
                    <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-ink group-hover:text-primary leading-tight">
                    {pharm.name}
                  </span>
                  <span className="text-xs text-muted leading-none mt-0.5">
                    {pharm.neighborhood}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
