export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  quarter: string;
  zone: 1 | 2;
}

export interface RequestItem {
  name: string;
  quantity: number;
}

export type OrderStatus =
  | 'Reçue'
  | 'En recherche'
  | 'Pharmacie trouvée'
  | 'Prix confirmé'
  | 'Payée'
  | 'En livraison'
  | 'Livrée'
  | 'Indisponible'
  | 'Annulée';

export interface StatusHistoryEntry {
  status: OrderStatus;
  at: string;
  by: string;
}

export interface MedicationRequest {
  id: string;
  number: string; // Ex: PF-2026-000123
  createdAt: string;
  customer: CustomerInfo;
  items: RequestItem[];
  prescriptionFileName?: string;
  status: OrderStatus;
  source: 'site' | 'whatsapp';
  notes?: string;
  order?: {
    pharmacyId?: string;
    pharmacyName?: string;
    courierId?: string;
    courierName?: string;
    medsPrice: number;
    commissionRate: 0.15;
    commissionAmount: number;
    deliveryFee: number;
    total: number;
    pharmacyPayout: number;
    paymentMethod: 'orange' | 'mtn' | 'cash';
    paymentStatus: 'en_attente' | 'paye' | 'echec';
  };
  statusHistory: StatusHistoryEntry[];
}

// Global in-memory storage (singleton across server requests)
declare global {
  // eslint-disable-next-line no-var
  var __phamafind_requests__: MedicationRequest[] | undefined;
}

const INITIAL_REQUESTS: MedicationRequest[] = [
  {
    id: 'req-1',
    number: 'PF-2026-000123',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    customer: {
      name: 'Marietherese Roy',
      phone: '699301845',
      address: 'Rue Koloko, face Armée de l\'Air',
      landmark: 'Carrefour Armée de l\'Air, portail blanc',
      quarter: 'Bonapriso',
      zone: 1,
    },
    items: [
      { name: 'Doliprane Tabs 1000 mg', quantity: 2 },
      { name: 'Spasfon Lyoc 80 mg', quantity: 1 },
    ],
    prescriptionFileName: 'ordonnance-dr-kamga.jpg',
    status: 'En livraison',
    source: 'site',
    notes: 'Patient régulier - Livraison urgente',
    order: {
      pharmacyId: 'ph-3',
      pharmacyName: 'Pharmacie du Bon Secours',
      courierId: 'cour-1',
      courierName: 'Alain Mbarga (Moto 12)',
      medsPrice: 4000,
      commissionRate: 0.15,
      commissionAmount: 600,
      deliveryFee: 1000,
      total: 5000,
      pharmacyPayout: 3400,
      paymentMethod: 'orange',
      paymentStatus: 'paye',
    },
    statusHistory: [
      { status: 'Reçue', at: new Date(Date.now() - 35 * 60 * 1000).toISOString(), by: 'Système Web' },
      { status: 'En recherche', at: new Date(Date.now() - 28 * 60 * 1000).toISOString(), by: 'Opérateur Akwa' },
      { status: 'Pharmacie trouvée', at: new Date(Date.now() - 20 * 60 * 1000).toISOString(), by: 'Dr. Pharmacien' },
      { status: 'Prix confirmé', at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), by: 'Opérateur Akwa' },
      { status: 'Payée', at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), by: 'Orange Money Webhook' },
      { status: 'En livraison', at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), by: 'Alain Mbarga' },
    ],
  },
  {
    id: 'req-2',
    number: 'PF-2026-000124',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    customer: {
      name: 'Christian Nono',
      phone: '677451220',
      address: 'Carrefour Denver, face Glacier Moderne',
      landmark: 'Immeuble vitré 2ème étage',
      quarter: 'Bonamoussadi',
      zone: 2,
    },
    items: [
      { name: 'Coartem Dispersible 20/120', quantity: 1 },
      { name: 'Efferalgan 1g', quantity: 1 },
    ],
    status: 'Pharmacie trouvée',
    source: 'whatsapp',
    notes: 'Prescription validée par téléphone',
    order: {
      pharmacyId: 'ph-2',
      pharmacyName: 'Pharmacie des Palmiers',
      courierId: 'cour-2',
      courierName: 'Serge Ekotto (Moto 04)',
      medsPrice: 4150,
      commissionRate: 0.15,
      commissionAmount: 622,
      deliveryFee: 2000,
      total: 6150,
      pharmacyPayout: 3528,
      paymentMethod: 'mtn',
      paymentStatus: 'en_attente',
    },
    statusHistory: [
      { status: 'Reçue', at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), by: 'WhatsApp Bot' },
      { status: 'En recherche', at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), by: 'Opérateur Akwa' },
      { status: 'Pharmacie trouvée', at: new Date(Date.now() - 3 * 60 * 1000).toISOString(), by: 'Dr. Pharmacien' },
    ],
  },
  {
    id: 'req-3',
    number: 'PF-2026-000125',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    customer: {
      name: 'Sandrine Mballa',
      phone: '698221349',
      address: 'Rue de la Joie, près Rond-point',
      landmark: 'Boutique orange',
      quarter: 'Deido',
      zone: 1,
    },
    items: [
      { name: 'Physiolac Bio 2ème âge', quantity: 2 },
    ],
    status: 'Reçue',
    source: 'site',
    statusHistory: [
      { status: 'Reçue', at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), by: 'Système Web' },
    ],
  },
];

