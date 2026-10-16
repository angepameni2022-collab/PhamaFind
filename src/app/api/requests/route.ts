import { NextRequest, NextResponse } from 'next/server';
import { createMedicationRequest } from '@/lib/requestsStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { customer, items, prescriptionFileName, notes, source } = body;

    // Validation
    if (!customer?.name || !customer?.phone || !customer?.quarter) {
      return NextResponse.json(
        { error: 'Nom, numéro de téléphone et quartier sont obligatoires.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0 || !items[0].name) {
      return NextResponse.json(
        { error: 'Veuillez indiquer au moins un médicament.' },
        { status: 400 }
      );
    }

    const newRequest = createMedicationRequest({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address?.trim() || '',
        landmark: customer.landmark?.trim() || '',
        quarter: customer.quarter,
        zone: customer.zone === 2 ? 2 : 1,
      },
      items: items.map((i: { name: string; quantity?: number }) => ({
        name: i.name.trim(),
        quantity: Math.max(1, Number(i.quantity) || 1),
      })),
      prescriptionFileName,
      notes,
      source: source || 'site',
    });

    // Build pre-filled WhatsApp link as specified in Section 6.2 and 9
    const itemsList = newRequest.items.map((i) => `• ${i.name} (x${i.quantity})`).join('\n');
    const waText = encodeURIComponent(
      `Bonjour PhamaFind ! Je viens d'envoyer la demande ${newRequest.number} :\n` +
      `- Client : ${newRequest.customer.name} (${newRequest.customer.phone})\n` +
      `- Quartier : ${newRequest.customer.quarter} (${newRequest.customer.address || 'Sans précision'})\n` +
      `- Médicament(s) :\n${itemsList}\n` +
      (newRequest.prescriptionFileName ? `- Ordonnance jointe : ${newRequest.prescriptionFileName}\n` : '') +
      `Pouvez-vous confirmer la disponibilité et le prix en pharmacie partenaire ?`
    );

    const whatsappUrl = `https://wa.me/237681192943?text=${waText}`;

    return NextResponse.json(
      {
        success: true,
        request: newRequest,
        whatsappUrl,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la création de la demande.';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
