import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || 'BD';
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

const REQUIRED_HEADERS = ['ID', 'Nombre', 'Email', 'Mensaje', 'Fecha'];

function getSheetsClient() {
  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error(
      'Faltan variables de entorno de Google Sheets. Define GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.'
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>) {
  const headerRange = `${sheetName}!1:1`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  const existingHeaders = response.data.values?.[0] ?? [];
  const shouldUpdateHeaders =
    existingHeaders.length !== REQUIRED_HEADERS.length ||
    REQUIRED_HEADERS.some((header, index) => existingHeaders[index] !== header);

  if (shouldUpdateHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [REQUIRED_HEADERS],
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos del formulario son obligatorios.' },
        { status: 400 }
      );
    }

    const sheets = getSheetsClient();
    await ensureHeaders(sheets);

    const newRow = [randomUUID(), name, email, message, new Date().toISOString()];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:E`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [newRow],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error interno al enviar el formulario.',
      },
      { status: 500 }
    );
  }
}
