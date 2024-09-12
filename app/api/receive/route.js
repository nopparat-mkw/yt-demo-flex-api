import { NextResponse } from 'next/server';

export async function GET(req) {
  const headers = req.headers;

  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const combined = {
    headers: Object.fromEntries(headers),
    query
  };

  const combinedString = JSON.stringify(combined, null, 2);

  return new NextResponse(combinedString, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req) {
  const headers = req.headers;

  const body = await req.json();

  const combined = {
    headers: Object.fromEntries(headers),
    body
  };

  const combinedString = JSON.stringify(combined, null, 2); 

  return new NextResponse(combinedString, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
