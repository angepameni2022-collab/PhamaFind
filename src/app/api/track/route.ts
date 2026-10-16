import { NextRequest, NextResponse } from 'next/server';
import { getRequestByNumberAndPhone, getRequestByNumber } from '@/lib/requestsStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');
  const phone = searchParams.get('phone');

  if (!number) {
    return NextResponse.json(
      { error: 'Le numéro de commande est requis (ex: PF-2026-000123).' },
      { status: 400 }
    );
  }

  const request = phone
    ? getRequestByNumberAndPhone(number, phone)
    : getRequestByNumber(number);

  if (!request) {
    return NextResponse.json(
      { error: 'Aucune commande ne correspond à ce numéro.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    request,
  });
}
