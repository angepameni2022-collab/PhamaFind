'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Building2, Truck, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Vous demandez',
      description: 'Indiquez le nom de votre médicament ou envoyez la photo de votre ordonnance (sur le site en 60s ou via WhatsApp).',
      badge: 'Moins de 60s',
      icon: Search,
      color: 'bg-emerald-50 text-primary border-emerald-200',
    },
    {
      step: '02',
      title: 'On localise',
      description: 'PhamaFind interroge en temps réel ses 35 pharmacies partenaires agréées à Douala pour confirmer la disponibilité et le prix officiel.',
      badge: '35 pharmacies agréées',
      icon: Building2,
      color: 'bg-pink-50 text-accent border-pink-200',
    },
    {
      step: '03',
      title: 'Livré en 1h max',
      description: 'Un coursier certifié muni d\'une sacoche isotherme récupère le paquet scellé et vous livre. Paiement par Orange Money, MTN MoMo ou Espèces.',
      badge: 'Garantie 1h chrono',
      icon: Truck,
      color: 'bg-emerald-50 text-primary border-emerald-200',
    },
  ];

  return (
    <section className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans select-none">
      <div className="bg-white rounded-section p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-pale-green px-3 py-1 rounded-full uppercase">
              <Clock size={13} />
              <span>Processus simple & rapide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Comment fonctionne PhamaFind ?
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Le service d&apos;intermédiation pharmaceutique qui vous évite les trajets inutiles et le manque de médicaments à Douala.
            </p>
          </div>

          <Link
            href="/comment-ca-marche"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline self-start md:self-auto"
          >
            <span>Voir les zones et détails complets</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-slate-300">
                      {st.step}
                    </span>
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center ${st.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-primary bg-white px-2.5 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">
                    {st.badge}
                  </span>

                  <h3 className="text-lg font-extrabold text-ink">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-body leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner under steps */}
        <div className="bg-pale-green rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-ink font-semibold">
            <ShieldCheck size={20} className="text-primary shrink-0" />
            <span>Médicaments dispensés exclusivement par des officines agréées par le MinSanté Cameroun.</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/tarifs-zones"
              className="text-primary hover:underline font-bold text-xs"
            >
              Grille des tarifs par quartier →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
