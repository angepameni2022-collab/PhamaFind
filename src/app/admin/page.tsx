'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
  ChevronRight,
  ExternalLink,
  X,
  AlertTriangle,
  User,
  MapPin,
  Check,
  Percent,
} from 'lucide-react';
import { MedicationRequest, OrderStatus } from '@/lib/requestsStore';

const PARTNER_PHARMACIES = [
  { id: 'ph-1', name: 'Pharmacie de la Liberté (Akwa)', quarter: 'Akwa', zone: 1 },
  { id: 'ph-2', name: 'Pharmacie des Palmiers (Bonamoussadi)', quarter: 'Bonamoussadi', zone: 2 },
  { id: 'ph-3', name: 'Pharmacie du Bon Secours (Bonapriso)', quarter: 'Bonapriso', zone: 1 },
  { id: 'ph-4', name: 'Pharmacie Saint-Paul (Deido)', quarter: 'Deido', zone: 1 },
  { id: 'ph-5', name: 'Pharmacie de l\'Aéroport (Bonapriso)', quarter: 'Bonapriso', zone: 1 },
  { id: 'ph-6', name: 'Pharmacie du Port (Bonanjo)', quarter: 'Bonanjo', zone: 1 },
  { id: 'ph-7', name: 'Pharmacie Makepe (Maképé)', quarter: 'Maképé', zone: 2 },
  { id: 'ph-8', name: 'Pharmacie Kotto (Kotto)', quarter: 'Kotto', zone: 2 },
  { id: 'ph-9', name: 'Pharmacie Bassa (Bassa / PK8)', quarter: 'Bassa', zone: 2 },
  { id: 'ph-10', name: 'Pharmacie Ndokoti (Ndokoti)', quarter: 'Ndokoti', zone: 2 },
];

