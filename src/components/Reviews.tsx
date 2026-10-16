'use client';

import React from 'react';
import { Star } from 'lucide-react';
import mockData from '@/data/mockData.json';

export const Reviews: React.FC = () => {
  return (
    <section className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="space-y-8">
        
        {/* Centered Title (28-36px, bold) */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            Nos avis clients
          </h2>
          <p className="text-sm text-muted mt-1.5">
            Retour d&apos;expérience de nos patients livrés à Douala
          </p>
        </div>

        {/* 2-column grid of pale-green rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {mockData.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-pale-green rounded-card p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-emerald-100/50 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div>
                {/* 5,0 + 5 stars */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-black text-ink text-base sm:text-lg">
                    {rev.rating.toFixed(1).replace('.', ',')}
                  </span>
                  <div className="flex text-star">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={17} className="fill-star text-star" />
                    ))}
                  </div>
                </div>

                {/* Citation in body */}
                <p className="text-body text-sm sm:text-base leading-relaxed font-normal">
                  {rev.text}
                </p>
              </div>

              {/* Author name in bold */}
              <span className="font-bold text-xs sm:text-sm text-ink block mt-5">
                {rev.author}
              </span>
            </div>
          ))}
        </div>

        {/* Centered White Pill Button */}
        <div className="flex justify-center pt-3">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card hover:bg-white text-accent-link font-bold text-sm sm:text-base px-9 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-slate-100 inline-flex items-center justify-center gap-2"
          >
            Lire tous les avis Google
          </a>
        </div>

      </div>
    </section>
  );
};
