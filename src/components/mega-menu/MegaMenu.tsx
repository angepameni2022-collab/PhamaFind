'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { CategoryList } from './CategoryList';
import { SubcategoryPanel } from './SubcategoryPanel';
import { MobileCategoryDrawer } from './MobileCategoryDrawer';

export const MegaMenu: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(CATEGORIES[0].slug);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileDrawerOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen || isMobileDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobileDrawerOpen]);

  // Desktop Hover handlers with 120ms delay
  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 768) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 120);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, []);

  const handleTriggerClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileDrawerOpen(true);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  // Keyboard navigation for categories list
  const handleCategoryKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % CATEGORIES.length;
      setActiveCategorySlug(CATEGORIES[nextIndex].slug);
      const nextEl = document.getElementById(`category-item-${nextIndex}`);
      if (nextEl) nextEl.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
      setActiveCategorySlug(CATEGORIES[prevIndex].slug);
      const prevEl = document.getElementById(`category-item-${prevIndex}`);
      if (prevEl) prevEl.focus();
    }
  };

  const activeCategory = CATEGORIES.find((c) => c.slug === activeCategorySlug) || CATEGORIES[0];

  return (
    <div
      ref={containerRef}
      className="relative font-sans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ☰ Catégories Button Trigger */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-haspopup="true"
        aria-expanded={isOpen || isMobileDrawerOpen}
        aria-label="Menu des catégories"
        className="flex items-center gap-2.5 text-ink hover:text-primary transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      >
        <Menu size={20} className="stroke-[2.2]" />
        <span className="font-bold text-sm sm:text-[15px]">Catégories</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 text-muted ${
            isOpen || isMobileDrawerOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* OVERLAY SOMBRE SOUS LE MENU (rgba(17,24,39,0.35)) */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-[105px] z-30 transition-opacity backdrop-blur-2xs"
          style={{ backgroundColor: 'rgba(17, 24, 39, 0.35)' }}
        />
      )}

      {/* DESKTOP MÉGA-MENU PANEL */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Méga-menu Catégories"
          className="hidden md:block absolute left-0 top-full mt-0 w-[95vw] max-w-container bg-white rounded-b-[16px] shadow-2xl border border-t-0 border-[#E5E7EB] overflow-hidden z-40 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="flex items-stretch min-h-[460px] max-h-[70vh]">
            {/* GAUCHE (~300px) : liste verticale des 13 catégories */}
            <CategoryList
              categories={CATEGORIES}
              activeSlug={activeCategorySlug}
              onSelectCategory={setActiveCategorySlug}
              onKeyDown={handleCategoryKeyDown}
            />

            {/* DROITE : panneau de la catégorie active */}
            <SubcategoryPanel
              category={activeCategory}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MOBILE FULL-SCREEN DRAWER */}
      <MobileCategoryDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </div>
  );
};
