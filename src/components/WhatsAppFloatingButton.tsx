'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const handleClick = () => {
    const text = encodeURIComponent(
      "Bonjour PhamaFind, je recherche un médicament en urgence pour une livraison à Douala."
    );
    window.open(`https://wa.me/237681192943?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-2 px-3 py-1.5 bg-ink/90 text-white text-xs font-bold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Besoin d&apos;un médicament ? Écrivez-nous
      </span>

      <button
        onClick={handleClick}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Contacter PhamaFind sur WhatsApp"
      >
        <span className="relative flex h-3 w-3 absolute top-1 right-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle size={28} className="fill-current" />
      </button>
    </div>
  );
};
