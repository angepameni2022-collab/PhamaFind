'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { QuickRequestForm } from '@/components/QuickRequestForm';

export default function DemandePage() {
  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Faire une demande</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-pale-green px-3 py-1 rounded-full uppercase">
            <Clock size={13} />
            <span>Réponse en moins de 15 minutes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Faire une demande de médicament à Douala
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Vous ne trouvez pas votre traitement ou vous manquez de temps ? PhamaFind localise votre médicament dans les pharmacies agréées de Douala et vous livre à domicile en 1 heure maximum.
          </p>
        </div>

        {/* The Request Form */}
        <QuickRequestForm />

        {/* Reassurance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="bg-card rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <ShieldCheck size={18} />
              <span>Pharmacies 100% officielles</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Tous nos médicaments proviennent exclusivement d&apos;officines conventionnées agréées par le MinSanté.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <MessageCircle size={18} />
              <span>Assistance directe WhatsApp</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Un régulateur vous accompagne en direct pour toute question ou ordonnance complexe au +237 681 192 943.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
