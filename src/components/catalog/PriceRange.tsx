'use client';

import React, { useState, useEffect } from 'react';
import { formatFCFA } from '@/lib/format';

interface PriceRangeProps {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  onChange: (minVal: number, maxVal: number) => void;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
}) => {
  const [minPrice, setMinPrice] = useState<number>(currentMin ?? min);
  const [maxPrice, setMaxPrice] = useState<number>(currentMax ?? max);

  useEffect(() => {
    setMinPrice(currentMin ?? min);
  }, [currentMin, min]);

  useEffect(() => {
    setMaxPrice(currentMax ?? max);
  }, [currentMax, max]);

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - 500);
    setMinPrice(val);
    onChange(val, maxPrice);
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + 500);
    setMaxPrice(val);
    onChange(minPrice, val);
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setMinPrice(val);
    onChange(val, maxPrice);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || max;
    setMaxPrice(val);
    onChange(minPrice, val);
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Min-Max numeric inputs */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-muted text-[11px] mb-1 font-medium">Min (FCFA)</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinInput}
            min={min}
            max={maxPrice}
            step={500}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-ink focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-muted text-[11px] mb-1 font-medium">Max (FCFA)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxInput}
            min={minPrice}
            max={max}
            step={500}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-ink focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          step={500}
          value={minPrice}
          onChange={handleMinSlider}
          className="w-full accent-primary h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          aria-label="Prix minimum en FCFA"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={500}
          value={maxPrice}
          onChange={handleMaxSlider}
          className="w-full accent-accent h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          aria-label="Prix maximum en FCFA"
        />
      </div>

      <div className="flex justify-between text-[11px] text-muted font-medium pt-0.5">
        <span>{formatFCFA(minPrice)}</span>
        <span>{formatFCFA(maxPrice)}</span>
      </div>
    </div>
  );
};
