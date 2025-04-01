import { enableCompileCache } from "module"


export interface User{
    id: number,
    name: string,
    email: string,
  }

export interface Company{

  stockprice?: number, 
  symbol: string, 
  name?: string, 
  exchange?:string,
  datetime: Date,
  open?: number,
  high?: number,
  low?: number,
  close?:number,
  volume?:number,
  previous_close?:number,
  change?:number,
  average_volume?:number,
  figi_code?: string,
  companyHistory?:string | "default response",
}

// export interface CompanyData {
//   datetime: string; // Assuming datetime is a string, adjust accordingly
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// }

interface Meta {

  symbol: string,
  interval: string,
  currency: string,
  exchange_timezone: string,
  exchange: string,
  mic_code: string,
  type: string,
  // indicator: indicator[],

}


// this one works
export interface alpachaInterface{
  dailyBar: {
    close: number,
    high: number ,
    low: number ,
    numberoftrades: number,
    openPrice: number ,
    Timestramp: string ,
    Volume: number,
    VolumeWeighted: number,
  },
  latestQuote: {
    AskPrice: number,
    AskSize: number,
    AskExchange:string,
    BidPrice: number,
    BidSize: number,
    BidExchange: string,
    Conditions:conditions[],
    TimeStamp: string,
    Tape: string,
  },
  latestTrade: {
    Conditions: conditions[],
    Trade_id: number,
    Price: number,
    Size: number,
    Timestamp: string,
    Exchange: string,
    Tape: string,
  },
  minuteBar: {
    ClosePrice: number,
    HighPrice: number,
    LowPrice: number,
    NumberOfTrades: number,
    OpenPrice: number,
    Timestamp: string,
    Volume: number,
    VolumeWeightedAveragePrice: number,
  },
  prevDailyBar: {
    ClosePrice: number,
    HighPrice: number,
    LowPrice: number,
    NumberOfTrades: number,
    OpenPrice: number,
    TimeStamp: string,
    Volume: number,
    VolumeWeightedAveragePrice: number,
  },
  symbol: string,
}
interface conditions{
  condition: string,
}



// Represents a tool call within a message.
interface ChatToolCall {
  id: string;
  type: string;
  function: Record<string, any>; // Adjust based on the actual properties of the function call.
}

// Represents a message returned in the chat completion.
interface ChatCompletionMessage {
  role: 'assistant' | 'user' | 'system';
  content: string | null;
  tool_calls?: ChatToolCall[];
  refusal?: any; // Define a more specific type if known.
  annotations?: any[]; // Define a more specific type if known.
}

// Represents a single choice in the chat completion response.
interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage;
  logprobs: null; // Chat completions may not provide logprobs.
  finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call' | string;
}

// Detailed token usage information.
interface ChatUsageDetails {
  cached_tokens: number;
  audio_tokens: number;
}

interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: ChatUsageDetails;
  completion_tokens_details: {
    reasoning_tokens: number;
    audio_tokens: number;
    accepted_prediction_tokens: number;
    rejected_prediction_tokens: number;
  };
}

// Represents the overall chat completion response.
export interface ChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: ChatUsage;
  service_tier: string;
  system_fingerprint: string;
}