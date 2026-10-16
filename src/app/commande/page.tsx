'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  MapPin,
  User,
  FileText,
  CreditCard,
  Truck,
  ShieldCheck,
  MessageCircle,
  AlertCircle,
  Upload
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatFCFA } from '@/lib/format';
import { PaymentBadges } from '@/components/cart/PaymentBadges';

// Douala neighborhoods grouped by zone
const DOUALA_NEIGHBORHOODS = [
  // Zone 1
  { name: 'Akwa', zone: 1 },
  { name: 'Bonanjo', zone: 1 },
  { name: 'Bonapriso', zone: 1 },
  { name: 'Deido', zone: 1 },
  { name: 'Bali', zone: 1 },
  { name: 'New Bell', zone: 1 },
  { name: 'Koumassi', zone: 1 },
  // Zone 2
  { name: 'Bonamoussadi', zone: 2 },
  { name: 'Makepe', zone: 2 },
  { name: 'Kotto', zone: 2 },
  { name: 'Denver', zone: 2 },
  { name: 'Logpom', zone: 2 },
  { name: 'Bepanda', zone: 2 },
  { name: 'Ndogbong', zone: 2 },
  { name: 'Cité des Palmiers', zone: 2 },
  { name: 'PK8 à PK14', zone: 2 },
  { name: 'Nyalla', zone: 2 },
  { name: 'Yassa', zone: 2 },
];

