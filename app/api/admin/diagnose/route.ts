import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics: Record<string, any> = {
    envDatabaseUrlExists: !!process.env.DATABASE_URL,
    databaseUrlValueCensored: null,
    dbConnectionSuccess: false,
    errorMessage: null,
    errorStack: null,
  };

  if (process.env.DATABASE_URL) {
    // Censor password in the connection string
    diagnostics.databaseUrlValueCensored = process.env.DATABASE_URL.replace(
      /(:\/\/)([^:]+)(:)([^@]+)(@)/,
      '$1$2:$3****$5'
    );
  }

  try {
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    diagnostics.dbConnectionSuccess = true;
    diagnostics.latencyMs = Date.now() - start;
  } catch (error: any) {
    diagnostics.dbConnectionSuccess = false;
    diagnostics.errorMessage = error instanceof Error ? error.message : String(error);
    diagnostics.errorStack = error instanceof Error ? error.stack : null;
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
