// File: app/api/webhook/route.js

import { NextResponse } from 'next/server';

// Handle POST requests from LINE Webhook
export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const body = await req.json();

    console.log('LINE Webhook body:', JSON.stringify(body, null, 2));

    // Extract message information from the body
    const message = body.events?.[0]?.message?.text;

    // Log the message to the console
    console.log('Received message from LINE Webhook:', message);

    // Respond back with a 200 OK status
    return NextResponse.json({ status: 'success', message: 'Message received' });
  } catch (error) {
    // Handle any errors and return a 500 response
    console.error('Error handling LINE Webhook:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}
