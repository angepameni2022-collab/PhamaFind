'use client';

import React, { useState } from 'react';
import { Send, Upload, CheckCircle2, MessageCircle, FileText, Plus, Trash2, ShieldCheck, Clock } from 'lucide-react';

const DOUALA_QUARTERS = [
  // Zone 1 (1 000 FCFA)
  { name: 'Akwa', zone: 1 },
  { name: 'Bonanjo', zone: 1 },
  { name: 'Bonapriso', zone: 1 },
  { name: 'Deido', zone: 1 },
  { name: 'Bali', zone: 1 },
  { name: 'New Bell', zone: 1 },
  { name: 'Koumassi', zone: 1 },
  // Zone 2 (2 000 FCFA)
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

interface QuickRequestFormProps {
  compact?: boolean;
}

export const QuickRequestForm: React.FC<QuickRequestFormProps> = ({ compact = false }) => {
  // Form fields
  const [medications, setMedications] = useState<{ name: string; quantity: number }[]>([
    { name: '', quantity: 1 },
  ]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quarter, setQuarter] = useState('Akwa');
  const [address, setAddress] = useState('');
  const [prescriptionName, setPrescriptionName] = useState('');
  const [consent, setConsent] = useState(true);
  const [notes, setNotes] = useState('');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    number: string;
    whatsappUrl: string;
  } | null>(null);

  const addMedicationRow = () => {
    setMedications((prev) => [...prev, { name: '', quantity: 1 }]);
  };

  const removeMedicationRow = (idx: number) => {
    if (medications.length <= 1) return;
    setMedications((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateMedication = (idx: number, field: 'name' | 'quantity', val: string | number) => {
    setMedications((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (maximum 5 Mo).');
        return;
      }
      setPrescriptionName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone (+237).');
      return;
    }

    const validMeds = medications.filter((m) => m.name.trim().length > 0);
    if (validMeds.length === 0 && !prescriptionName) {
      alert('Veuillez indiquer au moins un médicament ou joindre la photo de votre ordonnance.');
      return;
    }

    if (!consent) {
      alert('Veuillez accepter le traitement des données pour la recherche officinale.');
      return;
    }

    setLoading(true);

    try {
      const selectedQuarterInfo = DOUALA_QUARTERS.find((q) => q.name === quarter) || DOUALA_QUARTERS[0];

      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            quarter,
            zone: selectedQuarterInfo.zone,
          },
          items: validMeds.length > 0 ? validMeds : [{ name: 'Selon ordonnance jointe', quantity: 1 }],
          prescriptionFileName: prescriptionName || undefined,
          notes: notes.trim() || undefined,
          source: 'site',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedData({
          number: data.request.number,
          whatsappUrl: data.whatsappUrl,
        });
      } else {
        alert(data.error || 'Erreur lors de l\'envoi de la demande.');
      }
    } catch {
      alert('Impossible d\'envoyer la demande. Veuillez vérifier votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-card rounded-card p-6 sm:p-8 shadow-sm border border-slate-200 text-center space-y-4 animate-in fade-in duration-200">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-1">
          <span className="inline-block bg-primary text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
            Demande transmise
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
            Demande N° {submittedData.number}
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            Notre régulateur localise actuellement vos médicaments dans nos pharmacies partenaires à Douala.
          </p>
        </div>

        <div className="bg-pale-green rounded-xl p-4 text-xs sm:text-sm text-primary font-semibold flex items-center justify-center gap-2">
          <Clock size={16} />
          <span>Confirmation du stock et du prix sous 15 minutes max</span>
        </div>

        <div className="pt-2 space-y-2.5">
          <a
            href={submittedData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
          >
            <MessageCircle size={18} />
            <span>Accélérer la réponse sur WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedData(null);
              setMedications([{ name: '', quantity: 1 }]);
              setPrescriptionName('');
            }}
            className="text-xs text-muted hover:text-ink font-semibold underline"
          >
            Faire une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-card ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'} shadow-sm border border-slate-200/90 font-sans select-none`}>
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <span>Demander un médicament</span>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full uppercase">
              En 60s chrono
            </span>
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Indiquez ce dont vous avez besoin : nous le localisons en pharmacie partenaire et vous livrons en 1h max.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        {/* Medication lines (texte libre + quantité) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-ink">
            Nom du ou des médicament(s) recherché(s) *
          </label>

          {medications.map((med, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={med.name}
                onChange={(e) => updateMedication(idx, 'name', e.target.value)}
                placeholder="Ex: Doliprane 1000mg, Spasfon, Coartem, Insuline..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors font-medium"
              />
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-2 py-1 shrink-0">
                <span className="text-[11px] text-muted font-bold mr-1">Qté</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={med.quantity}
                  onChange={(e) => updateMedication(idx, 'quantity', e.target.value)}
                  className="w-10 bg-transparent text-center text-xs font-bold text-ink focus:outline-none"
                />
              </div>
              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicationRow(idx)}
                  className="p-1.5 text-slate-400 hover:text-danger transition-colors shrink-0"
                  title="Supprimer la ligne"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMedicationRow}
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 pt-0.5"
          >
            <Plus size={14} />
            <span>Ajouter un autre médicament</span>
          </button>
        </div>

        {/* Prescription upload (optionnelle, 5 Mo max) */}
        <div>
          <label className="block text-xs font-bold text-ink mb-1.5">
            Photo de l&apos;ordonnance (optionnelle)
          </label>
          <div className="border border-dashed border-slate-300 hover:border-primary rounded-xl p-3 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              id="prescription-quick"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="prescription-quick"
              className="flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold text-muted hover:text-primary"
            >
              {prescriptionName ? (
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <FileText size={16} />
                  <span>{prescriptionName}</span>
                </span>
              ) : (
                <>
                  <Upload size={16} className="text-primary shrink-0" />
                  <span>Ajouter une photo ou un PDF (max 5 Mo)</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Coordonnées & Quartier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-ink mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jean Paul Ndongo"
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">
              Téléphone (Orange / MTN) *
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1 focus-within:border-primary focus-within:bg-white transition-colors">
              <span className="text-xs font-bold text-muted mr-1.5 shrink-0">+237</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6XX XX XX XX"
                className="w-full bg-transparent py-1 text-xs sm:text-sm text-ink focus:outline-none font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Quartier Douala & Repère */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-ink mb-1">
              Quartier à Douala *
            </label>
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
            >
              <optgroup label="Zone 1 (Livraison 1 000 FCFA)">
                {DOUALA_QUARTERS.filter((q) => q.zone === 1).map((q) => (
                  <option key={q.name} value={q.name}>
                    {q.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Zone 2 (Livraison 2 000 FCFA)">
                {DOUALA_QUARTERS.filter((q) => q.zone === 2).map((q) => (
                  <option key={q.name} value={q.name}>
                    {q.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">
              Point de repère / Précisions
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: Face Boulangerie Saker, portail noir"
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Notes optionnelles */}
        <div>
          <label className="block text-xs font-bold text-ink mb-1">
            Instructions particulières pour le pharmacien (optionnel)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Générique accepté, urgence avant 14h, etc."
            className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        {/* Consent checkbox */}
        <label className="flex items-start gap-2 cursor-pointer text-[11px] text-muted select-none pt-1">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="rounded-xs text-primary focus:ring-primary h-3.5 w-3.5 mt-0.5 accent-primary"
          />
          <span>
            J&apos;autorise PhamaFind à transmettre ma demande aux pharmacies agréées conventionnées à Douala pour vérification du stock et du prix.
          </span>
        </label>

        {/* Submit Buttons: Formulaire direct + WhatsApp */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-accent hover:bg-accent-link disabled:bg-slate-300 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={15} />
            <span>{loading ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
          </button>

          <a
            href="https://wa.me/237681192943?text=Bonjour%20PhamaFind,%20je%20souhaite%20trouver%20un%20médicament%20en%20urgence%20à%20Douala"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95 shrink-0"
          >
            <MessageCircle size={17} />
            <span>Ou commander sur WhatsApp</span>
          </a>
        </div>

        {/* Reassurance footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-primary" />
            <span>Pharmacies 100% agréées</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-primary" />
            <span>Livraison en 1h max à Douala</span>
          </span>
        </div>
      </form>
    </div>
  );
};
