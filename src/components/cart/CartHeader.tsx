'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartHeader: React.FC = () => {
  const { cartCount, clearCart } = useCart();

  return (
    <div className="flex items-center justify-between pb-4 sm:pb-6 select-none border-b border-slate-200/60">
      {/* Title + Icon + Count Badge */}
      <div className="flex items-center gap-3">
        <ShoppingBag size={32} className="text-ink stroke-[2.2] shrink-0" />
        <h1 className="text-2xl sm:text-[34px] lg:text-[36px] font-extrabold text-ink tracking-tight leading-none">
          Votre panier
        </h1>
        {cartCount > 0 && (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white text-xs sm:text-sm font-black flex items-center justify-center shrink-0 shadow-xs">
            {cartCount}
          </span>
        )}
      </div>

      {/* Clear Cart Link */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={clearCart}
          className="text-danger hover:underline text-sm sm:text-[15px] font-bold transition-colors focus:outline-none"
        >
          Vider mon panier
        </button>
      )}
    </div>
  );
};
