import { NextResponse } from "next/server";
import axios from "axios";

const urlDynamicMessage = process.env.CHATCONE_URL_DYNAMIC_MESSAGE;
const CHATCONE_API_KEY = process.env.CHATCONE_API_KEY;
const CHATCONE_CHANNEL_KEY = process.env.CHATCONE_CHANNEL_KEY;
const VALID_CHATCONE_X_KEY = process.env.CHATCONE_KEY;

const reqHeaders = {
  api_key: `${CHATCONE_API_KEY}`,
  channel_key: `${CHATCONE_CHANNEL_KEY}`,
};

const messageId = '66e7e6a3236b483519bf7022';

const chatConeNoti = async (customer_id, customer_type) => {
  const payload = {
    "type": "CUSTOMER_ID",
    "message_id": `${messageId}`,
    "data": [
      {
        "customer_id": `${customer_id}`,

        "symbol_1": "GOLD19",
        "displayNewImage_1": "",
        "displayValue_1": "18.90",
        "displayChange_1": "+ 1.07 %",
        "displayChangeColor_1": "",
        "displayBid_1": "18.90",
        "displayAsk_1": "19.10",
        "symbol_2": "SMFG19",
        "displayNewImage_2": "",
        "displayValue_2": "18.90",
        "displayChange_2": "+ 1.07 %",
        "displayChangeColor_2": "",
        "displayBid_2": "18.90",
        "displayAsk_2": "19.10",
        "symbol_3": "VENTURE19",
        "displayNewImage_3": "",
        "displayValue_3": "18.90",
        "displayChange_3": "+ 1.07 %",
        "displayChangeColor_3": "",
        "displayBid_3": "18.90",
        "displayAsk_3": "19.10",
        "symbol_4": "STEG19",
        "displayNewImage_4": "",
        "displayValue_4": "18.90",
        "displayChange_4": "+ 1.07 %",
        "displayChangeColor_4": "",
        "displayBid_4": "18.90",
        "displayAsk_4": "19.10",
        "symbol_5": "SIA19",
        "displayNewImage_5": "",
        "displayValue_5": "18.90",
        "displayChange_5": "+ 1.07 %",
        "displayChangeColor_5": "",
        "displayBid_5": "18.90",
        "displayAsk_5": "19.10",
        "symbol_6": "NINTENDO19",
        "displayNewImage_6": "",
        "displayValue_6": "18.90",
        "displayChange_6": "+ 1.07 %",
        "displayChangeColor_6": "",
        "displayBid_6": "18.90",
        "displayAsk_6": "19.10",
        "symbol_7": "INDIAESG19",
        "displayNewImage_7": "",
        "displayValue_7": "18.90",
        "displayChange_7": "+ 1.07 %",
        "displayChangeColor_7": "",
        "displayBid_7": "18.90",
        "displayAsk_7": "19.10",
        "symbol_8": "UOB19",
        "displayNewImage_8": "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
        "displayValue_8": "18.90",
        "displayChange_8": "+ 1.07 %",
        "displayChangeColor_8": "",
        "displayBid_8": "18.90",
        "displayAsk_8": "19.10",
        "symbol_9": "THAIBEV19",
        "displayNewImage_9": "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
        "displayValue_9": "18.90",
        "displayChange_9": "+ 1.07 %",
        "displayChangeColor_9": "",
        "displayBid_9": "18.90",
        "displayAsk_9": "19.10",
        "symbol_10": "DBS19",
        "displayNewImage_10": "https://img2.pic.in.th/pic/New8946469a7400e5eb.png",
        "displayValue_10": "18.90",
        "displayChange_10": "+ 1.07 %",
        "displayChangeColor_10": "",
        "displayBid_10": "18.90",
        "displayAsk_10": "19.10",
        "symbol_11": "",
        "displayNewImage_11": "",
        "displayValue_11": "",
        "displayChange_11": "",
        "displayChangeColor_11": "",
        "displayBid_11": "",
        "displayAsk_11": "",
        "symbol_12": "",
        "displayNewImage_12": "",
        "displayValue_12": "",
        "displayChange_12": "",
        "displayChangeColor_12": "",
        "displayBid_12": "",
        "displayAsk_12": "",
        "symbol_13": "",
        "displayNewImage_13": "",
        "displayValue_13": "",
        "displayChange_13": "",
        "displayChangeColor_13": "",
        "displayBid_13": "",
        "displayAsk_13": "",
        "symbol_14": "",
        "displayNewImage_14": "",
        "displayValue_14": "",
        "displayChange_14": "",
        "displayChangeColor_14": "",
        "displayBid_14": "",
        "displayAsk_14": "",
        "symbol_15": "",
        "displayNewImage_15": "",
        "displayValue_15": "",
        "displayChange_15": "",
        "displayChangeColor_15": "",
        "displayBid_15": "",
        "displayAsk_15": "",
        "symbol_16": "",
        "displayNewImage_16": "",
        "displayValue_16": "",
        "displayChange_16": "",
        "displayChangeColor_16": "",
        "displayBid_16": "",
        "displayAsk_16": "",
        "symbol_17": "",
        "displayNewImage_17": "",
        "displayValue_17": "",
        "displayChange_17": "",
        "displayChangeColor_17": "",
        "displayBid_17": "",
        "displayAsk_17": "",
        "symbol_18": "",
        "displayNewImage_18": "",
        "displayValue_18": "",
        "displayChange_18": "",
        "displayChangeColor_18": "",
        "displayBid_18": "",
        "displayAsk_18": "",
        "symbol_19": "",
        "displayNewImage_19": "",
        "displayValue_19": "",
        "displayChange_19": "",
        "displayChangeColor_19": "",
        "displayBid_19": "",
        "displayAsk_19": "",
        "symbol_20": "",
        "displayNewImage_20": "",
        "displayValue_20": "",
        "displayChange_20": "",
        "displayChangeColor_20": "",
        "displayBid_20": "",
        "displayAsk_20": ""
      }
    ]
  };
  console.log('payload:', payload);
  try {
    const response = await axios.post(urlDynamicMessage, payload, { reqHeaders });
    console.log("Response result:", response.data);
  } catch (error) {
    console.error(error);
  }
};

export async function POST(req) {
  try {
    const headers = Object.fromEntries(req.headers.entries());

    const { customer_id, customer_type, chatconexkey } = headers;

    console.log("Received customer_id:", customer_id);
    console.log("Received customer_type:", customer_type);
    console.log("Received chatconexkey:", chatconexkey);

    if (!chatconexkey || chatconexkey !== VALID_CHATCONE_X_KEY) {
      console.error("Invalid or missing chatcone-x-key header");
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    await chatConeNoti(customer_id, customer_type);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
