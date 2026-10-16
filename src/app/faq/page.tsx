'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, HelpCircle, MessageCircle, Search } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  cat: 'livraison' | 'ordonnance' | 'paiement' | 'securite';
}

const FAQ_DATA: FaqItem[] = [
  {
    q: 'Comment fonctionne la livraison de médicaments en 1h à Douala ?',
    a: 'Dès validation de votre commande sur PhamaFind, nos régulateurs attribuent la commande à l’officine partenaire conventionnée la plus proche de votre quartier (Akwa, Bonamoussadi, Bonapriso, Deido, etc.). Un coursier certifié équipé d\'une sacoche isotherme récupère vos produits sous scellé et vous livre directement à votre adresse en moins de 60 minutes.',
    cat: 'livraison',
  },
  {
    q: 'Puis-je commander des médicaments nécessitant une ordonnance ?',
    a: 'Oui absolument. Lors de votre commande, vous pouvez télécharger la photo de votre ordonnance médicale valide. Le pharmacien responsable de l\'officine partenaire vérifie la posologie et l\'authenticité de la prescription avant de préparer la dispensation.',
    cat: 'ordonnance',
  },
  {
    q: 'Quels sont les quartiers de Douala desservis ?',
    a: 'Nous couvrons l\'ensemble de l\'agglomération de Douala : Zone 1 (Akwa, Bonanjo, Bonapriso, Deido, Bali, New Bell, Koumassi) et Zone 2 (Bonamoussadi, Makepe, Kotto, Denver, Logpom, Bepanda, Ndogbong, Cité des Palmiers, PK8 à PK14, Nyalla, Yassa).',
    cat: 'livraison',
  },
  {
    q: 'Quels sont les modes de paiement acceptés ?',
    a: 'Vous pouvez régler par Orange Money Cameroun, MTN Mobile Money (MoMo) directement lors de la commande, ou choisir le paiement en espèces (Cash) à la livraison directement auprès de notre coursier.',
    cat: 'paiement',
  },
  {
    q: 'Comment garantissez-vous la conformité des médicaments ?',
    a: 'PhamaFind collabore exclusivement avec des pharmacies d\'officine agréées par le Ministère de la Santé Publique du Cameroun (MinSanté) et inscrites à l\'Ordre National des Pharmaciens. Aucun produit du marché informel n\'est accepté.',
    cat: 'securite',
  },
  {
    q: 'Comment sont transportés les médicaments thermosensibles (insulines, vaccins) ?',
    a: 'Tous les produits nécessitant une chaîne du froid (2°C - 8°C) sont conditionnés dans des sacoches médicales isothermes certifiées équipées d\'accumulateurs de froid testés.',
    cat: 'securite',
  },
  {
    q: 'Que faire en cas d’urgence la nuit ou le week-end ?',
    a: 'PhamaFind est connecté au réseau des pharmacies de garde de Douala 24h/24 et 7j/7. En cas d\'urgence nocturne, contactez directement notre astreinte médicale via WhatsApp ou par téléphone au +237 681 192 943.',
    cat: 'livraison',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredFaq = FAQ_DATA.filter((item) => {
    const matchesSearch = item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.a.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'all' || item.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

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
            <span>Accueil / Questions fréquentes</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-pale-green text-primary rounded-full flex items-center justify-center mx-auto">
            <HelpCircle size={28} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Foire Aux Questions (FAQ)
          </h1>
          <p className="text-xs sm:text-base text-muted">
            Toutes les réponses sur notre service de commande et de livraison express de médicaments à Douala.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center bg-card rounded-full border border-slate-200 px-4 py-2.5 shadow-xs focus-within:border-primary">
            <Search size={18} className="text-muted mr-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une question (ordonnance, livraison, Orange Money...)"
              className="w-full bg-transparent text-sm text-ink placeholder-product-grey focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCat === 'all' ? 'bg-primary text-white' : 'bg-card border border-slate-200 text-muted hover:text-ink'
            }`}
          >
            Toutes les questions
          </button>
          <button
            type="button"
            onClick={() => setSelectedCat('livraison')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCat === 'livraison' ? 'bg-primary text-white' : 'bg-card border border-slate-200 text-muted hover:text-ink'
            }`}
          >
            Livraison Douala
          </button>
          <button
            type="button"
            onClick={() => setSelectedCat('ordonnance')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCat === 'ordonnance' ? 'bg-primary text-white' : 'bg-card border border-slate-200 text-muted hover:text-ink'
            }`}
          >
            Ordonnances
          </button>
          <button
            type="button"
            onClick={() => setSelectedCat('paiement')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCat === 'paiement' ? 'bg-primary text-white' : 'bg-card border border-slate-200 text-muted hover:text-ink'
            }`}
          >
            Paiements (MoMo)
          </button>
        </div>

        {/* Accordion list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-card rounded-accordion border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-ink hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-body leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions block */}
        <div className="max-w-xl mx-auto bg-pale-green rounded-card p-6 text-center space-y-3">
          <h2 className="font-extrabold text-ink text-base">Vous n&apos;avez pas trouvé votre réponse ?</h2>
          <p className="text-xs text-body">
            Notre service client vous répond directement sur WhatsApp ou par téléphone.
          </p>
          <div className="flex justify-center gap-3 pt-1">
            <a
              href="https://wa.me/237681192943"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-xs hover:bg-[#20bd5a]"
            >
              <MessageCircle size={16} />
              <span>WhatsApp +237 681 192 943</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-card text-ink hover:text-primary rounded-full font-bold text-xs border border-slate-200"
            >
              Formulaire de contact
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
