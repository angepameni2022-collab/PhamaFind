'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function TarifsZonesPage() {
  const zone1 = [
    'Akwa',
    'Bonanjo',
    'Bonapriso',
    'Deido',
    'Bali',
    'New Bell',
    'Koumassi',
  ];

  const zone2 = [
    'Bonamoussadi',
    'Makepe',
    'Kotto',
    'Denver',
    'Logpom',
    'Bepanda',
    'Ndogbong',
    'Cité des Palmiers',
    'PK8 à PK14',
    'Nyalla',
    'Yassa',
  ];

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Tarifs et zones</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-pale-green px-3 py-1 rounded-full uppercase">
            <Truck size={14} />
            <span>Transparence tarifaire Douala</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Tarifs de livraison par zone à Douala
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
            Grille officielle des frais d&apos;acheminement rapide en 1h max assurés par nos coursiers certifiés équipés de caissons isothermes.
          </p>
        </div>

        {/* 2 Zones Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zone 1 */}
          <div className="bg-card rounded-card p-6 sm:p-8 border-2 border-primary/20 shadow-xs space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Zone 1
            </div>

            <div>
              <span className="text-xs font-extrabold text-primary uppercase">Centre & Périphérie proche</span>
              <h2 className="text-xl font-black text-ink mt-0.5">1 000 FCFA</h2>
              <span className="text-xs text-muted">Délai moyen constaté : 35 à 45 minutes</span>
            </div>

            <div className="bg-pale-green rounded-xl p-3 text-xs text-primary font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>Livraison OFFERTE dès 15 000 FCFA de panier</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-ink block">Quartiers couverts :</span>
              <div className="flex flex-wrap gap-1.5">
                {zone1.map((q) => (
                  <span
                    key={q}
                    className="bg-slate-100 text-body text-xs px-2.5 py-1 rounded-md font-semibold"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Zone 2 */}
          <div className="bg-card rounded-card p-6 sm:p-8 border-2 border-accent/20 shadow-xs space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Zone 2
            </div>

            <div>
              <span className="text-xs font-extrabold text-accent uppercase">Nord, Est & Périphérie</span>
              <h2 className="text-xl font-black text-ink mt-0.5">2 000 FCFA</h2>
              <span className="text-xs text-muted">Délai moyen constaté : 45 à 60 minutes</span>
            </div>

            <div className="bg-accent-soft rounded-xl p-3 text-xs text-accent font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>Livraison OFFERTE dès 25 000 FCFA de panier</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-ink block">Quartiers couverts :</span>
              <div className="flex flex-wrap gap-1.5">
                {zone2.map((q) => (
                  <span
                    key={q}
                    className="bg-slate-100 text-body text-xs px-2.5 py-1 rounded-md font-semibold"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Rules info box (Section 6.5 of PDF) */}
        <div className="bg-card rounded-card p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-extrabold text-ink pb-2 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary" />
            <span>Règles de tarification & Transparence PhamaFind</span>
          </h2>

          <div className="space-y-2.5 text-xs sm:text-sm text-body leading-relaxed">
            <p>
              • <strong>Prix officiel en pharmacie :</strong> Les médicaments sont facturés au prix public homologué par le Ministère de la Santé Publique du Cameroun.
            </p>
            <p>
              • <strong>Frais d&apos;intermédiation :</strong> PhamaFind applique une commission transparente de 15% pour la recherche, la vérification de conformité et la coordination logistique.
            </p>
            <p>
              • <strong>Montants en FCFA entiers :</strong> Aucun centime ni frais caché. Tout montant est annoncé au client avant la validation définitive de la commande.
            </p>
            <p>
              • <strong>Paiements acceptés :</strong> Orange Money, MTN MoMo ou Espèces directement remises au coursier à la réception du colis scellé.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-2">
          <Link
            href="/demande"
            className="inline-block px-8 py-3.5 bg-primary hover:bg-emerald-800 text-white font-extrabold text-sm rounded-full shadow-sm transition-transform active:scale-95"
          >
            Faire une demande de livraison maintenant
          </Link>
        </div>

      </div>
    </main>
  );
}
