import { NextRequest, NextResponse } from 'next/server';
import { getRequestByNumber, updateMedicationRequest } from '@/lib/requestsStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { number, paymentMethod, address } = body;

    if (!number) {
      return NextResponse.json(
        { error: 'Numéro de commande obligatoire.' },
        { status: 400 }
      );
    }

    const existing = getRequestByNumber(number);
    if (!existing) {
      return NextResponse.json(
        { error: 'Commande introuvable.' },
        { status: 404 }
      );
    }

    // Customer can finalize if status is 'Pharmacie trouvée' or 'Prix confirmé'
    const validStatuses = ['Pharmacie trouvée', 'Prix confirmé', 'Reçue', 'En recherche'];
    if (!validStatuses.includes(existing.status)) {
      return NextResponse.json(
        { error: `Cette commande est déjà au statut ${existing.status}.` },
        { status: 400 }
      );
    }

    const nextStatus = paymentMethod === 'cash' ? 'En livraison' : 'Payée';

    const orderData = existing.order || {
      pharmacyId: 'ph-1',
      pharmacyName: 'Pharmacie partenaire conventionnée',
      courierId: 'cour-1',
      courierName: 'Alain Mbarga (Moto 12)',
      medsPrice: 3500,
      commissionRate: 0.15,
      commissionAmount: 525,
      deliveryFee: existing.customer.zone === 2 ? 2000 : 1000,
      total: 3500 + (existing.customer.zone === 2 ? 2000 : 1000),
      pharmacyPayout: 2975,
      paymentMethod: paymentMethod || 'orange',
      paymentStatus: paymentMethod === 'cash' ? 'en_attente' : 'paye',
    };

    const updated = updateMedicationRequest(existing.id, {
      newStatus: nextStatus,
      updatedBy: `Client (${existing.customer.name})`,
      order: {
        ...orderData,
        paymentMethod: paymentMethod || 'orange',
        paymentStatus: paymentMethod === 'cash' ? 'en_attente' : 'paye',
      },
      customer: {
        ...existing.customer,
        address: address ? address.trim() : existing.customer.address,
      },
    });

    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur lors de la confirmation.';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
