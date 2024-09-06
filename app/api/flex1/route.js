import { NextResponse } from 'next/server';

// This will handle GET requests
export async function GET() {
  // Create a simple Flex Message JSON response
  const flexMessage = {
    stockName1: "NINTENDO19",
    stockNew1: "New",

    stockName2: "SIA19",
    stockNew2: "",

    stockName2: "STEG19",
    stockNew2: "",

    stockName2: "VENTURE19",
    stockNew2: "",

    stockName2: "SMFG19",
    stockNew2: "",

    stockName2: "GOLD19",
    stockNew2: ""
  };

  // Return a JSON response
  return NextResponse.json(flexMessage);
}
