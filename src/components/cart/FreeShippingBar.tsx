'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatFCFA } from '@/lib/format';

export const FreeShippingBar: React.FC = () => {
  const { total, zone1Threshold, zone2Threshold } = useCart();

  // Progress relative to zone 2 (max threshold)
  const maxThreshold = zone2Threshold;
  const progressPercent = Math.min(100, Math.max(0, (total / maxThreshold) * 100));

  const reachedZone1 = total >= zone1Threshold;
  const reachedZone2 = total >= zone2Threshold;

  const remainingForNext = !reachedZone1
    ? zone1Threshold - total
    : !reachedZone2
    ? zone2Threshold - total
    : 0;

  return (
    <div className="bg-card rounded-[12px] border border-[#E5E7EB] p-4 sm:p-5 shadow-xs select-none">
      {/* Top Message */}
      <div className="text-xs sm:text-sm text-body mb-3.5">
        {remainingForNext > 0 ? (
          <p>
            Plus que <span className="font-extrabold text-ink">{formatFCFA(remainingForNext)}</span> pour la livraison offerte {!reachedZone1 ? 'en Zone 1' : 'en Zone 2'}
          </p>
        ) : (
          <p className="font-extrabold text-primary flex items-center gap-1.5">
            <span>🎉</span>
            <span>Félicitations ! Vous bénéficiez de la livraison offerte à Douala.</span>
          </p>
        )}
      </div>

      {/* Progress Track with Milestone Dots */}
      <div className="relative pt-2 pb-6">
        {/* Rail */}
        <div className="w-full h-1 bg-track rounded-full relative overflow-visible">
          {/* Filled Bar */}
          <div
            className="h-1 bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Milestone 1 (Zone 1 - 50%) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                reachedZone1 ? 'bg-primary ring-2 ring-emerald-200' : 'bg-dot'
              }`}
            />
            <div className="absolute top-3 text-center w-28 -translate-x-1/2 left-1/2">
              <span className="block text-[10px] sm:text-[11px] font-bold text-muted uppercase tracking-tight">
                ZONE 1*
              </span>
              <span className="block text-[10px] sm:text-[11px] text-product-grey font-medium">
                1 000 FCFA
              </span>
            </div>
          </div>

          {/* Milestone 2 (Zone 2 - 100%) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                reachedZone2 ? 'bg-primary ring-2 ring-emerald-200' : 'bg-dot'
              }`}
            />
            <div className="absolute top-3 text-center w-28 -translate-x-1/2 left-1/2">
              <span className="block text-[10px] sm:text-[11px] font-bold text-muted uppercase tracking-tight">
                ZONE 2*
              </span>
              <span className="block text-[10px] sm:text-[11px] text-product-grey font-medium">
                2 000 FCFA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Small Legal Note */}
      <p className="text-[10px] sm:text-[11px] text-product-grey mt-2 italic font-normal">
        *Frais selon votre quartier à Douala (Akwa, Bonapriso, Deido, Bonamoussadi, Makepe...)
      </p>
    </div>
  );
};