function getStore(): MedicationRequest[] {
  if (!global.__phamafind_requests__) {
    global.__phamafind_requests__ = [...INITIAL_REQUESTS];
  }
  return global.__phamafind_requests__;
}

export function getAllRequests(): MedicationRequest[] {
  return getStore();
}

export function getRequestByNumber(num: string): MedicationRequest | undefined {
  const store = getStore();
  const cleanNum = num.trim().toUpperCase();
  return store.find((r) => r.number.toUpperCase() === cleanNum);
}

export function getRequestByNumberAndPhone(num: string, phone: string): MedicationRequest | undefined {
  const store = getStore();
  const cleanNum = num.trim().toUpperCase();
  const cleanPhone = phone.replace(/\D/g, '').slice(-9);

  return store.find((r) => {
    const rPhone = r.customer.phone.replace(/\D/g, '').slice(-9);
    return r.number.toUpperCase() === cleanNum && (!cleanPhone || rPhone.includes(cleanPhone));
  });
}

export function createMedicationRequest(data: {
  customer: CustomerInfo;
  items: RequestItem[];
  prescriptionFileName?: string;
  source?: 'site' | 'whatsapp';
  notes?: string;
}): MedicationRequest {
  const store = getStore();

  const counter = store.length + 126;
  const number = `PF-2026-${String(counter).padStart(6, '0')}`;
  const now = new Date().toISOString();

  const newRequest: MedicationRequest = {
    id: `req-${Date.now()}`,
    number,
    createdAt: now,
    customer: data.customer,
    items: data.items,
    prescriptionFileName: data.prescriptionFileName,
    status: 'Reçue',
    source: data.source || 'site',
    notes: data.notes,
    statusHistory: [
      { status: 'Reçue', at: now, by: 'Système Web' },
    ],
  };

  store.unshift(newRequest);
  return newRequest;
}

export function updateMedicationRequest(
  id: string,
  updates: Partial<MedicationRequest> & {
    newStatus?: OrderStatus;
    updatedBy?: string;
  }
): MedicationRequest | undefined {
  const store = getStore();
  const index = store.findIndex((r) => r.id === id || r.number === id);
  if (index === -1) return undefined;

  const current = store[index];
  const now = new Date().toISOString();

  let statusHistory = current.statusHistory;
  let status = current.status;

  if (updates.newStatus && updates.newStatus !== current.status) {
    status = updates.newStatus;
    statusHistory = [
      ...statusHistory,
      {
        status: updates.newStatus,
        at: now,
        by: updates.updatedBy || 'Opérateur PhamaFind',
      },
    ];
  }

  const updated: MedicationRequest = {
    ...current,
    ...updates,
    status,
    statusHistory,
  };

  store[index] = updated;
  return updated;
}
