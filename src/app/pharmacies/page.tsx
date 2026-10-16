'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Phone, Clock, ChevronLeft, ShieldCheck, Search } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  quarter: string;
  address: string;
  phone: string;
  isDuty24h?: boolean;
  hours: string;
  isPartner: boolean;
}

const PHARMACIES_DOUALA: Pharmacy[] = [
  {
    id: 'ph-1',
    name: 'Pharmacie de la Liberté',
    quarter: 'Akwa',
    address: 'Boulevard de la Liberté, face Direction Orange',
    phone: '+237 681 192 943',
    isDuty24h: true,
    hours: '24h/24 - 7j/7 (Pharmacie de garde)',
    isPartner: true,
  },
  {
    id: 'ph-2',
    name: 'Pharmacie des Palmiers',
    quarter: 'Bonamoussadi',
    address: 'Rond-point des Palmiers, face glacier moderne',
    phone: '+237 670 451 220',
    isDuty24h: false,
    hours: '07h30 - 22h00',
    isPartner: true,
  },
  {
    id: 'ph-3',
    name: 'Pharmacie du Bon Secours',
    quarter: 'Bonapriso',
    address: 'Rue Koloko, à 100m du Carrefour Armée de l\'Air',
    phone: '+237 699 301 845',
    isDuty24h: false,
    hours: '08h00 - 21h30',
    isPartner: true,
  },
  {
    id: 'ph-4',
    name: 'Pharmacie Saint-Paul',
    quarter: 'Deido',
    address: 'Rue de la Joie, Carrefour des Quatre Étages',
    phone: '+237 655 120 981',
    isDuty24h: true,
    hours: '24h/24 - 7j/7 (Pharmacie de garde)',
    isPartner: true,
  },
  {
    id: 'ph-5',
    name: 'Pharmacie Denver Express',
    quarter: 'Denver / Makepe',
    address: 'Carrefour Denver, Immeuble Horizon',
    phone: '+237 671 884 102',
    isDuty24h: false,
    hours: '08h00 - 22h00',
    isPartner: true,
  },
  {
    id: 'ph-6',
    name: 'Pharmacie de Bali',
    quarter: 'Bali',
    address: 'Avenue Douala Manga Bell',
    phone: '+237 698 221 349',
    isDuty24h: false,
    hours: '08h00 - 20h30',
    isPartner: true,
  },
  {
    id: 'ph-7',
    name: 'Pharmacie Maritime Bonanjo',
    quarter: 'Bonanjo',
    address: 'Place du Gouvernement, face Cour d\'Appel',
    phone: '+237 677 341 902',
    isDuty24h: false,
    hours: '08h00 - 20h00',
    isPartner: true,
  },
  {
    id: 'ph-8',
    name: 'Pharmacie du Marché Kotto',
    quarter: 'Kotto',
    address: 'Entrée Marché Kotto, Immeuble Cristal',
    phone: '+237 654 991 200',
    isDuty24h: true,
    hours: '24h/24 - 7j/7 (Pharmacie de garde)',
    isPartner: true,
  },
];

export default function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');

  const filteredPharmacies = PHARMACIES_DOUALA.filter((ph) => {
    const matchesSearch = ph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ph.quarter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ph.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuarter = selectedQuarter === 'all' || ph.quarter.toLowerCase().includes(selectedQuarter.toLowerCase());
    return matchesSearch && matchesQuarter;
  });

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Pharmacies partenaires</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Pharmacies partenaires à Douala
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Réseau certifié d&apos;officines conventionnées garantissant des médicaments authentiques livrés en 1h max.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-pale-green text-primary px-4 py-2 rounded-full font-bold text-xs shrink-0 self-start md:self-auto">
            <ShieldCheck size={16} />
            <span>100% Certifiées MinSanté Cameroun</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-card rounded-full border border-slate-200 px-4 py-2 shadow-xs">
            <Search size={18} className="text-muted mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une pharmacie ou un quartier (Akwa, Bonamoussadi...)"
              className="w-full bg-transparent text-sm text-ink placeholder-product-grey focus:outline-none"
            />
          </div>

          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="bg-card border border-slate-200 rounded-full px-5 py-2 text-xs sm:text-sm font-bold text-ink focus:outline-none focus:border-primary shadow-xs cursor-pointer"
          >
            <option value="all">Tous les quartiers</option>
            <option value="Akwa">Akwa</option>
            <option value="Bonamoussadi">Bonamoussadi</option>
            <option value="Bonapriso">Bonapriso</option>
            <option value="Deido">Deido</option>
            <option value="Denver">Denver / Makepe</option>
            <option value="Bali">Bali</option>
            <option value="Bonanjo">Bonanjo</option>
            <option value="Kotto">Kotto</option>
          </select>
        </div>

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-ink text-base leading-snug">
                        {pharmacy.name}
                      </h2>
                      <span className="text-xs font-semibold text-primary">{pharmacy.quarter}</span>
                    </div>
                  </div>

                  {pharmacy.isDuty24h && (
                    <span className="bg-accent text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                      Garde 24h
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-body pt-1">
                  <p className="flex items-start gap-2 text-muted">
                    <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                    <span>{pharmacy.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-muted">
                    <Clock size={15} className="text-primary shrink-0" />
                    <span>{pharmacy.hours}</span>
                  </p>
                  <p className="flex items-center gap-2 text-muted">
                    <Phone size={15} className="text-primary shrink-0" />
                    <span>{pharmacy.phone}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href="/"
                  className="flex-1 py-2 text-center bg-accent-soft hover:bg-[#fbd6e6] text-accent font-extrabold text-xs rounded-full transition-colors"
                >
                  Commander les stocks
                </Link>
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="p-2 border border-slate-200 hover:border-primary text-muted hover:text-primary rounded-full transition-colors"
                  title="Appeler l'officine"
                >
                  <Phone size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
