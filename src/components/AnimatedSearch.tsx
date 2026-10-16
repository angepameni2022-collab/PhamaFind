'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Mic, X, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS_CATALOG, ProductCatalogItem } from '@/lib/products';
import { CATEGORIES, Category } from '@/lib/categories';
import { formatFCFA } from '@/lib/format';

const PLACEHOLDERS = [
  'Rechercher Doliprane',
  'Rechercher Sirop pour la toux',
  'Rechercher Vitamine C',
  'Rechercher produits bébé',
  'Rechercher Efferalgan',
];

interface AnimatedSearchProps {
  className?: string;
  isMobile?: boolean;
}

export const AnimatedSearch: React.FC<AnimatedSearchProps> = ({ className = '', isMobile = false }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate placeholder every 2.5 seconds when not typing
  useEffect(() => {
    if (searchTerm.trim().length > 0) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [searchTerm]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpenSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute suggestions (products + matching categories)
  const matchingCategories: Category[] = searchTerm.trim()
    ? CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.children.some((sub) => sub.label.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 3)
    : [];

  const matchingProducts: ProductCatalogItem[] = searchTerm.trim()
    ? PRODUCTS_CATALOG.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const hasResults = matchingCategories.length > 0 || matchingProducts.length > 0;

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

  // Voice Search using Web Speech API with graceful fallback
  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;

    // Check if SpeechRecognition is available in browser
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('La recherche vocale n\'est pas supportée par votre navigateur. Veuillez saisir votre recherche au clavier.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setSearchTerm(transcript);
          setIsOpenSuggestions(true);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setIsOpenSuggestions(false);
      router.push(`/categorie/medicaments?search=${encodeURIComponent(searchTerm.trim())}`);
    } else if (e.key === 'Escape') {
      setIsOpenSuggestions(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Box */}
      <div
        className={`flex items-center bg-card rounded-full border transition-all shadow-subtle ${
          isMobile ? 'px-3 py-1.5 border-slate-300' : 'px-5 py-2.5 border-slate-300 hover:border-slate-400'
        } focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20`}
      >
        <Search
          size={isMobile ? 16 : 19}
          className="text-muted mr-2.5 shrink-0 transition-colors"
        />

        <div className="relative flex-1 h-5 sm:h-6 flex items-center overflow-hidden">
          {/* Animated vertical sliding placeholder */}
          {!searchTerm && (
            <div
              key={placeholderIndex}
              className="absolute inset-0 flex items-center text-xs sm:text-base text-product-grey pointer-events-none transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-2 select-none"
            >
              <span>{PLACEHOLDERS[placeholderIndex]}</span>
            </div>
          )}

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpenSuggestions(true);
            }}
            onFocus={() => setIsOpenSuggestions(true)}
            onKeyDown={handleKeyDown}
            aria-label="Rechercher un médicament ou produit de santé"
            className="w-full bg-transparent text-ink text-xs sm:text-base focus:outline-none z-10 font-medium"
          />
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setIsOpenSuggestions(false);
            }}
            className="p-1 text-slate-400 hover:text-ink mr-1 z-10"
            title="Effacer la recherche"
          >
            <X size={16} />
          </button>
        )}

        {/* Voice Search Mic Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`p-1.5 transition-colors z-10 ${
            isListening ? 'text-accent animate-pulse' : 'text-muted hover:text-primary'
          }`}
          title={isListening ? 'Écoute en cours...' : 'Recherche vocale'}
        >
          <Mic size={isMobile ? 16 : 19} />
        </button>

        {!isMobile && (
          <>
            <div className="w-px h-5 bg-slate-200 mx-2"></div>
            <button
              type="button"
              onClick={() => {
                if (searchTerm.trim()) {
                  setIsOpenSuggestions(false);
                  router.push(`/categorie/medicaments?search=${encodeURIComponent(searchTerm.trim())}`);
                }
              }}
              className="text-muted hover:text-primary transition-colors p-1"
              title="Lancer la recherche"
            >
              <Search size={19} />
            </button>
          </>
        )}
      </div>

      {/* Autocomplete Suggestions Popup */}
      {isOpenSuggestions && searchTerm.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-card border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in duration-150">
          {hasResults ? (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              
              {/* Category Suggestions */}
              {matchingCategories.length > 0 && (
                <div className="p-2 bg-slate-50/70">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted px-2 py-1 block">
                    Rayons & Catégories correspondants
                  </span>
                  {matchingCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categorie/${cat.slug}`}
                      onClick={() => setIsOpenSuggestions(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-ink hover:text-primary hover:bg-white transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-primary" />
                        <span>Rayon {cat.label}</span>
                      </div>
                      <ChevronRight size={14} className="text-muted group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Product Suggestions */}
              {matchingProducts.length > 0 && (
                <div className="p-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted px-2 py-1 block">
                    Médicaments & Produits disponibles
                  </span>
                  {matchingProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/categorie/${p.category}`}
                      onClick={() => setIsOpenSuggestions(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="min-w-0 pr-3">
                        <p className="text-xs sm:text-sm font-bold text-ink group-hover:text-primary truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-product-grey truncate">
                          {p.packaging} • {p.brand}
                        </p>
                      </div>
                      <span className="text-xs font-black text-accent shrink-0 whitespace-nowrap">
                        {formatFCFA(p.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* View all results button */}
              <div className="p-2.5 bg-slate-50 text-center text-xs">
                <Link
                  href={`/categorie/medicaments?search=${encodeURIComponent(searchTerm.trim())}`}
                  onClick={() => setIsOpenSuggestions(false)}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Voir tous les résultats pour &quot;{searchTerm}&quot;</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

            </div>
          ) : (
            <div className="p-6 text-center space-y-1">
              <p className="text-xs sm:text-sm font-bold text-ink">
                Aucun produit ne correspond exactement à &quot;{searchTerm}&quot;
              </p>
              <p className="text-[11px] text-muted">
                Essayez avec un mot-clé plus court ou consultez nos univers santé.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
