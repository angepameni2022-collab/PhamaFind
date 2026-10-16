'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  Star,
  ChevronDown,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Clock,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Mobile accordion state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    phamafind: false,
    informations: false,
    legales: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setNewsletterError('');
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSent(false);
    }, 4500);
  };

  return (
    <footer id="footer" className="bg-card border-t border-slate-200/90 pt-12 pb-16 font-sans text-body select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ============================================================ */}
        {/* 1. BANDEAU DE RÉASSURANCE HAUT DE FOOTER (4 VRAIES CARTES AVEC ICÔNES) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-6 border-b border-slate-200/80">
          
          {/* Card 1: Livraison 1h */}
          <div className="bg-[#F9F9F9] rounded-2xl p-4 sm:p-5 border border-slate-200/70 flex items-start gap-3.5 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-primary flex items-center justify-center shrink-0">
              <Truck size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-ink text-sm sm:text-base leading-tight">
                Livraison en 1h max
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                À domicile ou au bureau dans tous les quartiers de Douala.
              </p>
            </div>
          </div>

          {/* Card 2: 35 Pharmacies Agréées */}
          <div className="bg-[#F9F9F9] rounded-2xl p-4 sm:p-5 border border-slate-200/70 flex items-start gap-3.5 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-ink text-sm sm:text-base leading-tight">
                35 Pharmacies agréées
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Médicaments 100% officiels certifiés par les pharmaciens.
              </p>
            </div>
          </div>

          {/* Card 3: Paiement Sécurisé Mobile Money */}
          <div className="bg-[#F9F9F9] rounded-2xl p-4 sm:p-5 border border-slate-200/70 flex items-start gap-3.5 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <CreditCard size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-ink text-sm sm:text-base leading-tight">
                Paiement Mobile Money
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Orange Money, MTN MoMo ou espèces lors de la livraison.
              </p>
            </div>
          </div>

          {/* Card 4: Service Client & WhatsApp */}
          <div className="bg-[#F9F9F9] rounded-2xl p-4 sm:p-5 border border-slate-200/70 flex items-start gap-3.5 hover:shadow-xs transition-shadow">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="stroke-[2.2] fill-[#25D366] text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-extrabold text-ink text-sm sm:text-base leading-tight">
                Conseil & Suivi 6j/7
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Pharmaciens à votre écoute du lundi au samedi de 8h à 20h.
              </p>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MAIN 2-ZONE GRID (ZONE GAUCHE 4 COLS / ZONE DROITE 8 COLS) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ZONE GAUCHE (Logo, Adresse, Réseaux sociaux réels, Avis Google) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Logo PhamaFind + sous-titre */}
            <div className="space-y-2">
              <Link href="/" className="inline-block group select-none">
                <Image
                  src="/images/logo.png"
                  alt="PhamaFind - Pharmacie en ligne Douala"
                  width={200}
                  height={48}
                  className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <p className="text-xs text-muted italic font-medium">
                Votre pharmacie de recherche et livraison express à Douala
              </p>
            </div>

            {/* Adresse & Contact */}
            <div className="space-y-2.5 text-xs sm:text-[13px] text-body leading-relaxed bg-[#F9F9F9] p-4 rounded-xl border border-slate-200/60">
              <p className="font-medium text-ink">
                Boulevard de la Liberté, Akwa<br />
                BP 2404 Douala, Littoral, Cameroun
              </p>
              
              <div className="pt-1 space-y-1.5 border-t border-slate-200/60">
                <p className="flex items-center gap-2">
                  <Mail size={15} className="text-primary shrink-0" />
                  <a href="mailto:contact@phamafind.cm" className="hover:text-primary transition-colors font-semibold">
                    contact@phamafind.cm
                  </a>
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-primary shrink-0" />
                  <a href="tel:+237681192943" className="hover:text-primary font-extrabold transition-colors">
                    +237 681 192 943
                  </a>
                </p>

                <p className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366] shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.14-1.33c1.43.83 3.1 1.33 4.86 1.33 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.54 0-3-.42-4.26-1.15l-.31-.18-3.07.8.82-2.99-.2-.32C4.33 14.93 3.9 13.51 3.9 12c0-4.47 3.63-8.1 8.1-8.1 4.47 0 8.1 3.63 8.1 8.1 0 4.47-3.63 8.1-8.1 8.1z"/>
                  </svg>
                  <a
                    href="https://wa.me/237681192943"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] font-extrabold text-[#25D366] transition-colors"
                  >
                    WhatsApp : +237 681 192 943
                  </a>
                </p>
              </div>
            </div>

            {/* Titre "L'actu PhamaFind" + Vraies icônes de réseaux sociaux officielles */}
            <div className="pt-1">
              <span className="font-script font-bold text-[28px] text-accent leading-none block mb-3">
                L&apos;actu PhamaFind
              </span>

              {/* Vraies icônes avec SVG officiels et couleurs authentiques */}
              <div className="flex items-center gap-2.5">
                {/* WhatsApp Officiel (#25D366) */}
                <a
                  href="https://wa.me/237681192943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  title="Nous contacter sur WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"/>
                  </svg>
                </a>

                {/* Facebook Officiel (#1877F2) */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  title="Page Facebook PhamaFind"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram Dégradé Officiel */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
                  title="Compte Instagram PhamaFind"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
                  </svg>
                </a>

                {/* LinkedIn Officiel (#0A66C2) */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#084e96] flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  title="LinkedIn PhamaFind"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.32a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
                  </svg>
                </a>

                {/* TikTok Officiel (#000000) */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black hover:bg-slate-800 flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  title="TikTok PhamaFind"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.48 6.27 6.27 0 0 0 1.87-4.47V8.71a8.21 8.21 0 0 0 4.9 1.6V6.85a4.8 4.8 0 0 1-1-.16Z"/>
                  </svg>
                </a>

                {/* YouTube Officiel (#FF0000) */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF0000] hover:bg-[#cc0000] flex items-center justify-center text-white shadow-xs hover:scale-110 transition-all"
                  title="Chaîne YouTube PhamaFind"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Avis clients Google vérifiés (avec vrai logo Google 4 couleurs) */}
            <div className="pt-2 bg-[#F9F9F9] rounded-2xl p-4 border border-slate-200/60 space-y-2">
              <div className="flex items-center gap-2">
                {/* Vrai logo Google multichrome */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span className="font-extrabold text-sm text-ink">Avis clients certifiés</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-ink">4,9</span>
                <div className="flex text-star">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-star text-star" />
                  ))}
                </div>
                <span className="text-xs text-muted font-bold">(100+ avis)</span>
              </div>

              <div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-link underline pt-0.5"
                >
                  <span>Consulter tous les avis vérifiés</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

          </div>

          {/* ZONE DROITE (Newsletter, 3 Colonnes de liens, Réassurance) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Encadré NEWSLETTER fond #DAF2E8, rayon 16px, padding généreux */}
            <div className="bg-newsletter rounded-[20px] p-6 sm:p-8 shadow-xs border border-emerald-900/5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-emerald-200/80 text-primary flex items-center justify-center">
                  <Mail size={13} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-ink">
                  Restez informé des gardes & promotions
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed max-w-2xl">
                Recevez chaque semaine la liste officielle des pharmacies de garde à Douala et des conseils de santé personnalisés.
              </p>

              <form onSubmit={handleNewsletter} className="mt-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center max-w-lg">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    className="w-full sm:flex-1 bg-white text-ink placeholder-product-grey text-xs sm:text-sm px-4 py-3 rounded-full sm:rounded-r-none border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
                    aria-label="Adresse mail pour la newsletter"
                  />
                  <button
                    type="submit"
                    className="mt-2 sm:mt-0 bg-accent hover:bg-accent-link text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full sm:rounded-l-none shrink-0 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    S&apos;inscrire
                  </button>
                </div>

                {newsletterError && (
                  <p className="text-xs text-danger font-medium mt-1.5">{newsletterError}</p>
                )}

                {newsletterSent && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-bold mt-2 animate-in fade-in">
                    <CheckCircle2 size={16} />
                    <span>Merci pour votre inscription à la newsletter PhamaFind !</span>
                  </div>
                )}
              </form>
            </div>

            {/* 3 COLONNES DE LIENS DU PIED DE PAGE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
              
              {/* Colonne 1 : PhamaFind */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('phamafind')}
                  className="w-full md:pointer-events-none flex items-center justify-between font-bold text-ink text-[16px] sm:text-[17px] pb-2 md:pb-3 border-b md:border-b-0 border-slate-100"
                >
                  <span>PhamaFind</span>
                  <ChevronDown
                    size={16}
                    className={`md:hidden transition-transform ${openSections.phamafind ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <ul className={`space-y-[10px] text-xs sm:text-sm text-body pt-2 md:pt-0 ${openSections.phamafind ? 'block' : 'hidden md:block'}`}>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors font-medium">Qui sommes-nous ?</Link>
                  </li>
                  <li>
                    <Link href="/comment-ca-marche" className="hover:text-primary transition-colors font-medium">Comment ça marche ?</Link>
                  </li>
                  <li>
                    <Link href="/demande" className="hover:text-primary transition-colors font-medium">Demander un médicament</Link>
                  </li>
                  <li>
                    <Link href="/suivi" className="hover:text-primary transition-colors font-medium">Suivi de commande</Link>
                  </li>
                  <li>
                    <Link href="/tarifs-zones" className="hover:text-primary transition-colors font-medium">Tarifs & Zones Douala</Link>
                  </li>
                  <li>
                    <Link href="/pharmacies" className="hover:text-primary transition-colors font-medium">35 Pharmacies partenaires</Link>
                  </li>
                  <li>
                    <Link href="/admin" className="text-muted hover:text-primary transition-colors text-xs flex items-center gap-1 font-semibold">
                      <span>Espace Opérateur</span>
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:recrutement@phamafind.cm" className="text-alert font-bold hover:underline">
                      Rejoignez-nous !
                    </a>
                  </li>
                </ul>
              </div>

              {/* Colonne 2 : Informations */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('informations')}
                  className="w-full md:pointer-events-none flex items-center justify-between font-bold text-ink text-[16px] sm:text-[17px] pb-2 md:pb-3 border-b md:border-b-0 border-slate-100"
                >
                  <span>Informations & Santé</span>
                  <ChevronDown
                    size={16}
                    className={`md:hidden transition-transform ${openSections.informations ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <ul className={`space-y-[10px] text-xs sm:text-sm text-body pt-2 md:pt-0 ${openSections.informations ? 'block' : 'hidden md:block'}`}>
                  <li>
                    <Link href="/livraison" className="hover:text-primary transition-colors font-medium">Livraison express en 1h</Link>
                  </li>
                  <li>
                    <Link href="/mentions-legales#cgv" className="hover:text-primary transition-colors font-medium">Réclamation & Rétractation</Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-primary transition-colors font-medium">FAQ & Aide</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary transition-colors font-medium">Contact Service Client</Link>
                  </li>
                  <li>
                    <Link href="/mentions-legales#partenariats" className="hover:text-primary transition-colors font-medium">Rappels de lots pharmaceutiques</Link>
                  </li>
                </ul>
              </div>

              {/* Colonne 3 : Informations légales */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('legales')}
                  className="w-full md:pointer-events-none flex items-center justify-between font-bold text-ink text-[16px] sm:text-[17px] pb-2 md:pb-3 border-b md:border-b-0 border-slate-100"
                >
                  <span>Informations légales</span>
                  <ChevronDown
                    size={16}
                    className={`md:hidden transition-transform ${openSections.legales ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <ul className={`space-y-[10px] text-xs sm:text-sm text-body pt-2 md:pt-0 ${openSections.legales ? 'block' : 'hidden md:block'}`}>
                  <li>
                    <Link href="/mentions-legales#mentions" className="hover:text-primary transition-colors font-medium">Mentions légales</Link>
                  </li>
                  <li>
                    <Link href="/mentions-legales#confidentialite" className="hover:text-primary transition-colors font-medium">Données personnelles & Santé</Link>
                  </li>
                  <li>
                    <Link href="/mentions-legales#cgv" className="hover:text-primary transition-colors font-medium">Conditions Générales de Vente</Link>
                  </li>
                  <li>
                    <Link href="/promotions" className="hover:text-primary transition-colors font-medium">Conditions des offres</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => alert("Vos préférences de cookies sont enregistrées.")}
                      className="hover:text-primary transition-colors text-left font-medium"
                    >
                      Gérer mes cookies
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Row inside Zone Droite */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-muted">
                <Clock size={16} className="text-primary shrink-0" />
                <span className="font-semibold text-ink">Livraison 7j/7 de 8h à 20h</span>
                <span className="text-slate-300">•</span>
                <span>Nuit : Pharmacies de garde</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-ink">Besoin d&apos;assistance ?</span>
                <Link
                  href="/contact"
                  className="border border-accent-link text-accent-link hover:bg-accent-soft font-extrabold text-xs px-5 py-2 rounded-full transition-all active:scale-95 shadow-2xs"
                >
                  Nous contacter
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. LOGOS DE PAIEMENT OFFICIELS & COPYRIGHT FINAL              */}
        {/* ============================================================ */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Vrais Logos de Paiement Officiels */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold text-muted mr-1">Moyens de paiement acceptés :</span>
              
              {/* Vrai Logo Orange Money Cameroun */}
              <div
                className="h-8 px-3 rounded-lg bg-black text-white flex items-center gap-2 shadow-xs border border-black"
                title="Orange Money Cameroun"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF7900] shadow-2xs shrink-0" />
                <span className="font-black text-xs tracking-tight">Orange Money</span>
              </div>

              {/* Vrai Logo MTN MoMo */}
              <div
                className="h-8 px-3 rounded-lg bg-[#FFCC00] text-[#004F71] flex items-center gap-2 shadow-xs border border-amber-300"
                title="MTN Mobile Money"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#004F71] flex items-center justify-center text-white text-[7px] font-black shrink-0">
                  M
                </div>
                <span className="font-black text-xs tracking-tight text-[#004F71]">MTN MoMo</span>
              </div>

              {/* Vrai Logo Visa */}
              <div
                className="h-8 px-3 rounded-lg bg-white text-[#1A1F71] flex items-center gap-1 shadow-xs border border-slate-200"
                title="Carte Bancaire Visa"
              >
                <span className="font-black text-xs tracking-wider italic text-[#1A1F71]">VISA</span>
              </div>

              {/* Vrai Logo Mastercard (Deux cercles entrelacés) */}
              <div
                className="h-8 px-3 rounded-lg bg-white flex items-center gap-1.5 shadow-xs border border-slate-200"
                title="Mastercard"
              >
                <div className="flex -space-x-1.5 shrink-0">
                  <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                  <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
                <span className="font-bold text-[11px] text-slate-800">mastercard</span>
              </div>

              {/* Paiement Cash à la livraison */}
              <div
                className="h-8 px-3 rounded-lg bg-emerald-50 text-primary flex items-center gap-1.5 shadow-xs border border-emerald-200"
                title="Paiement en espèces à la livraison"
              >
                <span className="font-bold text-xs">💵 Espèces</span>
              </div>
            </div>

            {/* Badges de sécurité SSL & Ordre des Pharmaciens */}
            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/70">
                <Lock size={12} className="text-primary" />
                <span className="font-semibold text-ink">SSL 256 bits sécurisé</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/70">
                <ShieldCheck size={13} className="text-primary" />
                <span className="font-semibold text-ink">Officines agréées ONPC</span>
              </div>
            </div>

          </div>

          {/* Copyright text */}
          <div className="text-center text-xs text-product-grey pt-2 border-t border-slate-100">
            <p>
              © 2026 PhamaFind Cameroun. Tous droits réservés. Plateforme technologique de recherche et de livraison de médicaments en liaison avec les pharmacies d&apos;officine légalement autorisées à Douala.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
