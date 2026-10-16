import React from 'react';
import { Star, Truck, Phone } from 'lucide-react';

import Link from 'next/link';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-primary text-white text-xs sm:text-sm py-2 px-4 font-sans select-none border-b border-emerald-900/10">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Left: Customer rating */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-extrabold text-white">4,9</span>
          <Star size={14} className="text-star fill-star" />
          <span className="text-white/95">Sur 100 avis Google</span>
        </div>

        {/* Center: Delivery Announcement */}
        <div className="flex items-center gap-2 font-semibold text-white text-center">
          <Truck size={16} className="shrink-0 text-white/95" />
          <span>Livraison en 1h max à Douala</span>
        </div>

        {/* Right: Contact & Phone */}
        <div className="flex items-center gap-3 text-white/90">
          <Link
            href="/contact"
            className="hover:text-white hover:underline transition-colors hidden md:inline"
          >
            Contact
          </Link>
          <span className="text-white/40 hidden md:inline">•</span>
          <a
            href="tel:+237681192943"
            className="flex items-center gap-1.5 hover:text-white font-semibold transition-colors"
          >
            <Phone size={13} className="shrink-0" />
            <span>+237 681 192 943</span>
          </a>
        </div>

      </div>
    </div>
  );
};
