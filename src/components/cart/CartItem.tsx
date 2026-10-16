'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import { formatFCFA } from '@/lib/format';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, decrementQuantityWithConfirm, removeItem } = useCart();

  const handleRemove = () => {
    const confirmed = window.confirm(`Voulez-vous vraiment retirer "${item.name}" de votre panier ?`);
    if (confirmed) {
      removeItem(item.id);
    }
  };

  const currentTotal = item.price * item.quantity;
  const originalTotal = item.originalPrice ? item.originalPrice * item.quantity : null;

  return (
    <div className="flex items-start gap-4 sm:gap-6 py-5 border-b border-slate-200/80 bg-transparent relative group">
      {/* 1. Miniature 72px */}
      <div className="w-[72px] h-[72px] bg-white rounded-[8px] border border-slate-200/70 p-1.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="max-h-full max-w-full w-auto object-contain"
        />
      </div>

      {/* 2. Center Content: Name, Packaging, Quantity */}
      <div className="flex-1 min-w-0 pr-2 sm:pr-4 space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-ink leading-snug line-clamp-2">
          {item.name}
        </h3>

        {/* Packaging Line */}
        {item.packaging && (
          <p className="text-xs text-product-grey">
            <span className="font-bold text-muted mr-1.5">
              {item.packaging.startsWith('Contenance') ? 'Contenance' : 'Format'}
            </span>
            <span>
              {item.packaging.replace(/^Contenance\s*/i, '')}
            </span>
          </p>
        )}

        {/* Quantity Selector */}
        <div className="pt-1">
          <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrement={() => decrementQuantityWithConfirm(item.id)}
            itemId={item.id}
          />
        </div>
      </div>

      {/* 3. Right Column: Trash Icon & Prices */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
        {/* Trash button in trash color (#DD6161) */}
        <button
          type="button"
          onClick={handleRemove}
          className="text-trash hover:opacity-80 p-1 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-trash rounded-md"
          aria-label={`Supprimer ${item.name} du panier`}
        >
          <Trash2 size={18} className="stroke-[1.9]" />
        </button>

        {/* Price block */}
        <div className="text-right mt-auto pt-2">
          {originalTotal && originalTotal > currentTotal && (
            <span className="block text-xs sm:text-sm text-product-grey line-through font-normal leading-none mb-1 whitespace-nowrap">
              {formatFCFA(originalTotal)}
            </span>
          )}
          <span className="text-lg sm:text-[22px] font-extrabold text-ink leading-tight whitespace-nowrap">
            {formatFCFA(currentTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
