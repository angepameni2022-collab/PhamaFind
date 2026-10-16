'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  badge: string;
  image: string;
  whatsappMessage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Shampooing extra doux MKL - Sans sulfates dès 3 ans - Prix bas',
    badge: 'Prix Bas Douala',
    image: '/images/banners/mkl-shampooing.webp',
    whatsappMessage: 'Bonjour PhamaFind, je souhaite commander le Shampooing extra doux MKL 750ml.',
  },
  {
    id: 2,
    title: 'Nouveau Melvita - Les soins biologiques ultra-sensoriels -15%',
    badge: 'Offre Beauté & Soin',
    image: '/images/banners/melvita-woman.webp',
    whatsappMessage: 'Bonjour PhamaFind, je souhaite commander les soins biologiques Melvita.',
  },
  {
    id: 3,
    title: 'Offres Spéciales Anti-Âge - Jusqu\'à -25% sur les sérums & crèmes',
    badge: 'Dermatologie',
    image: '/images/banners/anti-age.webp',
    whatsappMessage: 'Bonjour PhamaFind, je souhaite profiter de la promotion Anti-Âge jusqu\'à -25%.',
  },
  {
    id: 4,
    title: 'Offre Babybio Maternité - 3 gourdes achetées, la 4ème offerte',
    badge: 'Bébé & Maman',
    image: '/images/banners/babybio.webp',
    whatsappMessage: 'Bonjour PhamaFind, je souhaite commander le pack nutrition infantile Babybio.',
  },
  {
    id: 5,
    title: 'Sanoflore Dermatologie Botanique Bio -20% éclat de santé',
    badge: 'Soins Bio',
    image: '/images/banners/sanoflore.webp',
    whatsappMessage: 'Bonjour PhamaFind, je souhaite commander des soins Sanoflore Bio.',
  },
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = (msg: string) => {
    const text = encodeURIComponent(msg);
    window.open(`https://wa.me/237681192943?text=${text}`, '_blank');
  };

  const activeSlide = slides[current];

  return (
    <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative w-full rounded-section overflow-hidden shadow-sm bg-slate-100 aspect-[1920/430] min-h-[220px] sm:min-h-[270px] md:min-h-[310px] lg:min-h-[340px] group cursor-pointer select-none">
        {/* Banner Images with Crossfade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            onClick={() => handleWhatsApp(slide.whatsappMessage)}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              current === idx ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center w-full h-full"
            />
          </div>
        ))}

        {/* Floating WhatsApp CTA in Bottom Right on desktop */}
        <div className="absolute right-5 bottom-4 z-20 hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsApp(activeSlide.whatsappMessage);
            }}
            className="bg-accent hover:bg-accent-link text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle size={17} className="fill-current" />
            <span>Commander sur WhatsApp</span>
          </button>
        </div>

        {/* Pagination Dots in semi-transparent pill in bottom center (Identical to Pharma-GDD) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(idx);
              }}
              className={`rounded-full transition-all duration-300 ${
                current === idx ? 'bg-white w-6 h-2.5' : 'bg-white/50 hover:bg-white/80 w-2.5 h-2.5'
              }`}
              aria-label={`Aller au slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Previous / Next Arrows on desktop hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-ink shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev + 1) % slides.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-ink shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          aria-label="Slide suivant"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
