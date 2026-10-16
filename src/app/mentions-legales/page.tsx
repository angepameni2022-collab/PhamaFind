'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft, FileText, Lock, Building } from 'lucide-react';

export default function MentionsLegalesPage() {
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
            <span>Accueil / Informations Légales</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Mentions Légales & Conditions Générales de Vente
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Cadre réglementaire de l&apos;activité de mise en relation et de livraison pharmaceutique à Douala.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-body leading-relaxed">
          
          {/* Section 1: Mentions légales */}
          <section id="mentions" className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-base border-b border-slate-100 pb-2">
              <Building size={18} />
              <h2>1. Éditeur de la plateforme</h2>
            </div>
            <p>
              Le service <strong>PhamaFind</strong> est exploité par la société <strong>PhamaFind Cameroun SARL</strong>, immatriculée au Registre du Commerce et du Crédit Mobilier de Douala sous le numéro RC/DLA/2024/B/1842.<br />
              <strong>Siège social :</strong> Boulevard de la Liberté, Akwa, BP 2404 Douala, République du Cameroun.<br />
              <strong>Numéro de téléphone :</strong> +237 681 192 943<br />
              <strong>Courriel :</strong> contact@phamafind.cm<br />
              <strong>Directeur de la publication :</strong> Dr. Pharmacien Régulateur en Chef, inscrit au tableau de l&apos;Ordre National des Pharmaciens du Cameroun (ONPC).
            </p>
          </section>

          {/* Section 2: Convention avec les officines */}
          <section id="partenariats" className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-base border-b border-slate-100 pb-2">
              <ShieldCheck size={18} />
              <h2>2. Activité pharmaceutique & Partenariats</h2>
            </div>
            <p>
              PhamaFind est une solution technologique de mise en relation et de transport express. Conformément à la réglementation pharmaceutique en vigueur au Cameroun régie par le Ministère de la Santé Publique (MinSanté) :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted pl-2">
              <li>Tous les médicaments présentés sur la plateforme sont dispensés et facturés exclusivement par nos officines de pharmacie partenaires dûment autorisées.</li>
              <li>Aucune commande de médicament soumis à prescription médicale obligatoire ne peut être délivrée sans le contrôle et la validation préalable d&apos;une ordonnance valide par un pharmacien diplômé.</li>
              <li>Les coursiers mandatés par PhamaFind sont tenus au respect strict du secret médical et à l&apos;intégrité des emballages scellés.</li>
            </ul>
          </section>

          {/* Section 3: CGV */}
          <section id="cgv" className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-base border-b border-slate-100 pb-2">
              <FileText size={18} />
              <h2>3. Conditions Générales de Vente (CGV)</h2>
            </div>
            <div className="space-y-2">
              <p><strong>Prix et Monnaie :</strong> Les prix sont affichés en Francs CFA (FCFA) toutes taxes comprises. Les prix sont fixés en accord avec la grille tarifaire homologuée des spécialités pharmaceutiques au Cameroun.</p>
              <p><strong>Modes de règlement :</strong> Les paiements sont sécurisés par Orange Money (+237), MTN Mobile Money (+237) ou réglés en espèces (Cash) à la remise de la commande scellée.</p>
              <p><strong>Droit de rétractation et Retours :</strong> En application des règles de santé publique et de sécurité sanitaire, les médicaments délivrés ne peuvent faire l&apos;objet d&apos;aucune reprise ni d&apos;aucun échange une fois remis au client (sauf erreur de préparation imputable à l&apos;officine).</p>
            </div>
          </section>

          {/* Section 4: Données personnelles */}
          <section id="confidentialite" className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-base border-b border-slate-100 pb-2">
              <Lock size={18} />
              <h2>4. Protection des Données Personnelles et Santé</h2>
            </div>
            <p>
              Les données à caractère personnel collectées (nom, téléphone, adresse de livraison, ordonnances) sont traitées en conformité avec la législation camerounaise sur la protection des données et le secret professionnel médical.
              Ces données sont strictement destinées au traitement logistique de vos commandes et ne sont en aucun cas commercialisées à des tiers.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}
