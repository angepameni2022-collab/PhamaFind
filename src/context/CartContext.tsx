'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  packaging?: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
}

export interface CartState {
  items: CartItem[];
  favorites: string[];
  zone: 1 | 2;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: { id: string } }
  | { type: 'SET_ZONE'; payload: { zone: 1 | 2 } };

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 'promo-1',
    name: 'La Roche Posay Effaclar duo+ M soin anti imperfections',
    packaging: 'Contenance 40 ml',
    price: 7000,
    originalPrice: 9000,
    image: '/images/products/effaclar.jpg',
    quantity: 1,
    category: 'promotions',
  },
];

const initialState: CartState = {
  items: INITIAL_ITEMS,
  favorites: [],
  zone: 1,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      const qtyToAdd = action.payload.quantity ?? 1;

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + qtyToAdd }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: qtyToAdd,
          },
        ],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.includes(action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((id) => id !== action.payload.id)
          : [...state.favorites, action.payload.id],
      };
    }

    case 'SET_ZONE': {
      return {
        ...state,
        zone: action.payload.zone,
      };
    }

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  favorites: string[];
  zone: 1 | 2;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  zone1Threshold: number;
  zone2Threshold: number;
  remainingForFreeShipping: number;
  progressPercentage: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  decrementQuantityWithConfirm: (id: string) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setZone: (zone: 1 | 2) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Palier 1 : ZONE 1 = 15 000 FCFA (Relais / Quartiers proches)
  // Palier 2 : ZONE 2 = 25 000 FCFA (Livraison Express Grand Douala)
  const zone1Threshold = 15000;
  const zone2Threshold = 25000;

  // Calculs
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Sous-total basé sur prix d'origine si disponible, sinon prix courant
  const subtotal = state.items.reduce((sum, item) => {
    const base = item.originalPrice && item.originalPrice > item.price ? item.originalPrice : item.price;
    return sum + base * item.quantity;
  }, 0);

  // Montant réel payé
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Réduction totale
  const discount = Math.max(0, subtotal - total);

  // Progression vers la livraison gratuite (Zone 1 en priorité)
  const targetThreshold = zone1Threshold;
  const remainingForFreeShipping = Math.max(0, targetThreshold - total);
  const progressPercentage = Math.min(100, (total / targetThreshold) * 100);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const decrementQuantityWithConfirm = (id: string) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      const confirmed = window.confirm(`Voulez-vous retirer "${item.name}" de votre panier ?`);
      if (confirmed) {
        removeItem(id);
      }
    } else {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const clearCart = () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vider l\'ensemble de votre panier ?');
    if (confirmed) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { id } });
  };

  const isFavorite = (id: string) => state.favorites.includes(id);

  const setZone = (zone: 1 | 2) => {
    dispatch({ type: 'SET_ZONE', payload: { zone } });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        favorites: state.favorites,
        zone: state.zone,
        cartCount,
        subtotal,
        discount,
        total,
        zone1Threshold,
        zone2Threshold,
        remainingForFreeShipping,
        progressPercentage,
        addItem,
        removeItem,
        updateQuantity,
        decrementQuantityWithConfirm,
        clearCart,
        toggleFavorite,
        isFavorite,
        setZone,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
