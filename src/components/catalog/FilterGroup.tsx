'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  defaultOpen?: boolean;
  count?: number;
  children: React.ReactNode;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  defaultOpen = true,
  count,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card rounded-card border border-[#E5E7EB] shadow-2xs overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left font-semibold text-ink text-sm sm:text-base hover:text-primary transition-colors focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <span>{title}</span>
          {count !== undefined && count > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold flex items-center justify-center">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100/80 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
};
