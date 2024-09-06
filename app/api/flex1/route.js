import { NextResponse } from 'next/server';

// This will handle GET requests
export async function GET() {
  // Create a simple Flex Message JSON response
  const flexMessage = {
    type: "flex",
    message: "Flex Message 1"
  };

  // Return a JSON response
  return NextResponse.json(flexMessage);
}
