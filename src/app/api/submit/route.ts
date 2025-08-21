import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const received: Record<string, string> = {};
    formData.forEach((value, key) => {
      received[key] = typeof value === 'string' ? value : (value as File).name;
    });

    return NextResponse.json({
      message: 'Application submitted successfully',
      received,
    });
  } catch (error) {
    console.error('Błąd w API:', error);
    return NextResponse.json({ message: 'Błąd' }, { status: 500 });
  }
}
