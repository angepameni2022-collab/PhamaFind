'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Building2, Truck, ChevronLeft, Clock, MessageCircle } from 'lucide-react';

export default function CommentCaMarchePage() {
  const steps = [
    {
      num: 'Étape 1',
      title: 'Vous indiquez votre médicament',
      subtitle: 'En moins d\'une minute sur le site ou sur WhatsApp',
      desc: 'Saisissez le nom du médicament, la quantité et votre quartier à Douala. Si vous possédez une ordonnance médicale, joignez simplement une photo nette depuis votre téléphone.',
      points: [
        'Formulaire simplifié sans inscription obligatoire préalable',
        'Upload direct de photo d\'ordonnance (JPG, PNG, PDF)',
        'Bouton WhatsApp direct pour les demandes urgentes',
      ],
      icon: Search,
      tag: '60 secondes',
    },
    {
      num: 'Étape 2',
      title: 'PhamaFind localise et confirme le stock',
      subtitle: 'Vérification en temps réel dans les officines agréées',
      desc: 'Notre équipe de régulateurs interroge immédiatement notre réseau de 35 pharmacies partenaires réparties à Akwa, Bonamoussadi, Bonapriso, Deido, etc. Un pharmacien diplômé valide la conformité et le prix officiel homologué.',
      points: [
        'Accès au réseau des pharmacies de garde 24h/24',
        'Prix transparents au tarif officiel MinSanté Cameroun',
        'Confirmation envoyée par SMS / WhatsApp avec le devis total',
      ],
      icon: Building2,
      tag: '10 à 15 minutes',
    },
    {
      num: 'Étape 3',
      title: 'Livraison express à domicile en 1h max',
      subtitle: 'Colis confidentiel scellé et respect de la chaîne du froid',
      desc: 'Dès validation, un coursier certifié muni d\'une sacoche isotherme récupère votre commande sous scellé inviolable en officine et vous livre directement chez vous ou à votre bureau.',
      points: [
        'Garantie de livraison en moins de 60 minutes chrono',
        'Paiement sécurisé : Orange Money, MTN MoMo ou Espèces à la livraison',
        'Suivi de la livraison en direct avec numéro de commande',
      ],
      icon: Truck,
      tag: 'Moins de 1h',
    },
  ];

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Comment ça marche</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-pale-green px-3.5 py-1 rounded-full uppercase">
            <Clock size={14} />
            <span>Service d&apos;intermédiation pharmaceutique</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Comment fonctionne PhamaFind à Douala ?
          </h1>
          <p className="text-xs sm:text-base text-muted leading-relaxed">
            Trouver un médicament en urgence ne devrait pas vous obliger à faire le tour de 5 pharmacies dans les embouteillages. PhamaFind s&apos;occupe de tout en 3 étapes transparentes.
          </p>
        </div>

        {/* 3 Detailed Steps */}
        <div className="space-y-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-card rounded-card p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon size={28} />
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-accent tracking-wider">
                      {st.num}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 text-muted px-2.5 py-0.5 rounded-full">
                      {st.tag}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-ink">{st.title}</h2>
                    <p className="text-xs text-primary font-semibold mt-0.5">{st.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-body leading-relaxed">
                    {st.desc}
                  </p>

                  <ul className="space-y-1.5 text-xs text-muted pt-1">
                    {st.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <div className="bg-gradient-to-r from-emerald-800 to-primary text-white rounded-section p-8 sm:p-10 text-center space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Besoin d&apos;un médicament maintenant ?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Transmettez votre demande en 60 secondes ou contactez directement notre équipe de garde via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/demande"
              className="px-8 py-3.5 bg-accent hover:bg-accent-link text-white font-extrabold text-sm rounded-full shadow-md transition-transform active:scale-95 text-center"
            >
              Remplir le formulaire en 60s
            </Link>

            <a
              href="https://wa.me/237681192943?text=Bonjour%20PhamaFind,%20j'ai%20besoin%20d'un%20médicament%20en%20urgence%20à%20Douala"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm rounded-full shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
