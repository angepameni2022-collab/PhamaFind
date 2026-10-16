'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartHeader } from '@/components/cart/CartHeader';
import { FreeShippingBar } from '@/components/cart/FreeShippingBar';
import { CartItem } from '@/components/cart/CartItem';
import { UpsellCarousel } from '@/components/cart/UpsellCarousel';
import { CartSummary } from '@/components/cart/CartSummary';
import { SupportCard } from '@/components/cart/SupportCard';
import { CartDeliveryForm, DOUALA_QUARTERS } from '@/components/cart/CartDeliveryForm';
import { formatFCFA } from '@/lib/format';

export default function CartPage() {
  const { items, cartCount, subtotal, discount, clearCart } = useCart();

  // Delivery form state (embedded directly in the page without modal)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quarter, setQuarter] = useState('Akwa');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<string>('');
  const [consent, setConsent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});

  // Validated order state: when user validates order, the WhatsApp button appears!
  const [validatedOrder, setValidatedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
  } | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Delivery fee calculation
  const currentQuarterInfo =
    DOUALA_QUARTERS.find((q) => q.name === quarter) || DOUALA_QUARTERS[0];
  const isZone1 = currentQuarterInfo.zone === 1;
  const freeThreshold = isZone1 ? 15000 : 25000;
  const rawDeliveryFee = isZone1 ? 1000 : 2000;
  const deliveryFee = subtotal >= freeThreshold ? 0 : rawDeliveryFee;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleValidateOrder = async () => {
    const newErrors: { name?: string; phone?: string; consent?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Veuillez renseigner votre nom complet.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Veuillez renseigner votre numéro de téléphone (Orange / MTN).';
    }
    if (!consent) {
      newErrors.consent = 'Veuillez accepter la transmission pour vérifier le stock en pharmacie.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Smoothly scroll to the form so the user sees the missing fields
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({});

    if (items.length === 0) {
      alert('Votre panier est vide. Veuillez ajouter un produit.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            quarter,
            zone: currentQuarterInfo.zone,
          },
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
          })),
          prescriptionFileName: prescriptionFile || undefined,
          notes: notes.trim() || undefined,
          source: 'cart_validation',
        }),
      });

      const data = await res.json();
      const orderNumber = data.success
        ? data.request.number
        : `PF-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      // Format WhatsApp message
      const itemsList = items
        .map((i) => `• *${i.name}* (x${i.quantity}) - ${formatFCFA(i.price * i.quantity)}`)
        .join('\n');

      const waMsg =
        `Bonjour PhamaFind ! Je valide ma commande panier *${orderNumber}* :\n\n` +
        `📦 *Médicaments demandés :*\n${itemsList}\n\n` +
        `💰 Total indicatif : *${formatFCFA(finalTotal)}*\n` +
        `📍 Quartier : *${quarter}* (Zone ${currentQuarterInfo.zone} - Frais : ${
          deliveryFee === 0 ? 'OFFERT' : formatFCFA(deliveryFee)
        })\n` +
        `👤 Client : ${name.trim()} (+237 ${phone.trim()})\n` +
        (address.trim() ? `🏠 Point de repère : ${address.trim()}\n` : '') +
        (prescriptionFile ? `📎 Ordonnance : ${prescriptionFile}\n` : '') +
        (notes.trim() ? `📝 Instructions : ${notes.trim()}\n` : '') +
        `\nMerci de vérifier la disponibilité dans vos 35 pharmacies partenaires de Douala !`;

      const whatsappUrl = `https://wa.me/237681192943?text=${encodeURIComponent(waMsg)}`;

      // Set validated order so that the green 'Commander sur WhatsApp' button appears!
      setValidatedOrder({
        orderNumber,
        whatsappUrl,
      });

      // Clear the cart storage now that order is securely logged
      clearCart();
    } catch {
      alert('Une erreur est survenue lors de la validation. Veuillez vérifier votre connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-page min-h-screen py-6 sm:py-10 font-sans pb-28 md:pb-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Desktop Grid / 1-Column Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: ~58% (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Header (Titre + count + Vider mon panier) */}
            <CartHeader />

            {/* If Cart has items OR if order was just validated */}
            {items.length > 0 || validatedOrder ? (
              <>
                {/* 2. Free Shipping Bar */}
                <FreeShippingBar />

                {/* 3. Cart Items List */}
                {items.length > 0 && (
                  <div className="divide-y divide-slate-200/80">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {/* 4. FORMULAIRE DE LIVRAISON & ORDONNANCE (Directement intégré sans popup modal) */}
                <CartDeliveryForm
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  quarter={quarter}
                  setQuarter={setQuarter}
                  address={address}
                  setAddress={setAddress}
                  notes={notes}
                  setNotes={setNotes}
                  prescriptionFile={prescriptionFile}
                  setPrescriptionFile={setPrescriptionFile}
                  consent={consent}
                  setConsent={setConsent}
                  errors={errors}
                  formRef={formRef}
                  validatedOrder={validatedOrder}
                />
              </>
            ) : (
              /* Empty Cart State */
              <div className="bg-card rounded-card border border-slate-200/80 p-8 sm:p-12 text-center space-y-5 my-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag size={36} className="stroke-[1.6]" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                    Votre panier est vide
                  </h2>
                  <p className="text-sm text-product-grey max-w-sm mx-auto">
                    Découvrez nos médicaments essentiels, soins dermatologiques et produits de santé disponibles immédiatement à Douala.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-link text-white font-extrabold text-sm px-7 py-3 rounded-full shadow-md transition-all active:scale-95"
                  >
                    <span>Découvrir les médicaments</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}

            {/* 5. SECTION "Complétez votre commande" (Upsell Carousel) */}
            <UpsellCarousel />
          </div>

          {/* RIGHT COLUMN: ~38% (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* 1. Cart Summary Card (Sticky) with validation button and WhatsApp button upon validation */}
            <CartSummary
              quarter={quarter}
              onValidate={handleValidateOrder}
              isLoading={isLoading}
              validatedOrder={validatedOrder}
            />

            {/* 2. Customer Support Card */}
            <SupportCard />
          </div>

        </div>

      </div>

      {/* FIXED MOBILE BOTTOM BAR */}
      {(items.length > 0 || validatedOrder) && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 lg:hidden">
          <div className="min-w-0">
            <span className="block text-[11px] text-product-grey font-medium leading-none truncate">
              Total ({cartCount} art. • {quarter})
            </span>
            <span className="text-lg font-black text-ink">
              {formatFCFA(finalTotal)}
            </span>
          </div>

          <div className="flex-1 max-w-[240px]">
            {!validatedOrder ? (
              /* Before validation: 'Valider ma commande' */
              <button
                type="button"
                onClick={handleValidateOrder}
                disabled={isLoading}
                className="w-full h-11 bg-accent hover:bg-accent-link text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span>Valider ma commande</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            ) : (
              /* Upon validation: Green button 'Commander sur WhatsApp' matching the screenshot */
              <a
                href={validatedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white shrink-0">
                  <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.4L5 22l4.5-1.5c.8.3 1.6.4 2.5.4 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
                </svg>
                <span>Commander sur WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
