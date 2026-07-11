import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || 'BD';
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
const FALLBACK_APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwvMsVELe8qOYAj9xxe-JRThE74wuqoJZ6ZBEdB_UkMKFWJ2iRYqvVunZsR32TCgDw6Fw/exec';

const REQUIRED_HEADERS = ['ID', 'Nombre', 'Email', 'Mensaje', 'Fecha'];

async function getSheetsClient() {
  const { google } = await import('googleapis');

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

async function ensureHeaders(sheets: { spreadsheets: { values: any } }) {
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

async function writeToGoogleSheets(payload: { name: string; email: string; message: string }) {
  const sheets = await getSheetsClient();
  await ensureHeaders(sheets);

  const newRow = [randomUUID(), payload.name, payload.email, payload.message, new Date().toISOString()];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:E`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [newRow],
    },
  });

  return { success: true, provider: 'google-sheets' };
}

async function writeToAppsScript(payload: { name: string; email: string; message: string }) {
  const response = await fetch(FALLBACK_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      source: 'portfolio',
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'No se pudo guardar en Google Sheets');
  }

  return { success: true, provider: 'apps-script' };
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

    try {
      return NextResponse.json(await writeToGoogleSheets({ name, email, message }));
    } catch (sheetError) {
      console.warn('Fallo la integración directa con Google Sheets, usando fallback:', sheetError);
      return NextResponse.json(await writeToAppsScript({ name, email, message }));
    }
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
