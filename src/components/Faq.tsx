'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, Building2, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import mockData from '@/data/mockData.json';

export const Faq: React.FC = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mockData.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq-section" className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-pale-green rounded-section p-6 sm:p-10 lg:p-12 space-y-10">
        
        {/* ============================================================ */}
        {/* PARTIE 1 : COMMENT FONCTIONNE PHAMAFIND ? (Capture 2 intégrée) */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                Processus simple & rapide
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
                Comment fonctionne PhamaFind ?
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                Le service d&apos;intermédiation pharmaceutique qui vous évite les trajets inutiles et le manque de médicaments à Douala.
              </p>
            </div>

            <Link
              href="/tarifs-zones"
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Voir les zones et détails complets</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <div className="bg-card rounded-[20px] p-5 sm:p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-black text-slate-300">01</span>
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
                    <Search size={18} />
                  </div>
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
                  Moins de 60s
                </span>
                <h3 className="font-extrabold text-ink text-base">
                  Vous demandez
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Indiquez le nom de votre médicament ou envoyez la photo de votre ordonnance (sur le site en 60s ou via WhatsApp).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-[20px] p-5 sm:p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-black text-slate-300">02</span>
                  <div className="w-9 h-9 rounded-full bg-rose-50 text-accent flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full mb-2">
                  35 pharmacies agréées
                </span>
                <h3 className="font-extrabold text-ink text-base">
                  On localise
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  PhamaFind interroge en temps réel ses 35 pharmacies partenaires agréées à Douala pour confirmer la disponibilité et le prix officiel.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-[20px] p-5 sm:p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-black text-slate-300">03</span>
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
                    <Truck size={18} />
                  </div>
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
                  Garantie 1h chrono
                </span>
                <h3 className="font-extrabold text-ink text-base">
                  Livré en 1h max
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Un coursier certifié muni d&apos;une sacoche isotherme récupère le paquet scellé et vous livre. Paiement par Orange Money, MTN MoMo ou Espèces.
                </p>
              </div>
            </div>

          </div>

          {/* Reassurance pill */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-emerald-900/10 rounded-xl px-4 py-2.5 text-xs text-emerald-900 font-bold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary shrink-0" />
              <span>Médicaments dispensés exclusivement par des officines agréées par le MinSanté Cameroun.</span>
            </div>
            <Link href="/tarifs-zones" className="hover:underline text-primary shrink-0">
              Grille des tarifs par quartier →
            </Link>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-slate-300/60" />

        {/* ============================================================ */}
        {/* PARTIE 2 : QUESTIONS FRÉQUENTES (ACCORDÉON)                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Title (36-40px, 800, ink) + muted text */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight">
              Questions fréquentes
            </h2>
            <p className="text-xs sm:text-sm text-muted font-normal leading-relaxed">
              Tout ce que vous devez savoir sur le fonctionnement de PhamaFind, la délivrance sécurisée de médicaments et notre service de livraison express à Douala.
            </p>
            <div>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
              >
                <span>Consulter toute la FAQ détaillée</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion of white rounded rows with chevron, first open */}
          <div className="lg:col-span-7 space-y-3">
            {mockData.faq.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item.id}
                  className="bg-card rounded-accordion border border-slate-200/60 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-ink text-xs sm:text-sm hover:text-primary transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 text-muted ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-body font-normal leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                      <p className="whitespace-pre-line">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
