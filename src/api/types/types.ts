import { enableCompileCache } from "module"


export interface User{
    id: number,
    name: string,
    email: string,
  }

export interface Company{
  id: number,
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
}

export interface CompanyData {
  datetime: string; // Assuming datetime is a string, adjust accordingly
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

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
    Conditions:conditions,
    TimeStamp: string,
    Tape: string,
  },
  latestTrade: {
    Conditions: conditions,
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
  condition: string[],
}
// interface dailyBarValue{
//   close: number,
//   high: number ,
//   low: number ,
//   numberoftrades: number,
//   openPrice: number ,
//   Timestramp: string ,
//   Volume: number,
//   VolumeWeighted: number,
// }

// interface latestQuoteValue{
//   AskPrice: number,
//   AskSize: number,
//   AskExchange:string,
//   BidPrice: number,
//   BidSize: number,
//   BidExchange: string,
//   Conditions:conditions,
//   TimeStamp: string,
//   Tape: string,
// }



// interface latestTradeValue{
//   Conditions: conditions,
//   Trade_id: number,
//   Price: number,
//   Size: number,
//   Timestamp: string,
//   Exchange: string,
//   Tape: string,
// }

interface minuteBarValue{
  ClosePrice: number,
  HighPrice: number,
  LowPrice: number,
  NumberOfTrades: number,
  OpenPrice: number,
  Timestamp: string,
  Volume: number,
  VolumeWeightedAveragePrice: number,
}

interface preDailyBarValue{
  ClosePrice: number,
  HighPrice: number,
  LowPrice: number,
  NumberOfTrades: number,
  OpenPrice: number,
  TimeStamp: string,
  Volume: number,
  VolumeWeightedAveragePrice: number,
}