'use client';

import React, { ReactNode } from 'react';
import { CartProvider, useCart, CartItem } from './CartContext';
import type { Product } from '@/types';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export const useShop = () => {
  const cartCtx = useCart();

  const addToCart = (product: Product) => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      packaging: product.packaging,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  const removeFromCart = (productId: string) => {
    cartCtx.removeItem(productId);
  };

  return {
    cart: cartCtx.items.map((i) => ({ product: i as unknown as Product, quantity: i.quantity })),
    favorites: cartCtx.favorites,
    addToCart,
    removeFromCart,
    toggleFavorite: cartCtx.toggleFavorite,
    isFavorite: cartCtx.isFavorite,
    cartCount: cartCtx.cartCount,
  };
};

export { useCart };
export type { CartItem };
