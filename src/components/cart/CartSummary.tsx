'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatFCFA } from '@/lib/format';
import { PaymentBadges } from './PaymentBadges';
import { DOUALA_QUARTERS } from './CartDeliveryForm';

interface CartSummaryProps {
  quarter: string;
  onValidate: () => void;
  isLoading: boolean;
  validatedOrder: {
    orderNumber: string;
    whatsappUrl: string;
  } | null;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  quarter,
  onValidate,
  isLoading,
  validatedOrder,
}) => {
  const { subtotal, discount, cartCount } = useCart();

  // Zone and Delivery Fee calculation
  const currentQuarterInfo =
    DOUALA_QUARTERS.find((q) => q.name === quarter) || DOUALA_QUARTERS[0];
  const isZone1 = currentQuarterInfo.zone === 1;
  const freeThreshold = isZone1 ? 15000 : 25000;
  const rawDeliveryFee = isZone1 ? 1000 : 2000;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryFee = isFreeDelivery ? 0 : rawDeliveryFee;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <div className="bg-card rounded-card p-5 sm:p-6 shadow-xs border border-slate-200/80 space-y-5 select-none font-sans">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-extrabold text-base sm:text-lg text-ink">
          Récapitulatif de la commande
        </h3>
      </div>

      {/* Summary lines */}
      <div className="space-y-3.5 text-xs sm:text-[14px]">
        {/* Sous-total */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink">
            Sous-total ({cartCount} article{cartCount > 1 ? 's' : ''})
          </span>
          <span className="font-bold text-ink">{formatFCFA(subtotal)}</span>
        </div>

        {/* Réduction (displayed in primary if any discount) */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-primary font-bold">
            <span>Réduction</span>
            <span>-{formatFCFA(discount)}</span>
          </div>
        )}

        {/* Frais de livraison dynamically calculated */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-semibold text-ink block">
              Frais de livraison
            </span>
            <span className="text-[11px] text-product-grey font-medium block">
              Douala {quarter} (Zone {currentQuarterInfo.zone})
            </span>
          </div>

          <div className="text-right">
            {isFreeDelivery ? (
              <span className="text-primary font-extrabold text-xs sm:text-sm bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                OFFERT
              </span>
            ) : (
              <span className="font-bold text-ink">{formatFCFA(deliveryFee)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Separator line */}
      <hr className="border-slate-200/90" />

      {/* Total with aria-live */}
      <div className="flex items-baseline justify-between pt-0.5" aria-live="polite">
        <div>
          <span className="text-base sm:text-lg font-bold text-ink block">
            Total estimé
          </span>
          <span className="text-[11px] text-product-grey font-medium">
            Paiement à la livraison
          </span>
        </div>

        <span className="text-2xl sm:text-[28px] font-black text-ink tracking-tight">
          {formatFCFA(finalTotal)}
        </span>
      </div>

      {/* Action Buttons Section */}
      <div className="space-y-3 pt-1">
        {!validatedOrder ? (
          /* 1. Bouton initial avant validation : Valider ma commande */
          <button
            type="button"
            onClick={onValidate}
            disabled={cartCount === 0 || isLoading}
            className="w-full h-12 bg-accent hover:bg-accent-link disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Validation en cours...</span>
              </>
            ) : (
              <>
                <span>Valider ma commande</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        ) : (
          /* 2. Bouton vert WhatsApp qui APPARAÎT LORSQUE LA COMMANDE EST VALIDÉE */
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <a
              href={validatedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {/* WhatsApp speech bubble icon matching screenshot */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white shrink-0"
              >
                <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.4L5 22l4.5-1.5c.8.3 1.6.4 2.5.4 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
              </svg>
              <span>Commander sur WhatsApp</span>
            </a>

            {/* Validation confirmation card */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 text-center space-y-1">
              <p className="text-xs font-extrabold text-primary flex items-center justify-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Commande N° {validatedOrder.orderNumber} enregistrée !</span>
              </p>
              <p className="text-[11px] text-muted font-medium">
                Cliquez sur le bouton vert ci-dessus pour transmettre directement votre commande sur WhatsApp.
              </p>
              <div className="pt-1">
                <Link
                  href={`/suivi?number=${validatedOrder.orderNumber}`}
                  className="text-[11px] font-bold text-accent underline hover:opacity-80 inline-block"
                >
                  Voir le suivi en direct →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reassurance payment and delivery info-bars */}
      <PaymentBadges />
    </div>
  );
};
