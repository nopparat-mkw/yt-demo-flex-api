import { NextResponse } from 'next/server';

// This will handle GET requests
export async function GET() {
  // Create a simple Flex Message JSON response
  const flexMessage = {
    type: "flex",
    message: "Hello, I'm M"
  };

  // Return a JSON response
  return NextResponse.json(flexMessage);
}
