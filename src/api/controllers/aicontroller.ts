import { OpenAI } from "openai";
import {Fetchandmap, existingStock, addStock} from '../services/alpacaServices'
import { Completion } from "openai/resources/completions.mjs";
import{Request, Response} from 'express'
// import {getStockData} from "../services/alpacaServices";
 
const ApiKey = process.env.OPEN_AI_KEY;


const openai = new OpenAI({
  apiKey: ApiKey,
});


export async function openAiCall (req:Request, res:Response){
console.log("1");

  const query = req.body.query
  console.log("query:",query);

const tools:any = [
  {
    type: "function",
    function: {
      name: "get_stock_data",
      description: "Get the symbol for a given stock using a function and not preknown knowledge.",
      parameters: {
        type : "object", 
        properties: {
          symbol: {
            type : "string" ,
          description:"the ticker symbol for the selected stock"
          },
          companyHistory: {
            type: "string",
            descriptition:"a detailed description of the company"
          }
        },
        required: ["symbol","companyHistory"],
        

        additionalProperties: false //what do additional properties look like
      },
      strict:true // i guess
    },
 
  },
];

 const messages :any =[
  { role: "user", content: `${query}` },
];


 const completion =  await openai.chat.completions.create({
  model: "gpt-4o",  
  messages,
  tools,
  store:true, 
});

console.log("completion",completion)

interface ToolCall{
  content: string
}
interface Message{
  tool_calls?:ToolCall ;

}
interface Choice{
  message:Message
}


console.log("2");

await processCompletion(completion);

function hasToolCalls (completion:any): boolean {
  return completion.choices[0].message?.tool_calls !== undefined;
}

async function processCompletion(completion: any) {
  console.log("4");
  console.log("completion",completion)
  // Check if tool_calls exist in the response
  if (!hasToolCalls(completion)) {
    console.log("No tool_calls found in completion");
    console.log("tool_calls?", completion.choices[0].message);
    return;
  }

  try {
    // Loop through each tool call
    for (const toolCall of completion.choices[0].message.tool_calls) {
      const name = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      const symbol = args.symbol;
      const companyHistory = args.companyHistory;

      console.log("companyHistory args",companyHistory);
      console.log("This is what args look like", args);
      
      if (name === "get_stock_data") {
       
        const stock = await existingStock(symbol);
        console.log("completion message",completion.choices[0].message);
        if (stock) {
          console.log("completion",completion)
          console.log("Stock found:", stock);
          const response = {stock,companyHistory,args};
          console.log("this is a collection for response",response);
          res.json(response);  
        } 
        else {
         
          try {
            const stockData = await addStock(symbol);
            console.log("Stock Data:", stockData);
           
            console.log("completion",completion)
            res.json({stockData,companyHistory,args}); 
            return; 
          } catch (error) {
            console.log("Error fetching stock data:", error);
         
            return; 
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing tool calls:", error);
    
  }
}
}


