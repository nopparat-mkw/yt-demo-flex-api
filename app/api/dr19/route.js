import { NextResponse } from 'next/server';

// This will handle GET requests
export async function GET() {
  // Create a simple Flex Message JSON response
  const flexMessage = {
    stockName_1: "NINTENDO19",
    displayNew_1: "New",
    displayNewColor_1: "",
    displayValue_1: "18.90",
    displayChange_1: "+ 1.07 %",
    displayChangeColor_1: "",
    displayBid_1: "18.90",
    displayAsk_1: "19.10",

    stockName_2: "SIA19",
    displayNew_2: "New",
    displayNewColor_2: "",
    displayValue_2: "18.90",
    displayChange_2: "+ 1.07 %",
    displayChangeColor_2: "",
    displayBid_2: "18.90",
    displayAsk_2: "19.10",

    stockName_3: "STEG19",
    displayNew_3: "New",
    displayNewColor_3: "",
    displayValue_3: "18.90",
    displayChange_3: "+ 1.07 %",
    displayChangeColor_3: "",
    displayBid_3: "18.90",
    displayAsk_3: "19.10",

    stockName_4: "VENTURE19",
    displayNew_4: "New",
    displayNewColor_4: "",
    displayValue_4: "18.90",
    displayChange_4: "+ 1.07 %",
    displayChangeColor_4: "",
    displayBid_4: "18.90",
    displayAsk_4: "19.10",

    stockName_5: "SMFG19",
    displayNew_5: "New",
    displayNewColor_5: "",
    displayValue_5: "18.90",
    displayChange_5: "+ 1.07 %",
    displayChangeColor_5: "",
    displayBid_5: "18.90",
    displayAsk_5: "19.10",

    stockName_6: "GOLD19",
    displayNew_6: "New",
    displayNewColor_6: "",
    displayValue_6: "18.90",
    displayChange_6: "+ 1.07 %",
    displayChangeColor_6: "",
    displayBid_6: "18.90",
    displayAsk_6: "19.10"
  };

  // Return a JSON response
  return NextResponse.json(flexMessage);
}
