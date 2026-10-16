import { NextRequest, NextResponse } from 'next/server';
import { updateMedicationRequest, getAllRequests, OrderStatus } from '@/lib/requestsStore';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {
      status,
      pharmacyId,
      pharmacyName,
      courierId,
      courierName,
      medsPrice,
      deliveryFee: overrideDeliveryFee,
      paymentMethod,
      paymentStatus,
      notes,
      updatedBy,
    } = body;

    const existing = getAllRequests().find(r => r.id === params.id || r.number === params.id);
    const zone = existing?.customer?.zone || 1;
    const deliveryFee = overrideDeliveryFee !== undefined ? Number(overrideDeliveryFee) : (zone === 2 ? 2000 : 1000);

    const updates: Parameters<typeof updateMedicationRequest>[1] = {};

    if (status) {
      updates.newStatus = status as OrderStatus;
    }

    if (notes !== undefined) {
      updates.notes = notes;
    }

    if (updatedBy) {
      updates.updatedBy = updatedBy;
    }

    if (medsPrice !== undefined || pharmacyId || courierId) {
      const price = Number(medsPrice) || (existing?.order?.medsPrice ?? 0);
      const commissionRate = 0.15;
      const commissionAmount = Math.round(price * commissionRate);
      const total = price + deliveryFee;
      const pharmacyPayout = price - commissionAmount;

      updates.order = {
        pharmacyId: pharmacyId || existing?.order?.pharmacyId,
        pharmacyName: pharmacyName || existing?.order?.pharmacyName,
        courierId: courierId || existing?.order?.courierId,
        courierName: courierName || existing?.order?.courierName,
        medsPrice: price,
        commissionRate: 0.15,
        commissionAmount,
        deliveryFee,
        total,
        pharmacyPayout,
        paymentMethod: (paymentMethod || existing?.order?.paymentMethod || 'orange') as 'orange' | 'mtn' | 'cash',
        paymentStatus: (paymentStatus || existing?.order?.paymentStatus || 'en_attente') as 'en_attente' | 'paye' | 'echec',
      };
    }

    const updated = updateMedicationRequest(params.id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: 'Demande introuvable.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour.';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
