import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { email } = data || {};
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }
    // Stub persistence; integrate ESP later
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}


