import { OpenAI } from "openai";
import {Fetchandmap} from '../services/alpacaServices'
import { Completion } from "openai/resources/completions.mjs";
import{Request, Response} from 'express'
// import {getStockData} from "../services/alpacaServices";
 
const openai = new OpenAI({
  apiKey: '',
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
        },
        required: ["symbol"],

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



interface ToolCall{
  content: string
}
interface Message{
  tool_calls?:ToolCall ;

}
interface Choice{
  message:Message
}

interface Completion{
  choices:Choice[]
}

console.log("2");

// function hasToolCalls (completion:any): boolean {

//   console.log("3");
//   if (completion.choices[0].message){
//     return true
//   }
// return false;
// }

function hasToolCalls (completion:any): boolean {
  return completion.choices[0].message?.tool_calls !== undefined;
}

async function  processCompletion (completion:any){
  console.log("4");
  if(!hasToolCalls(completion)){
console.log("not tool_calls found in completion")
console.log("tool_calls?",completion.choices[0].message)
return
  }
  const toolCall = completion.choices[0].message.tool_calls?.content
    try{
      console.log(toolCall)
      const args = toolCall;
      console.log(args);
      res.json(toolCall)
    // const result = await getStockData(args.symbol);
   
    }
    catch(error){
      console.log(error);
    }



}
console.log("API response:", completion.choices[0].message.tool_calls); 
processCompletion(completion);


// console.log(completion.choices[0].message.tool_calls);
if (completion.choices[0].message.tool_calls) {
  console.log(completion.choices[0].message.tool_calls);
} else {
  console.log("No tool calls found in the message.");
}

}