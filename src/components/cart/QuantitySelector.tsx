'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  itemId: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  itemId,
}) => {
  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-300 bg-card select-none"
      role="group"
      aria-label="Quantité"
    >
      {/* Decrement Button */}
      <button
        type="button"
        onClick={onDecrement}
        aria-label={quantity === 1 ? 'Supprimer l\'article' : 'Diminuer la quantité de 1'}
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-body hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full active:scale-90"
      >
        <Minus size={14} className="stroke-[2.5]" />
      </button>

      {/* Value */}
      <span
        id={`qty-${itemId}`}
        className="w-7 sm:w-8 text-center text-xs sm:text-sm font-bold text-ink"
        aria-live="polite"
      >
        {quantity}
      </span>

      {/* Increment Button */}
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Augmenter la quantité de 1"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-body hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full active:scale-90"
      >
        <Plus size={14} className="stroke-[2.5]" />
      </button>
    </div>
  );
};
