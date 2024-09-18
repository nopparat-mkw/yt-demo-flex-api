import { NextResponse } from 'next/server';

// This will handle GET requests
export async function GET() {
  // Create a simple Flex Message JSON response
  const flexMessage = {
    drMarketData : {

    symbol_1: "GOLD19",
    displayNewImage_1: "",
    displayValue_1: "18.90",
    displayChange_1: "+ 1.07 %",
    displayChangeColor_1: "",
    displayBid_1: "18.90",
    displayAsk_1: "19.10",

    symbol_2: "SMFG19",
    displayNewImage_2: "",
    displayValue_2: "18.90",
    displayChange_2: "+ 1.07 %",
    displayChangeColor_2: "",
    displayBid_2: "18.90",
    displayAsk_2: "19.10",

    symbol_3: "VENTURE19",
    displayNewImage_3: "",
    displayValue_3: "18.90",
    displayChange_3: "+ 1.07 %",
    displayChangeColor_3: "",
    displayBid_3: "18.90",
    displayAsk_3: "19.10",

    symbol_4: "STEG19",
    displayNewImage_4: "",
    displayValue_4: "18.90",
    displayChange_4: "+ 1.07 %",
    displayChangeColor_4: "",
    displayBid_4: "18.90",
    displayAsk_4: "19.10",

    symbol_5: "SIA19",
    displayNewImage_5: "",
    displayValue_5: "18.90",
    displayChange_5: "+ 1.07 %",
    displayChangeColor_5: "",
    displayBid_5: "18.90",
    displayAsk_5: "19.10",

    symbol_6: "NINTENDO19",
    displayNewImage_6: "",
    displayValue_6: "18.90",
    displayChange_6: "+ 1.07 %",
    displayChangeColor_6: "",
    displayBid_6: "18.90",
    displayAsk_6: "19.10",
    
    symbol_7: "INDIAESG19",
    displayNewImage_7: "",
    displayValue_7: "18.90",
    displayChange_7: "+ 1.07 %",
    displayChangeColor_7: "",
    displayBid_7: "18.90",
    displayAsk_7: "19.10",
    
    symbol_8: "UOB19",
    displayNewImage_8: "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
    displayValue_8: "18.90",
    displayChange_8: "+ 1.07 %",
    displayChangeColor_8: "",
    displayBid_8: "18.90",
    displayAsk_8: "19.10",
    
    symbol_9: "THAIBEV19",
    displayNewImage_9: "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
    displayValue_9: "18.90",
    displayChange_9: "+ 1.07 %",
    displayChangeColor_9: "",
    displayBid_9: "18.90",
    displayAsk_9: "19.10",
    
    symbol_10: "DBS19",
    displayNewImage_10: "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
    displayValue_10: "18.90",
    displayChange_10: "+ 1.07 %",
    displayChangeColor_10: "",
    displayBid_10: "18.90",
    displayAsk_10: "19.10"
  }
};

  // Return a JSON response
  return NextResponse.json(flexMessage);
}