const COURIERS = [
  { id: 'cour-1', name: 'Alain Mbarga (Moto 12 - Bonapriso)' },
  { id: 'cour-2', name: 'Serge Ekotto (Moto 04 - Bonamoussadi)' },
  { id: 'cour-3', name: 'Jules Kamga (Moto 08 - Akwa)' },
  { id: 'cour-4', name: 'Patrick Ndongo (Moto 15 - Deido)' },
  { id: 'cour-5', name: 'Brice Fogue (Moto 21 - Maképé)' },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  'Reçue': { label: 'Reçue', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  'En recherche': { label: 'En recherche', bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  'Pharmacie trouvée': { label: 'Pharmacie trouvée', bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
  'Prix confirmé': { label: 'Prix confirmé', bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  'Payée': { label: 'Payée', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  'En livraison': { label: 'En livraison', bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  'Livrée': { label: 'Livrée', bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
  'Indisponible': { label: 'Indisponible', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' },
  'Annulée': { label: 'Annulée', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<MedicationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<MedicationRequest | null>(null);

  // Edit form state inside modal
  const [editStatus, setEditStatus] = useState<OrderStatus>('Reçue');
  const [editPharmacyId, setEditPharmacyId] = useState('');
  const [editCourierId, setEditCourierId] = useState('');
  const [editMedsPrice, setEditMedsPrice] = useState<number>(0);
  const [editPaymentMethod, setEditPaymentMethod] = useState<'orange' | 'mtn' | 'cash'>('orange');
  const [editPaymentStatus, setEditPaymentStatus] = useState<'en_attente' | 'paye' | 'echec'>('en_attente');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    todayRequests: 0,
    inProgress: 0,
    delivered: 0,
    successRate: 95,
    totalRevenue: 0,
    totalCommissions: 0,
    averageDeliveryMinutes: 44,
  });

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [reqRes, statRes] = await Promise.all([
        fetch('/api/admin/requests'),
        fetch('/api/admin/stats'),
      ]);

      if (reqRes.ok) {
        const reqData = await reqRes.json();
        setRequests(reqData.requests || []);
      }

      if (statRes.ok) {
        const statData = await statRes.json();
        if (statData.stats) {
          setStats(statData.stats);
        }
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // Polling every 15s
    return () => clearInterval(interval);
  }, []);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // Search
      const matchesSearch =
        searchTerm === '' ||
        r.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.customer.phone.includes(searchTerm) ||
        r.customer.quarter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.items.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status
      const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;

      // Zone
      const matchesZone =
        selectedZone === 'all' ||
        (selectedZone === 'zone1' && r.customer.zone === 1) ||
        (selectedZone === 'zone2' && r.customer.zone === 2);

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [requests, searchTerm, selectedStatus, selectedZone]);

  const openEditModal = (r: MedicationRequest) => {
    setSelectedRequest(r);
    setEditStatus(r.status);
    setEditPharmacyId(r.order?.pharmacyId || '');
    setEditCourierId(r.order?.courierId || '');
    setEditMedsPrice(r.order?.medsPrice || 0);
    setEditPaymentMethod(r.order?.paymentMethod || 'orange');
    setEditPaymentStatus(r.order?.paymentStatus || 'en_attente');
    setEditNotes(r.notes || '');
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      setSaving(true);
      const selectedPharm = PARTNER_PHARMACIES.find((p) => p.id === editPharmacyId);
      const selectedCour = COURIERS.find((c) => c.id === editCourierId);

      const res = await fetch(`/api/admin/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          pharmacyId: editPharmacyId || undefined,
          pharmacyName: selectedPharm?.name || undefined,
          courierId: editCourierId || undefined,
          courierName: selectedCour?.name || undefined,
          medsPrice: editMedsPrice,
          paymentMethod: editPaymentMethod,
          paymentStatus: editPaymentStatus,
          notes: editNotes,
          updatedBy: 'Opérateur Akwa Central',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSaveSuccess(true);
        setSelectedRequest(data.request);
        // Refresh full list
        fetchData();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error updating request:', err);
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    if (requests.length === 0) return;

    const headers = [
      'Numero',
      'Date',
      'Client',
      'Telephone',
      'Quartier',
      'Zone',
      'Medicaments',
      'Statut',
      'Pharmacie',
      'Coursier',
      'Prix_Medicaments',
      'Frais_Livraison',
      'Commission_PhamaFind_15pct',
      'Total_FCFA',
    ];

    const rows = requests.map((r) => [
      r.number,
      new Date(r.createdAt).toLocaleString('fr-FR'),
      `"${r.customer.name}"`,
      r.customer.phone,
      `"${r.customer.quarter}"`,
      `Zone ${r.customer.zone}`,
      `"${r.items.map((i) => `${i.quantity}x ${i.name}`).join(' ; ')}"`,
      r.status,
      `"${r.order?.pharmacyName || '-'}"`,
      `"${r.order?.courierName || '-'}"`,
      r.order?.medsPrice || 0,
      r.order?.deliveryFee || (r.customer.zone === 2 ? 2000 : 1000),
      r.order?.commissionAmount || Math.round((r.order?.medsPrice || 0) * 0.15),
      r.order?.total || 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `phamafind_demandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate WhatsApp notification link
  const getWhatsAppNotifyLink = (r: MedicationRequest) => {
    const phone = '237' + r.customer.phone.replace(/\D/g, '').slice(-9);
    let msg = `Bonjour ${r.customer.name}, ici l'équipe PhamaFind au sujet de votre demande n° *${r.number}*.\n\n`;

    if (r.status === 'En recherche') {
      msg += `🔍 Nos équipes parcourent actuellement les officines partenaires de Douala pour réunir vos médicaments.`;
    } else if (r.status === 'Pharmacie trouvée' || r.status === 'Prix confirmé') {
      const pharm = r.order?.pharmacyName || 'notre pharmacie partenaire conventionnée';
      const total = r.order?.total ? `${r.order.total.toLocaleString('fr-FR')} FCFA` : 'selon zone';
      const finalizeUrl = typeof window !== 'undefined' ? `${window.location.origin}/suivi?number=${r.number}` : `https://phamafind.cm/suivi?number=${r.number}`;
      msg += `✅ Bonne nouvelle ! Vos médicaments sont disponibles à la *${pharm}*.\n💰 Montant total (médicaments + livraison 1h) : *${total}*.\n\n👉 Cliquez sur ce lien pour finaliser votre commande et choisir votre mode de paiement (Orange Money, MTN MoMo ou Espèces) :\n${finalizeUrl}`;
    } else if (r.status === 'En livraison') {
      const cour = r.order?.courierName || 'notre coursier moto';
      msg += `🚀 Vos médicaments sont en route avec ${cour} (sac isotherme scellé). Livraison estimée dans moins de 35 min !`;
    } else if (r.status === 'Livrée') {
      msg += `🎉 Vos médicaments ont bien été livrés. Merci de votre confiance en PhamaFind Douala ! Prenez soin de vous.`;
    } else if (r.status === 'Indisponible') {
      msg += `⚠️ Vos médicaments sont actuellement en rupture dans nos 35 pharmacies partenaires de Douala. Notre pharmacien conseil reste à votre écoute pour une alternative.`;
    } else {
      msg += `📌 Statut actuel : *${r.status}*. Nous restons disponibles pour toute question.`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  // Auto-calculated commission & totals
  const deliveryFee = selectedRequest?.customer.zone === 2 ? 2000 : 1000;
  const commission15 = Math.round(editMedsPrice * 0.15);
  const pharmacyPayout = editMedsPrice - commission15;
  const calculatedTotal = editMedsPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-body">
      {/* ============================================================ */}
      {/* TOP BAR / OPERATOR HEADER                                    */}
      {/* ============================================================ */}
      <header className="bg-primary text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-primary font-black shadow-xs">
                PF
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight">
                  Phama<span className="text-white/90">Find</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-200">
                  Back-Office Opérateur
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-block w-px h-6 bg-white/20 mx-2" />

            <div className="hidden md:flex items-center gap-2 bg-emerald-900/40 px-3 py-1 rounded-full text-xs font-medium text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Secteur : Douala (35 pharmacies connectées)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
              title="Rafraîchir les données"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>

            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 bg-white text-primary hover:bg-emerald-50 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 text-xs text-emerald-100 hover:text-white transition-colors"
            >
              <span>Site public</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN CONTAINER                                               */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-card p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-muted text-xs font-medium">
              <span>Demandes du jour</span>
              <FileText size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-extrabold text-ink mt-2">
              {stats.todayRequests}
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              +{stats.inProgress} en cours
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-muted text-xs font-medium">
              <span>Taux de succès</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-ink mt-2">
              {stats.successRate}%
            </div>
            <p className="text-[11px] text-muted font-medium mt-1">
              Objectif ≥ 90%
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-muted text-xs font-medium">
              <span>Délai moyen</span>
              <Clock size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-ink mt-2">
              {stats.averageDeliveryMinutes} min
            </div>
            <p className="text-[11px] text-primary font-bold mt-1">
              Garantie ≤ 1h
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-muted text-xs font-medium">
              <span>Volume d&apos;affaires</span>
              <DollarSign size={16} className="text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-ink mt-2">
              {stats.totalRevenue.toLocaleString('fr-FR')} <span className="text-xs font-semibold">FCFA</span>
            </div>
            <p className="text-[11px] text-muted font-medium mt-1">
              Médicaments + courses
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between text-emerald-900 text-xs font-bold">
              <span>Commissions PhamaFind</span>
              <Percent size={16} className="text-primary" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-primary mt-2">
              {stats.totalCommissions.toLocaleString('fr-FR')} <span className="text-xs font-semibold">FCFA</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              15% sur prix officine
            </p>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-card p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par n° (PF-...), nom client, médicament, quartier..."
                className="w-full bg-[#F9F9F9] border border-slate-200 text-ink text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Zone filter */}
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-muted" />
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="bg-[#F9F9F9] border border-slate-200 text-ink text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Toutes les zones Douala</option>
                <option value="zone1">Zone 1 (1 000 FCFA - Akwa, Bonanjo...)</option>
                <option value="zone2">Zone 2 (2 000 FCFA - Bonamoussadi, Kotto...)</option>
              </select>
            </div>
          </div>

          {/* Status chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedStatus === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-slate-100 text-muted hover:bg-slate-200'
              }`}
            >
              Tous ({requests.length})
            </button>
            {Object.keys(STATUS_CONFIG).map((statusKey) => {
              const cfg = STATUS_CONFIG[statusKey as OrderStatus];
              const count = requests.filter((r) => r.status === statusKey).length;
              return (
                <button
                  key={statusKey}
                  onClick={() => setSelectedStatus(statusKey)}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap border transition-all ${
                    selectedStatus === statusKey
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-2 ring-primary/20`
                      : 'bg-white text-body border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {statusKey} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* REQUESTS TABLE */}
        <div className="bg-card rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 text-muted font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Réf & Heure</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Quartier & Zone</th>
                  <th className="py-3.5 px-4">Médicaments</th>
                  <th className="py-3.5 px-4">Statut</th>
                  <th className="py-3.5 px-4">Pharmacie & Coursier</th>
                  <th className="py-3.5 px-4">Montant</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted">
                      <RefreshCw size={24} className="animate-spin mx-auto text-primary mb-2" />
                      <span>Chargement des demandes en temps réel...</span>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted">
                      <AlertTriangle size={24} className="mx-auto text-amber-500 mb-2" />
                      <span>Aucune demande ne correspond à ces critères.</span>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((r) => {
                    const statusCfg = STATUS_CONFIG[r.status] || STATUS_CONFIG['Reçue'];
                    const timeAgoMinutes = Math.round(
                      (Date.now() - new Date(r.createdAt).getTime()) / (60 * 1000)
                    );

                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Ref & Date */}
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-ink block">
                            {r.number}
                          </span>
                          <span className="text-[11px] text-muted">
                            il y a {timeAgoMinutes} min
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-ink block">
                            {r.customer.name}
                          </span>
                          <span className="text-[11px] text-muted">
                            {r.customer.phone}
                          </span>
                        </td>

                        {/* Quarter & Zone */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-body block">
                            {r.customer.quarter}
                          </span>
                          <span
                            className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                              r.customer.zone === 1
                                ? 'bg-emerald-50 text-primary border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            Zone {r.customer.zone} (
                            {r.customer.zone === 1 ? '1 000 F' : '2 000 F'})
                          </span>
                        </td>

                        {/* Medication Items */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-medium text-ink truncate">
                            {r.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                          </div>
                          {r.prescriptionFileName && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-accent font-bold mt-0.5">
                              <FileText size={10} />
                              <span>Ordonnance jointe</span>
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                          >
                            {r.status}
                          </span>
                        </td>

                        {/* Pharmacy & Courier */}
                        <td className="py-3.5 px-4">
                          <div className="text-xs">
                            <span className="font-semibold text-ink block truncate max-w-[150px]">
                              {r.order?.pharmacyName || '— Non assignée'}
                            </span>
                            <span className="text-muted text-[11px] block truncate max-w-[150px]">
                              {r.order?.courierName || '— Coursier en attente'}
                            </span>
                          </div>
                        </td>

                        {/* Pricing */}
                        <td className="py-3.5 px-4">
                          {r.order?.total ? (
                            <div>
                              <span className="font-extrabold text-ink">
                                {r.order.total.toLocaleString('fr-FR')} F
                              </span>
                              <span className="block text-[10px] text-primary font-bold">
                                Com: +{r.order.commissionAmount} F
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted text-xs italic">En devis</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={getWhatsAppNotifyLink(r)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-primary hover:bg-emerald-100 transition-colors"
                              title="Notifier le client via WhatsApp"
                            >
                              <MessageCircle size={15} />
                            </a>
                            <button
                              onClick={() => openEditModal(r)}
                              className="flex items-center gap-1 bg-primary text-white hover:bg-primary/90 px-3 py-1.5 rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-95"
                            >
                              <span>Traiter</span>
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* REQUEST TREATMENT MODAL / DRAWER                             */}
      {/* ============================================================ */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-card w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg">
                    Dossier {selectedRequest.number}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-white/20 text-white`}
                  >
                    {selectedRequest.source}
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Reçue le {new Date(selectedRequest.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Customer Box */}
              <div className="bg-[#F9F9F9] p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User size={14} className="text-primary" />
                    <span>Informations Patient</span>
                  </h4>
                  <p className="font-extrabold text-ink text-base">
                    {selectedRequest.customer.name}
                  </p>
                  <p className="text-sm font-semibold text-primary mt-0.5 flex items-center gap-1">
                    <Phone size={13} />
                    <a href={`tel:${selectedRequest.customer.phone}`} className="hover:underline">
                      +237 {selectedRequest.customer.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    <span>Lieu de livraison Douala</span>
                  </h4>
                  <p className="text-sm font-bold text-ink">
                    Quartier : {selectedRequest.customer.quarter}{' '}
                    <span className="text-xs text-muted font-semibold">
                      (Zone {selectedRequest.customer.zone})
                    </span>
                  </p>
                  <p className="text-xs text-body mt-0.5">
                    {selectedRequest.customer.address}
                  </p>
                  {selectedRequest.customer.landmark && (
                    <p className="text-xs text-muted italic mt-0.5">
                      Repère : {selectedRequest.customer.landmark}
                    </p>
                  )}
                </div>
              </div>

              {/* Medication list & Prescription */}
              <div>
                <h4 className="text-sm font-bold text-ink mb-2">
                  Médicaments demandés ({selectedRequest.items.length})
                </h4>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 divide-y divide-slate-100">
                  {selectedRequest.items.map((it, idx) => (
                    <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                      <span className="font-bold text-ink text-sm">
                        {it.name}
                      </span>
                      <span className="text-xs bg-slate-100 font-bold px-2 py-1 rounded-md text-slate-700">
                        Qté : {it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedRequest.prescriptionFileName && (
                  <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-accent" />
                      <div>
                        <p className="text-xs font-bold text-ink">
                          Ordonnance médicale jointe
                        </p>
                        <p className="text-[11px] text-muted font-mono">
                          {selectedRequest.prescriptionFileName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-accent font-bold px-2 py-1 bg-white rounded-lg border border-accent/20">
                      À faire contrôler par le pharmacien
                    </span>
                  </div>
                )}
              </div>

              {/* Treatment Form */}
              <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-slate-200">
                <h4 className="text-sm font-extrabold text-ink">
                  Traitement & Dispatching Opérateur
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Pharmacy */}
                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      Pharmacie partenaire localisée
                    </label>
                    <select
                      value={editPharmacyId}
                      onChange={(e) => setEditPharmacyId(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl text-xs sm:text-sm font-medium px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Sélectionner une pharmacie...</option>
                      {PARTNER_PHARMACIES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Courier */}
                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      Coursier moto assigné
                    </label>
                    <select
                      value={editCourierId}
                      onChange={(e) => setEditCourierId(e.target.value)}
                      className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl text-xs sm:text-sm font-medium px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Sélectionner un coursier...</option>
                      {COURIERS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing & Automatic 15% commission calculator */}
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
                  <h5 className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign size={14} />
                    <span>Calculateur financier automatique (15% PhamaFind)</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        Prix pharmacie des médicaments (FCFA) :
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={editMedsPrice}
                        onChange={(e) => setEditMedsPrice(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        Frais de livraison (fixe selon zone) :
                      </label>
                      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-ink">
                        {deliveryFee.toLocaleString('fr-FR')} FCFA (Zone {selectedRequest.customer.zone})
                      </div>
                    </div>
                  </div>

                  {/* Financial breakdown */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                      <span className="text-muted block text-[10px] font-bold">Commission 15%</span>
                      <span className="text-primary font-black text-sm">
                        {commission15.toLocaleString('fr-FR')} F
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                      <span className="text-muted block text-[10px] font-bold">Reversement Pharmacie</span>
                      <span className="text-ink font-bold text-sm">
                        {pharmacyPayout.toLocaleString('fr-FR')} F
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-300 text-center bg-gradient-to-br from-emerald-50 to-white">
                      <span className="text-primary block text-[10px] font-bold">Total Client</span>
                      <span className="text-ink font-black text-sm">
                        {calculatedTotal.toLocaleString('fr-FR')} F
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Payment Method */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      Statut de la commande
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                      className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-ink px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {Object.keys(STATUS_CONFIG).map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      Moyen de paiement
                    </label>
                    <select
                      value={editPaymentMethod}
                      onChange={(e) => setEditPaymentMethod(e.target.value as 'orange' | 'mtn' | 'cash')}
                      className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl text-xs sm:text-sm font-medium px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="orange">Orange Money</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="cash">Espèces à la livraison</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      Statut paiement
                    </label>
                    <select
                      value={editPaymentStatus}
                      onChange={(e) => setEditPaymentStatus(e.target.value as 'en_attente' | 'paye' | 'echec')}
                      className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl text-xs sm:text-sm font-medium px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="en_attente">En attente</option>
                      <option value="paye">Payé</option>
                      <option value="echec">Échec / Annulé</option>
                    </select>
                  </div>
                </div>

                {/* Operator Notes */}
                <div>
                  <label className="block text-xs font-bold text-muted mb-1">
                    Notes internes opérateur
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Instructions particulières, contact pharmacien, étage..."
                    className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Status Timeline */}
                <div className="pt-2">
                  <h5 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Historique du dossier
                  </h5>
                  <div className="space-y-1.5 text-xs">
                    {selectedRequest.statusHistory.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-bold text-ink">{h.status}</span>
                        <span>— {new Date(h.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[11px] italic">({h.by})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <a
                    href={getWhatsAppNotifyLink(selectedRequest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>Notifier le client sur WhatsApp</span>
                  </a>

                  <div className="w-full sm:w-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(null)}
                      className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-muted hover:bg-slate-100 transition-colors"
                    >
                      Fermer
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-1/2 sm:w-auto flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95 disabled:opacity-50"
                    >
                      {saving ? (
                        <span>Enregistrement...</span>
                      ) : saveSuccess ? (
                        <>
                          <Check size={14} />
                          <span>Mis à jour !</span>
                        </>
                      ) : (
                        <span>Enregistrer</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
