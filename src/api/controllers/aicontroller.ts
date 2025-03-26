import { OpenAI } from "openai";
import {
  Fetchandmap,
  existingStock,
  addStock,
} from "../services/alpacaServices";
import { ChatCompletionResponse } from "../types/types";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Company } from "@prisma/client/wasm";


const ApiKey = process.env.OPEN_AI_KEY;

const openai = new OpenAI({
  apiKey: ApiKey,
});


export const openAiCall: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  const query = req.body.query;
  try {
  const tools: any = [
    {
      type: "function",
      function: {
        name: "get_stock_data",
        description:
          "Get the symbol for a given stock using a function and not preknown knowledge.",
        parameters: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "the ticker symbol for the selected stock",
            },
            companyHistory: {
              type: "string",
              description: "a detailed description of the company",
            },
          },
          required: ["symbol", "companyHistory"],

          additionalProperties: false, // aloows for exact paramater mathcing for downstream processes
        },
        strict: true, // defines strict paramater constraints for downstream processes
      },
    },
  ];

  const messages: any = [{ role: "user", content: `${query}` }];

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    tools,
    store: true,
  }) as ChatCompletionResponse;

  const respone = await processCompletion(chatCompletion); 
  res.status(200).json(respone);
}
catch (error) {
  console.error("Error processing chat completion:", error);
  res.status(500).json({ error: "Error processing chat completion" });
}
} 



async function processCompletion(
  completion: ChatCompletionResponse
): Promise< Partial<Company>> {
  try {
    // Loop through each tool call
    const toolCalls = completion.choices[0].message?.tool_calls;

    if (toolCalls && Array.isArray(toolCalls)) {
      for (const toolCall of toolCalls)  { 
        const { name } = toolCall.function;
        const args = JSON.parse(toolCall.function.arguments);
        const { symbol, companyHistory } = args;

        console.log("companyHistory args", companyHistory);

        const stock = await existingStock(symbol);
        if (stock) {
          return stock
        } else {
          const stockData = await addStock(symbol);
          console.log("Stock Data:", stockData);
          return stockData;  
      }
    }
  }
   throw new Error("Error processing tool calls");
  } catch (error) {
    console.error("Error processing tool calls:", error);
    throw new Error("Error processing")
  }
}
