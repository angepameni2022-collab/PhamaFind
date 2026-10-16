'use client';

import React from 'react';
import { CreditCard, Truck } from 'lucide-react';

export const PaymentBadges: React.FC = () => {
  return (
    <div className="space-y-2.5 pt-2 select-none">
      {/* 1. Bandeau Paiement Sécurisé */}
      <div className="bg-info-bar rounded-[8px] px-3.5 py-2.5 flex items-center justify-between gap-2 border border-emerald-900/5">
        <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-[13px]">
          <CreditCard size={18} className="shrink-0 stroke-[2.2]" />
          <span>Paiement sécurisé</span>
        </div>

        {/* Payment logos: Orange Money, MTN MoMo, Visa/Mastercard */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Orange Money Badge */}
          <div
            className="h-5 px-1.5 rounded bg-black text-white flex items-center gap-1 font-black text-[9px] tracking-tight shadow-2xs"
            title="Paiement Orange Money Cameroun"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7900]"></span>
            <span>Orange Money</span>
          </div>

          {/* MTN MoMo Badge */}
          <div
            className="h-5 px-1.5 rounded bg-[#FFCC00] text-black flex items-center gap-1 font-black text-[9px] tracking-tight shadow-2xs"
            title="Paiement MTN Mobile Money"
          >
            <span className="w-2 h-2 rounded-full bg-[#004F71]"></span>
            <span>MoMo</span>
          </div>

          {/* Visa / Master mini indicator */}
          <div className="h-5 px-1.5 rounded bg-white text-slate-700 flex items-center gap-0.5 font-bold text-[9px] border border-slate-200">
            <span className="text-[#1A1F71] font-black">VISA</span>
          </div>
        </div>
      </div>

      {/* 2. Bandeau Livraison Express Douala */}
      <div className="bg-info-bar rounded-[8px] px-3.5 py-2.5 flex items-center gap-2.5 border border-emerald-900/5 text-primary">
        <Truck size={18} className="shrink-0 stroke-[2.2]" />
        <span className="text-xs sm:text-[13px] font-bold leading-tight">
          Livré en 1h max pour toute commande passée entre 8h et 20h
        </span>
      </div>
    </div>
  );
};
