'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronLeft } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Commande');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 5000);
  };

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
            <span>Accueil / Contact</span>
          </Link>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Contactez le service client PhamaFind
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Une question sur un médicament ou le statut d&apos;une livraison à Douala ? Notre équipe de pharmaciens et régulateurs est à votre disposition.
          </p>
        </div>

        {/* 2 COLUMNS: Left = Contact details & WhatsApp, Right = Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Info cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* WhatsApp highlight card */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h2 className="font-extrabold text-ink text-base">Assistance WhatsApp Directe</h2>
                  <span className="text-xs text-muted">Réponse en moins de 5 minutes</span>
                </div>
              </div>
              <p className="text-xs text-body leading-relaxed">
                Envoyez directement votre ordonnance ou le nom de votre médicament pour une vérification immédiate de stock en officine.
              </p>
              <a
                href="https://wa.me/237681192943?text=Bonjour%20PhamaFind,%20j'ai%20une%20question%20concernant%20un%20médicament"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <MessageCircle size={18} />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>

            {/* Direct details */}
            <div className="bg-card rounded-card p-6 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-extrabold text-ink text-base pb-2 border-b border-slate-100">
                Nos coordonnées à Douala
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-body">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">Siège opérationnel</strong>
                    <span className="text-muted">Boulevard de la Liberté, Akwa<br />BP 2404 Douala, Cameroun</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">Ligne téléphonique</strong>
                    <a href="tel:+237681192943" className="text-primary font-bold hover:underline">
                      +237 681 192 943
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">Courrier électronique</strong>
                    <a href="mailto:contact@phamafind.cm" className="text-primary font-bold hover:underline">
                      contact@phamafind.cm
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">Horaires d&apos;ouverture</strong>
                    <span className="text-muted">Du lundi au samedi : 8h00 – 20h00<br />Service garde 24h sur WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-lg font-extrabold text-ink pb-2 border-b border-slate-100">
              Envoyez-nous un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Votre nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Jean Paul Ndongo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Téléphone (Orange / MTN) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Objet de votre demande
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="Commande">Suivi d&apos;une commande en cours</option>
                  <option value="Médicament">Disponibilité d&apos;un médicament à Douala</option>
                  <option value="Ordonnance">Question sur une ordonnance</option>
                  <option value="Partenariat">Pharmacie partenaire ou recrutement</option>
                  <option value="Autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Votre message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez précisément votre besoin ou question..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent hover:bg-accent-link text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} />
                <span>Envoyer le message</span>
              </button>

              {sent && (
                <div className="flex items-center gap-2 text-xs font-bold text-primary p-3 bg-pale-green rounded-xl animate-in fade-in">
                  <CheckCircle2 size={18} />
                  <span>Votre message a été transmis à l&apos;équipe PhamaFind. Nous vous recontacterons sous peu.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}