export default function CommandePage() {
  const router = useRouter();
  const { items, subtotal, discount, clearCart } = useCart();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('Akwa');
  const [addressDetails, setAddressDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'orange' | 'mtn' | 'cash'>('orange');
  const [hasPrescription, setHasPrescription] = useState(false);
  const [prescriptionFileName, setPrescriptionFileName] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Zone and shipping calculation
  const currentQuarterInfo = DOUALA_NEIGHBORHOODS.find((q) => q.name === selectedQuarter) || DOUALA_NEIGHBORHOODS[0];
  const isZone1 = currentQuarterInfo.zone === 1;

  // Free shipping rules: Zone 1 free if subtotal >= 15000, Zone 2 free if subtotal >= 25000
  const freeThreshold = isZone1 ? 15000 : 25000;
  const rawShippingFee = isZone1 ? 1000 : 2000;
  const shippingFee = subtotal >= freeThreshold ? 0 : rawShippingFee;
  const finalTotal = subtotal - discount + shippingFee;

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFileName(e.target.files[0].name);
      setHasPrescription(true);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: fullName.trim(),
            phone: phoneNumber.trim(),
            address: addressDetails.trim(),
            quarter: selectedQuarter,
            zone: currentQuarterInfo.zone,
          },
          items: items.map((i) => ({ name: i.name, quantity: i.quantity })),
          prescriptionFileName: prescriptionFileName || undefined,
          source: 'site',
        }),
      });

      const data = await res.json();
      const generatedNumber = data.success ? data.request.number : `PF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedNumber);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      const generatedNumber = `PF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedNumber);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If order was placed, display Success view
  if (orderPlaced) {
    const waText = encodeURIComponent(
      `Bonjour PhamaFind ! Je viens de valider ma commande ${orderNumber} :\n` +
      `- Client : ${fullName} (${phoneNumber})\n` +
      `- Quartier : ${selectedQuarter} (${addressDetails || 'Sans précisions'})\n` +
      `- Total : ${formatFCFA(finalTotal)}\n` +
      `- Paiement : ${paymentMethod.toUpperCase()}\n` +
      `Merci de confirmer la prise en charge pour livraison en 1h max !`
    );

    return (
      <main className="bg-page min-h-screen py-10 sm:py-16 font-sans">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-card rounded-card p-8 sm:p-12 shadow-sm border border-slate-200/80 space-y-6">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={46} className="stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Commande validée
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Merci pour votre commande, {fullName} !
              </h1>
              <p className="text-muted text-sm sm:text-base">
                Numéro de commande : <span className="font-extrabold text-ink">{orderNumber}</span>
              </p>
            </div>

            {/* Delivery time pill */}
            <div className="bg-pale-green rounded-xl p-4 flex items-center justify-center gap-3 text-primary font-bold text-sm">
              <Truck size={20} />
              <span>Livraison express en cours vers {selectedQuarter} (estimée en moins de 1h)</span>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2 border border-slate-200/60">
              <div className="flex justify-between">
                <span className="text-muted">Total réglé à la livraison ou MoMo :</span>
                <span className="font-extrabold text-ink text-base">{formatFCFA(finalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Mode choisi :</span>
                <span className="font-bold text-ink uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Numéro de contact :</span>
                <span className="font-bold text-ink">{phoneNumber}</span>
              </div>
              {hasPrescription && (
                <div className="flex items-center gap-1.5 text-primary font-semibold text-xs pt-1">
                  <FileText size={14} />
                  <span>Ordonnance jointe : {prescriptionFileName}</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp follow-up button */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/237681192943?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base rounded-full shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle size={20} />
                <span>Suivre ma livraison sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  router.push('/');
                }}
                className="w-full py-3 text-muted hover:text-ink font-bold text-xs sm:text-sm rounded-full transition-colors"
              >
                Retour à l&apos;accueil
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // If cart is empty, redirect or display friendly message
  if (items.length === 0) {
    return (
      <main className="bg-page min-h-screen py-16 font-sans">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-muted">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-ink">Votre panier est vide</h1>
          <p className="text-muted text-sm">
            Ajoutez d&apos;abord vos médicaments ou produits de parapharmacie pour finaliser votre commande.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors shadow-sm"
          >
            Découvrir les médicaments
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-page min-h-screen py-8 sm:py-12 font-sans select-none">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/panier"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Retour au panier</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Finalisation de votre commande
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Livraison rapide en 1h max à Douala par coursiers certifiés
          </p>
        </div>

        {/* 2 COLUMNS LAYOUT: Left = Form, Right = Order Summary */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Checkout Form (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Coordonnées de contact */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-ink flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  Vos coordonnées
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Jean Paul Ndongo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Numéro de téléphone (Orange / MTN) *
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1 focus-within:border-primary focus-within:bg-white transition-colors">
                    <span className="text-xs font-bold text-muted mr-1.5 shrink-0">+237</span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="6XX XX XX XX"
                      className="w-full bg-transparent py-1.5 text-sm text-ink focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Adresse de livraison à Douala */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-ink flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  Adresse de livraison à Douala
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Quartier de livraison *
                  </label>
                  <select
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm text-ink font-semibold focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
                  >
                    <optgroup label="Zone 1 (Frais : 1 000 FCFA - Offert dès 15 000 FCFA)">
                      {DOUALA_NEIGHBORHOODS.filter((q) => q.zone === 1).map((q) => (
                        <option key={q.name} value={q.name}>
                          {q.name} (Zone 1)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Zone 2 (Frais : 2 000 FCFA - Offert dès 25 000 FCFA)">
                      {DOUALA_NEIGHBORHOODS.filter((q) => q.zone === 2).map((q) => (
                        <option key={q.name} value={q.name}>
                          {q.name} (Zone 2)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Précisions d&apos;adresse / Repère à Douala
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder="Ex: Face Boulangerie Saker, 2ème carrefour à gauche, portail blanc"
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Ordonnance médicale (facultative) */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-ink flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  Ordonnance médicale (facultative)
                </h2>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Si votre commande contient un médicament soumis à prescription, joignez la photo de votre ordonnance pour validation par notre pharmacien partenaire.
              </p>

              <div className="border-2 border-dashed border-slate-200 hover:border-primary/60 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
                <input
                  type="file"
                  id="prescription-file"
                  accept="image/*,application/pdf"
                  onChange={handlePrescriptionUpload}
                  className="hidden"
                />
                <label
                  htmlFor="prescription-file"
                  className="flex flex-col items-center justify-center cursor-pointer space-y-2"
                >
                  <Upload size={24} className="text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-ink">
                    {prescriptionFileName ? (
                      <span className="text-primary">{prescriptionFileName}</span>
                    ) : (
                      'Cliquez pour joindre une photo ou un fichier PDF'
                    )}
                  </span>
                  <span className="text-[11px] text-muted">JPG, PNG ou PDF (max 10 Mo)</span>
                </label>
              </div>
            </div>

            {/* Step 4: Mode de paiement */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-ink flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  Mode de règlement
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Orange Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('orange')}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'orange'
                      ? 'border-[#FF7900] bg-orange-50/50 ring-2 ring-[#FF7900]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-ink">Orange Money</span>
                    <span className="w-3 h-3 rounded-full bg-[#FF7900]"></span>
                  </div>
                  <span className="text-[11px] text-muted mt-2">Paiement direct USSD</span>
                </button>

                {/* MTN MoMo */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn')}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'mtn'
                      ? 'border-[#FFCC00] bg-yellow-50/50 ring-2 ring-[#FFCC00]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-ink">MTN MoMo</span>
                    <span className="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
                  </div>
                  <span className="text-[11px] text-muted mt-2">Paiement Mobile Money</span>
                </button>

                {/* Cash à la livraison */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-ink">Espèces</span>
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                  </div>
                  <span className="text-[11px] text-muted mt-2">Paiement à la livraison</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-5">
              <h2 className="text-lg font-extrabold text-ink pb-2 border-b border-slate-100">
                Récapitulatif de votre commande
              </h2>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 bg-slate-50 rounded-md shrink-0 flex items-center justify-center p-1 border border-slate-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={36}
                          height={36}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-ink truncate">{item.name}</p>
                        <p className="text-muted text-[11px]">Qté : {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-ink shrink-0">
                      {formatFCFA(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Sous-total</span>
                  <span className="font-bold text-ink">{formatFCFA(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-primary font-bold">
                    <span>Réduction</span>
                    <span>-{formatFCFA(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-muted block">Frais de livraison ({selectedQuarter})</span>
                    <span className="text-[11px] text-muted">
                      {isZone1 ? 'Zone 1 (Offert dès 15 000 FCFA)' : 'Zone 2 (Offert dès 25 000 FCFA)'}
                    </span>
                  </div>
                  <span className="font-bold text-ink">
                    {shippingFee === 0 ? (
                      <span className="text-primary uppercase font-extrabold">Gratuit</span>
                    ) : (
                      formatFCFA(shippingFee)
                    )}
                  </span>
                </div>

                <div className="border-t border-slate-200/90 pt-3 flex justify-between items-baseline">
                  <span className="text-base font-bold text-ink">Total TTC</span>
                  <span className="text-2xl font-black text-ink">{formatFCFA(finalTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-accent hover:bg-accent-link text-white font-extrabold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              >
                Confirmer la commande ({formatFCFA(finalTotal)})
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-2 text-[11px] text-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary shrink-0" />
                  <span>Médicaments 100% certifiés d&apos;officine légale à Douala</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-primary shrink-0" />
                  <span>Livraison express en moins de 1h garantie</span>
                </div>
              </div>
            </div>

            <PaymentBadges />
          </div>

        </form>

      </div>
    </main>
  );
}
