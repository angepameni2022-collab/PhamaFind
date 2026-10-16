import { NextRequest, NextResponse } from 'next/server';
import { getAllRequests } from '@/lib/requestsStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const quarter = searchParams.get('quarter');

  let list = getAllRequests();

  if (status && status !== 'all') {
    list = list.filter((r) => r.status === status);
  }

  if (quarter && quarter !== 'all') {
    list = list.filter((r) => r.customer.quarter.toLowerCase() === quarter.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    requests: list,
  });
}
