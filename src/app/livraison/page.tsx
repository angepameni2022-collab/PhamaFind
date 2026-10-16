'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, ChevronLeft, PackageCheck } from 'lucide-react';

export default function LivraisonPage() {
  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Livraison</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">
            <Truck size={14} />
            <span>Service Express Douala</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Livraison de médicaments en 1h max à Douala
          </h1>
          <p className="text-xs sm:text-base text-muted leading-relaxed">
            PhamaFind assure la distribution sécurisée de vos produits de santé depuis les officines partenaires jusqu&apos;à votre domicile ou lieu de travail.
          </p>
        </div>

        {/* 3 Value Props Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 bg-pale-green text-primary rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h2 className="font-extrabold text-ink text-base">Délai garanti : moins de 1h</h2>
            <p className="text-xs text-muted leading-relaxed">
              Pour toute commande passée entre 8h et 20h, un coursier est immédiatement dispatché vers la pharmacie la plus proche de votre repère.
            </p>
          </div>

          <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 bg-pale-green text-primary rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-extrabold text-ink text-base">Chaîne du froid respectée</h2>
            <p className="text-xs text-muted leading-relaxed">
              Vaccins, insulines et probiotiques sont transportés dans des caissons isothermes thermostatés garantissant une température entre 2°C et 8°C.
            </p>
          </div>

          <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 bg-pale-green text-primary rounded-xl flex items-center justify-center">
              <PackageCheck size={24} />
            </div>
            <h2 className="font-extrabold text-ink text-base">Paquet scellé et confidentiel</h2>
            <p className="text-xs text-muted leading-relaxed">
              Vos médicaments sont emballés sous scellé inviolable en officine avec étiquette confidentielle pour protéger votre vie privée médicale.
            </p>
          </div>
        </div>

        {/* Zones and Pricing Grid */}
        <div className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <h2 className="text-xl font-extrabold text-ink pb-2 border-b border-slate-100">
            Zones tarifaires de livraison à Douala
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zone 1 */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-ink text-lg">Zone 1 : Centre & Périphérie proche</span>
                <span className="text-primary font-black text-lg">1 000 FCFA</span>
              </div>
              <p className="text-xs font-bold text-primary">
                ★ Livraison OFFERTE dès 15 000 FCFA d&apos;achats
              </p>
              <div className="text-xs text-muted space-y-1 pt-1">
                <p className="font-semibold text-ink">Quartiers desservis :</p>
                <p>Akwa, Bonanjo, Bonapriso, Deido, Bali, New Bell, Koumassi.</p>
              </div>
            </div>

            {/* Zone 2 */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-ink text-lg">Zone 2 : Nord, Est & Périphérie</span>
                <span className="text-primary font-black text-lg">2 000 FCFA</span>
              </div>
              <p className="text-xs font-bold text-primary">
                ★ Livraison OFFERTE dès 25 000 FCFA d&apos;achats
              </p>
              <div className="text-xs text-muted space-y-1 pt-1">
                <p className="font-semibold text-ink">Quartiers desservis :</p>
                <p>Bonamoussadi, Makepe, Kotto, Denver, Logpom, Bepanda, Ndogbong, Cité des Palmiers, PK8 à PK14, Nyalla, Yassa.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-emerald-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all active:scale-95 shadow-sm"
          >
            Commander mes médicaments maintenant
          </Link>
        </div>

      </div>
    </main>
  );
}
