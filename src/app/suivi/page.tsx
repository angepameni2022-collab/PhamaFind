'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  CheckCircle2,
  Truck,
  Building2,
  AlertCircle,
  MessageCircle,
  ChevronLeft,
} from 'lucide-react';
import { formatFCFA } from '@/lib/format';
import { MedicationRequest, OrderStatus } from '@/lib/requestsStore';

const STATUS_STEPS: OrderStatus[] = [
  'Reçue',
  'En recherche',
  'Pharmacie trouvée',
  'Prix confirmé',
  'Payée',
  'En livraison',
  'Livrée',
];

function SuiviContent() {
  const searchParams = useSearchParams();
  const initialNum = searchParams.get('number') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [orderNumber, setOrderNumber] = useState(initialNum);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<MedicationRequest | null>(null);
  const [error, setError] = useState('');

  // Finalization state
  const [payMethod, setPayMethod] = useState<'orange' | 'mtn' | 'cash'>('orange');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [confirming, setConfirming] = useState(false);

  const handleConfirmOrder = async () => {
    if (!request) return;
    setConfirming(true);
    try {
      const res = await fetch('/api/requests/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: request.number,
          paymentMethod: payMethod,
          address: deliveryNotes || request.customer.address,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRequest(data.request);
      } else {
        alert(data.error || 'Erreur lors de la confirmation.');
      }
    } catch {
      alert('Erreur réseau. Veuillez réessayer.');
    } finally {
      setConfirming(false);
    }
  };

  const fetchStatus = async (numToFetch: string, phoneToFetch: string) => {
    if (!numToFetch.trim()) return;

    setLoading(true);
    setError('');

    try {
      const url = `/api/track?number=${encodeURIComponent(numToFetch.trim())}${
        phoneToFetch.trim() ? `&phone=${encodeURIComponent(phoneToFetch.trim())}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        setRequest(data.request);
      } else {
        setError(data.error || 'Aucune commande ne correspond à ce numéro.');
        setRequest(null);
      }
    } catch {
      setError('Erreur réseau. Impossible de récupérer le statut de la commande.');
      setRequest(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNum) {
      fetchStatus(initialNum, initialPhone);
    }
  }, [initialNum, initialPhone]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(orderNumber, phone);
  };

  // Determine current active step index in the 7 steps
  const currentStepIndex = request ? STATUS_STEPS.indexOf(request.status) : -1;
  const isException = request && ['Indisponible', 'Annulée'].includes(request.status);

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Accueil / Suivi de commande</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Suivre ma commande en temps réel
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Entrez votre numéro de commande (ex: PF-2026-000123) pour suivre la recherche en pharmacie et la livraison à Douala.
          </p>
        </div>

        {/* Search Card */}
        <form onSubmit={handleSearch} className="bg-card rounded-card p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="order-num" className="block text-xs font-bold text-ink mb-1">
                Numéro de commande *
              </label>
              <input
                id="order-num"
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ex: PF-2026-000123"
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs sm:text-sm font-bold text-ink uppercase tracking-wider focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="order-phone" className="block text-xs font-bold text-ink mb-1">
                Numéro de téléphone (facultatif)
              </label>
              <input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6XX XX XX XX"
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-emerald-800 disabled:bg-slate-300 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search size={16} />
            <span>{loading ? 'Recherche du statut...' : 'Rechercher ma commande'}</span>
          </button>

          {error && (
            <div className="flex items-center gap-2 text-xs text-danger font-semibold p-3 bg-red-50 rounded-xl">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Order Status Result Card */}
        {request && (
          <div className="bg-card rounded-card p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-muted block">Commande</span>
                <span className="text-xl sm:text-2xl font-black text-ink">{request.number}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  Statut : {request.status}
                </span>
              </div>
            </div>

            {/* 7-Step Status Timeline */}
            {!isException ? (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  Progression de votre commande à Douala
                </span>

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex sm:flex-col items-center gap-3 sm:gap-1.5 z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-colors ${
                            isDone
                              ? 'bg-primary text-white'
                              : isCurrent
                              ? 'bg-accent text-white ring-4 ring-accent/20'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-bold text-left sm:text-center ${
                            isCurrent
                              ? 'text-accent'
                              : isDone
                              ? 'text-primary'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 text-danger p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={18} />
                <span>Cette demande a le statut : {request.status}. Contactez notre support pour une alternative.</span>
              </div>
            )}

            {/* ACTION CLIENT: Finaliser la commande lorsque le médicament a été localisé */}
            {['Pharmacie trouvée', 'Prix confirmé'].includes(request.status) && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/30 rounded-2xl p-5 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2.5 text-primary">
                  <CheckCircle2 size={24} className="text-primary shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-ink">
                      Votre médicament est disponible ! Finalisez votre commande
                    </h3>
                    <p className="text-xs text-muted">
                      Localisé avec succès à la {request.order?.pharmacyName || 'pharmacie partenaire conventionnée'}.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5">
                  <div className="flex justify-between text-muted">
                    <span>Médicaments ({request.items.map((i) => i.name).join(', ')}) :</span>
                    <span className="font-bold text-ink">{formatFCFA(request.order?.medsPrice || 3500)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Frais de livraison à {request.customer.quarter} (Zone {request.customer.zone}) :</span>
                    <span className="font-bold text-ink">{formatFCFA(request.customer.zone === 2 ? 2000 : 1000)}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-200 font-extrabold text-base text-ink">
                    <span>Total à régler :</span>
                    <span className="text-primary font-black text-lg">
                      {formatFCFA(request.order?.total || ((request.order?.medsPrice || 3500) + (request.customer.zone === 2 ? 2000 : 1000)))}
                    </span>
                  </div>
                </div>

                {/* Mode de paiement */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-ink">
                    Choisissez votre mode de paiement :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${payMethod === 'orange' ? 'border-primary bg-emerald-50/50 text-primary font-bold ring-1 ring-primary' : 'border-slate-200 bg-white text-body'}`}>
                      <input type="radio" name="pay" value="orange" checked={payMethod === 'orange'} onChange={() => setPayMethod('orange')} className="accent-primary" />
                      <span>Orange Money</span>
                    </label>
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${payMethod === 'mtn' ? 'border-primary bg-emerald-50/50 text-primary font-bold ring-1 ring-primary' : 'border-slate-200 bg-white text-body'}`}>
                      <input type="radio" name="pay" value="mtn" checked={payMethod === 'mtn'} onChange={() => setPayMethod('mtn')} className="accent-primary" />
                      <span>MTN MoMo</span>
                    </label>
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${payMethod === 'cash' ? 'border-primary bg-emerald-50/50 text-primary font-bold ring-1 ring-primary' : 'border-slate-200 bg-white text-body'}`}>
                      <input type="radio" name="pay" value="cash" checked={payMethod === 'cash'} onChange={() => setPayMethod('cash')} className="accent-primary" />
                      <span>Espèces à la livraison</span>
                    </label>
                  </div>
                </div>

                {/* Instructions repère */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Point de repère précis pour le coursier moto :
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder={request.customer.address || "Ex: Face boulangerie Saker, portail noir"}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Submit finalization button */}
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={confirming}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-black text-sm rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>{confirming ? 'Validation de votre livraison...' : 'Valider ma commande & lancer la livraison en 1h'}</span>
                </button>
              </div>
            )}

            {/* ÉTAT EN COURS DE LIVRAISON */}
            {['Payée', 'En livraison'].includes(request.status) && (
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4.5 flex items-center gap-3.5 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Truck size={22} className="animate-pulse" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping inline-block" />
                    <span>Commande en cours de livraison</span>
                  </span>
                  <h4 className="font-extrabold text-ink text-sm sm:text-base mt-0.5">
                    Votre coursier {request.order?.courierName || 'Alain Mbarga (Moto 12)'} est en route avec votre sac isotherme scellé !
                  </h4>
                  <p className="text-xs text-sky-700 font-semibold mt-0.5">
                    Livraison garantie en moins d&apos;une heure à {request.customer.quarter}.
                  </p>
                </div>
              </div>
            )}

            {/* ÉTAT LIVRÉ */}
            {request.status === 'Livrée' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4.5 flex items-center gap-3.5 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-ink text-sm sm:text-base">
                    Médicaments livrés avec succès !
                  </h4>
                  <p className="text-xs text-primary font-semibold mt-0.5">
                    Merci pour votre confiance en PhamaFind Douala. Prenez bien soin de vous !
                  </p>
                </div>
              </div>
            )}

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <span className="text-muted block">Destinataire :</span>
                <strong className="text-ink">{request.customer.name}</strong>
                <p className="text-muted text-xs">
                  {request.customer.quarter} ({request.customer.address || 'Douala'})
                </p>
                <p className="text-muted text-xs">Tél : +237 {request.customer.phone}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-muted block">Médicaments demandés :</span>
                <ul className="list-disc list-inside space-y-0.5 text-ink font-semibold">
                  {request.items.map((it, i) => (
                    <li key={i}>{it.name} (Qté : {it.quantity})</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pharmacy and Courier Assigned Info */}
            {request.order && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {request.order.pharmacyName && (
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-primary shrink-0" />
                      <div>
                        <span className="text-muted text-[11px] block">Pharmacie partenaire :</span>
                        <strong className="text-ink">{request.order.pharmacyName}</strong>
                      </div>
                    </div>
                  )}

                  {request.order.courierName && (
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-primary shrink-0" />
                      <div>
                        <span className="text-muted text-[11px] block">Coursier assigné :</span>
                        <strong className="text-ink">{request.order.courierName}</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 font-bold">
                  <span className="text-muted">Total de la commande :</span>
                  <span className="text-base text-ink font-extrabold">
                    {formatFCFA(request.order.total)}
                  </span>
                </div>
              </div>
            )}

            {/* Direct WhatsApp follow-up button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/237681192943?text=Bonjour%20PhamaFind,%20je%20souhaite%20des%20nouvelles%20de%20ma%20commande%20${request.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
              >
                <MessageCircle size={18} />
                <span>Échanger avec le régulateur sur WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SuiviPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-page flex items-center justify-center p-8 text-muted text-sm font-semibold">
          Chargement du suivi de commande...
        </div>
      }
    >
      <SuiviContent />
    </React.Suspense>
  );
}
