'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mockData from '@/data/mockData.json';

const CAT_SLUGS: Record<string, string> = {
  'cat-med': 'medicaments',
  'cat-sante': 'sante',
  'cat-hygiene': 'hygiene-beaute',
  'cat-bebe': 'bebe-grossesse',
  'cat-minceur': 'minceur-sport',
  'cat-veterinaire': 'veterinaire',
};

export const CategoryRow: React.FC = () => {
  return (
    <section id="categories-section" className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="space-y-6">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Les top catégories
        </h2>

        {/* 6 round vignettes evenly spaced across the full width */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-5 sm:gap-8 justify-items-center items-start pt-2">
          {mockData.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorie/${CAT_SLUGS[cat.id] || 'medicaments'}`}
              className="flex flex-col items-center group cursor-pointer text-center select-none w-full max-w-[160px]"
            >
              {/* White circle container (115px to 145px) */}
              <div className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] md:w-[145px] md:h-[145px] rounded-full bg-card shadow-sm border border-slate-200/90 flex items-center justify-center p-3 sm:p-4 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={110}
                  height={110}
                  className="w-auto h-auto max-h-[80px] sm:max-h-[100px] md:max-h-[110px] max-w-[80px] sm:max-w-[100px] md:max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Bold label underneath */}
              <span className="font-extrabold text-sm sm:text-[15px] md:text-base text-ink group-hover:text-primary transition-colors mt-3 leading-snug">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
