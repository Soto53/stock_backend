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
  figi_code: string,
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
  indicator: indicator[],

}

interface indicator{
  name: string,
}