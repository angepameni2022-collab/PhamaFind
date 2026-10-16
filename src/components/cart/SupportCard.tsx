'use client';

import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export const SupportCard: React.FC = () => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Bonjour PhamaFind, j\'ai une question concernant ma commande en cours.');
    window.open(`https://wa.me/237681192943?text=${text}`, '_blank');
  };

  return (
    <div className="bg-card rounded-card p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 select-none">
      {/* Hours note */}
      <p className="text-xs sm:text-sm text-muted-blue leading-relaxed font-normal">
        Le service client est à votre écoute du{' '}
        <strong className="font-bold text-ink">lundi au samedi</strong> de{' '}
        <strong className="font-bold text-ink">8h à 20h</strong>.
      </p>

      {/* Contact Line */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-[13px] pt-1 border-t border-slate-100">
        <a
          href="mailto:contact@phamafind.cm"
          className="flex items-center gap-1.5 text-body hover:text-primary transition-colors font-medium"
        >
          <Mail size={16} className="text-[#34D399] shrink-0" />
          <span>Contact</span>
        </a>

        <span className="text-slate-300">•</span>

        <a
          href="tel:+237681192943"
          className="flex items-center gap-1.5 text-body hover:text-primary transition-colors font-bold"
        >
          <Phone size={16} className="text-[#34D399] shrink-0" />
          <span>+237 681 192 943</span>
        </a>
      </div>

      {/* WhatsApp Assistance Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={openWhatsApp}
          className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100/80 text-primary rounded-full text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border border-emerald-200/60"
        >
          <MessageCircle size={16} className="text-primary fill-current" />
          <span>Besoin d&apos;aide ? Écrivez-nous sur WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
