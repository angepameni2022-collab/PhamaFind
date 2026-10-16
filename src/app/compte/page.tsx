'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  FileText,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { formatFCFA } from '@/lib/format';

export default function ComptePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'prescriptions'>('orders');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 8) {
      setIsLoggedIn(true);
    } else {
      alert('Veuillez saisir un numéro de téléphone valide à 9 chiffres.');
    }
  };

  // Mock order history for a logged in user in Douala
  const mockOrders = [
    {
      id: 'PF-948123',
      date: 'Aujourd\'hui à 14h20',
      status: 'En cours de livraison (1h max)',
      statusColor: 'text-primary bg-pale-green',
      total: 7800,
      items: ['Doliprane Tabs 1000 mg (x2)', 'Spasfon Lyoc 80 mg (x1)', 'Gaviscon menthe (x1)'],
      quarter: 'Akwa, Boulevard de la Liberté',
    },
    {
      id: 'PF-883410',
      date: '12 Octobre 2026',
      status: 'Livrée avec succès',
      statusColor: 'text-slate-600 bg-slate-100',
      total: 12500,
      items: ['Effaclar lotion astringente', 'Marimer spray hypertonique'],
      quarter: 'Bonamoussadi, Carrefour Denver',
    },
  ];

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors">
            Accueil / Mon espace client
          </Link>
        </div>

        {!isLoggedIn ? (
          /* LOGIN CARD */
          <div className="max-w-md mx-auto bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <User size={28} />
              </div>
              <h1 className="text-2xl font-extrabold text-ink">Connexion Espace Client</h1>
              <p className="text-xs sm:text-sm text-muted">
                Accédez au suivi de vos livraisons et ordonnances à Douala.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Numéro de téléphone portable (Orange ou MTN)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 focus-within:border-primary focus-within:bg-white transition-colors">
                  <span className="text-xs font-bold text-muted mr-2">+237</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="6XX XX XX XX"
                    className="w-full bg-transparent py-1 text-sm text-ink focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent hover:bg-accent-link text-white font-extrabold text-sm rounded-full shadow-sm hover:shadow transition-all active:scale-95"
              >
                Recevoir mon code de connexion
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-muted">
              <span>Pas encore de compte ? Un compte sera créé automatiquement lors de votre première commande.</span>
            </div>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="space-y-8">
            {/* Header banner */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xl">
                  {phoneNumber.slice(-2)}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-ink">
                    Bonjour, +237 {phoneNumber}
                  </h1>
                  <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck size={14} className="text-primary" />
                    <span>Compte vérifié PhamaFind Douala</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-danger hover:underline"
              >
                <LogOut size={14} />
                <span>Déconnexion</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'orders'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                <Package size={16} />
                <span>Mes commandes ({mockOrders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'addresses'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                <MapPin size={16} />
                <span>Mes adresses Douala</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('prescriptions')}
                className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'prescriptions'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                <FileText size={16} />
                <span>Mes ordonnances</span>
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-card rounded-card p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-ink text-base">{order.id}</span>
                        <span className="text-xs text-muted block sm:inline sm:ml-3">Passée le {order.date}</span>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.statusColor} self-start sm:self-auto`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm space-y-1 text-body">
                      <p className="font-semibold text-ink">Articles commandés :</p>
                      <ul className="list-disc list-inside text-muted pl-1">
                        {order.items.map((it, idx) => (
                          <li key={idx}>{it}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                      <span className="text-muted">
                        Livraison vers : <strong className="text-ink">{order.quarter}</strong>
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-ink text-base">
                          {formatFCFA(order.total)}
                        </span>
                        <a
                          href="https://wa.me/237681192943"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-bold text-xs transition-colors"
                        >
                          Suivre sur WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-card p-5 shadow-sm border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-ink text-sm">Domicile (Akwa)</span>
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md">Par défaut</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Boulevard de la Liberté, face Direction Orange, Douala.<br />
                    Tél : +237 {phoneNumber}
                  </p>
                </div>

                <div className="bg-card rounded-card p-5 shadow-sm border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-ink text-sm">Bureau (Bonanjo)</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Rue Koumassi, Immeuble Victoria 3ème étage, Douala.<br />
                    Tél : +237 {phoneNumber}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="bg-card rounded-card p-8 shadow-sm border border-slate-200/80 text-center space-y-4">
                <FileText size={36} className="text-primary mx-auto" />
                <h3 className="text-base font-extrabold text-ink">Vos ordonnances médicales</h3>
                <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                  Vos ordonnances validées lors de vos commandes sont conservées de façon sécurisée pour faciliter vos renouvellements.
                </p>
                <Link
                  href="/commande"
                  className="inline-block bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-emerald-800 transition-colors"
                >
                  Passer une commande avec ordonnance
                </Link>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
