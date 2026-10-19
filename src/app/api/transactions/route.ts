import { NextRequest, NextResponse } from 'next/server';
import { generateDummyTransactions } from '@/services/transactionService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countParam = searchParams.get('count');

    let count = 5000;
    if (countParam) {
      const parsed = parseInt(countParam, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 50000) {
        count = parsed;
      }
    }

    const data = generateDummyTransactions(count);

    return NextResponse.json(
      {
        success: true,
        total: data.length,
        data,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing transaction data.',
      },
      { status: 500 }
    );
  }
}
