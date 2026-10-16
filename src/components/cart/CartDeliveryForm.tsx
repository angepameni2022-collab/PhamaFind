'use client';

import React from 'react';
import {
  MapPin,
  FileText,
  Upload,
  User,
  Phone,
  Trash2,
  Truck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export interface DoualaQuarter {
  name: string;
  zone: 1 | 2;
}

export const DOUALA_QUARTERS: DoualaQuarter[] = [
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
  { name: 'Logpom', zone: 2 },
  { name: 'Bepanda', zone: 2 },
  { name: 'Bassa / PK8', zone: 2 },
  { name: 'Ndokoti', zone: 2 },
  { name: 'Yassa', zone: 2 },
  { name: 'Nyalla', zone: 2 },
];

interface CartDeliveryFormProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  quarter: string;
  setQuarter: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  prescriptionFile: string;
  setPrescriptionFile: (v: string) => void;
  consent: boolean;
  setConsent: (v: boolean) => void;
  errors: { name?: string; phone?: string; consent?: string };
  formRef: React.RefObject<HTMLDivElement>;
  validatedOrder: {
    orderNumber: string;
    whatsappUrl: string;
  } | null;
}

export const CartDeliveryForm: React.FC<CartDeliveryFormProps> = ({
  name,
  setName,
  phone,
  setPhone,
  quarter,
  setQuarter,
  address,
  setAddress,
  notes,
  setNotes,
  prescriptionFile,
  setPrescriptionFile,
  consent,
  setConsent,
  errors,
  formRef,
  validatedOrder,
}) => {
  const currentQuarterInfo =
    DOUALA_QUARTERS.find((q) => q.name === quarter) || DOUALA_QUARTERS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (maximum 5 Mo).');
        return;
      }
      setPrescriptionFile(file.name);
    }
  };

  return (
    <div
      ref={formRef}
      id="checkout-delivery-form"
      className="bg-card rounded-card border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6 scroll-mt-24 font-sans"
    >
      {/* Header section with badge */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center shrink-0">
            <Truck size={20} className="stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-ink leading-tight">
              Informations de livraison & Ordonnance
            </h2>
            <p className="text-xs sm:text-[13px] text-product-grey font-medium mt-0.5">
              Recherche en pharmacie partenaire et livraison express en 1h à Douala
            </p>
          </div>
        </div>

        {/* Validation banner displayed when order has been validated */}
        {validatedOrder && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-primary shrink-0" />
              <div>
                <span className="block text-sm font-extrabold text-ink">
                  Commande validée avec succès !
                </span>
                <span className="text-xs text-primary font-bold">
                  Numéro de suivi : {validatedOrder.orderNumber}
                </span>
              </div>
            </div>

            {/* Green button appearing upon validation */}
            <a
              href={validatedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 shrink-0 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white shrink-0">
                <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.4L5 22l4.5-1.5c.8.3 1.6.4 2.5.4 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
              </svg>
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: Nom complet & Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-ink mb-1.5">
              Nom complet <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Jean Paul Ndongo"
                className={`w-full bg-[#F9F9F9] border ${
                  errors.name
                    ? 'border-danger/80 ring-2 ring-danger/10'
                    : 'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
                } rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-ink focus:outline-none transition-all placeholder:text-slate-400`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] font-bold text-danger mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-ink mb-1.5">
              Téléphone (Orange / MTN) <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 6XX XX XX XX"
                className={`w-full bg-[#F9F9F9] border ${
                  errors.phone
                    ? 'border-danger/80 ring-2 ring-danger/10'
                    : 'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
                } rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-ink focus:outline-none transition-all placeholder:text-slate-400`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] font-bold text-danger mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Quartier à Douala & Point de repère */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-ink mb-1.5">
              Quartier à Douala <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
              />
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-full pl-10 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-ink focus:outline-none transition-all cursor-pointer appearance-none"
              >
                <optgroup label="Zone 1 (1 000 FCFA)">
                  {DOUALA_QUARTERS.filter((q) => q.zone === 1).map((q) => (
                    <option key={q.name} value={q.name}>
                      {q.name} (Zone 1)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Zone 2 (2 000 FCFA)">
                  {DOUALA_QUARTERS.filter((q) => q.zone === 2).map((q) => (
                    <option key={q.name} value={q.name}>
                      {q.name} (Zone 2)
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
            <p className="text-[11px] text-product-grey mt-1 font-medium">
              Actuellement : <span className="font-bold text-ink">Zone {currentQuarterInfo.zone}</span> ({currentQuarterInfo.zone === 1 ? '1 000 FCFA' : '2 000 FCFA'})
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-ink mb-1.5">
              Point de repère / Précisions
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: Face Boulangerie Saker, portail noir"
              className="w-full bg-[#F9F9F9] border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium text-ink focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Row 3: Photo de l'ordonnance (optionnelle) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-[13px] font-bold text-ink">
              Photo de l&apos;ordonnance <span className="font-normal text-muted">(optionnelle)</span>
            </label>
            <span className="text-[11px] text-product-grey font-medium">
              JPG, PNG, PDF (max 5 Mo)
            </span>
          </div>

          <div className="border border-dashed border-slate-300 hover:border-primary rounded-xl p-3 text-center transition-colors bg-slate-50/60">
            <input
              type="file"
              id="checkout-prescription-inline"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="checkout-prescription-inline"
              className="flex items-center justify-center gap-2.5 cursor-pointer text-xs sm:text-sm font-semibold text-muted hover:text-primary transition-colors py-1"
            >
              {prescriptionFile ? (
                <span className="text-primary font-bold flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <FileText size={16} className="text-primary" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{prescriptionFile}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPrescriptionFile('');
                    }}
                    className="text-danger hover:opacity-80 ml-1 p-0.5"
                    title="Supprimer ce document"
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ) : (
                <>
                  <Upload size={16} className="text-primary" />
                  <span>Cliquer pour ajouter une ordonnance médicale</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Row 4: Instructions particulières pour le pharmacien */}
        <div>
          <label className="block text-xs sm:text-[13px] font-bold text-ink mb-1.5">
            Instructions pour le pharmacien <span className="font-normal text-muted">(optionnel)</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Générique accepté, urgence avant 14h, préférence comprimés..."
            className="w-full bg-[#F9F9F9] border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium text-ink focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Row 5: Consent checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4 mt-0.5 accent-primary cursor-pointer shrink-0"
            />
            <span className="leading-relaxed">
              J&apos;autorise <strong className="text-ink font-semibold">PhamaFind</strong> à transmettre ma commande aux pharmacies agréées partenaires à Douala pour vérification du stock officiel et préparation immédiate.
            </span>
          </label>
          {errors.consent && (
            <p className="text-[11px] font-bold text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Big green button appearing upon validation at bottom of form */}
        {validatedOrder && (
          <div className="pt-3 animate-in fade-in zoom-in-95 duration-200">
            <a
              href={validatedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white shrink-0">
                <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.4L5 22l4.5-1.5c.8.3 1.6.4 2.5.4 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
              </svg>
              <span>Commander sur WhatsApp</span>
            </a>
            <p className="text-center text-xs text-product-grey mt-2 font-medium">
              Votre commande N° {validatedOrder.orderNumber} est enregistrée. Cliquez ci-dessus pour envoyer le message WhatsApp pré-rempli.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
