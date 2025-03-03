import axios from 'axios';
import {PrismaClient} from '@prisma/client'
import {alpachaInterface} from '../types/types'

const prisma = new PrismaClient(); 


const ALPACA_API_KEY = process.env.ALPACA_API_KEY || 'PKMQH30TFV7J4VZ7XD2J';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || 'AtoRkjIvkgnmcOZQRe8B7WZGKZdjFgbHF3Ov4gz9';
const ALPACA_API_BASE_URL = 'https://data.alpaca.markets/v2';

const alpacaApi = axios.create({
  baseURL: ALPACA_API_BASE_URL,
  headers: {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
  },
}
);

export const Fetchandmap = async (symbol: string): Promise<alpachaInterface> => {
  const response: any = await alpacaApi.get(`/stocks/${symbol}/snapshot`);


  const mappedResponse: alpachaInterface = {
    dailyBar: {
      close: response.data.dailyBar.c,
      high: response.data.dailyBar.h,
      low: response.data.dailyBar.l,
      numberoftrades: response.data.dailyBar.n,
      openPrice: response.data.dailyBar.o,
      Timestramp: response.data.dailyBar.t,
      Volume: response.data.dailyBar.v,
      VolumeWeighted: response.data.dailyBar.vw,
    },
    latestQuote: {
      AskPrice: response.data.latestQuote.ap,
      AskSize: response.data.latestQuote.as,
      AskExchange: response.data.latestQuote.ax,
      BidPrice: response.data.latestQuote.bp,
      BidSize: response.data.latestQuote.bs,
      BidExchange: response.data.latestQuote.bx,
      Conditions: response.data.latestQuote.c.map((condition: string) => ({ condition })), // mapping array to condition interface
      TimeStamp: response.data.latestQuote.t,
      Tape: response.data.latestQuote.z,
    },
    latestTrade: {
      Conditions: response.data.latestTrade.c.map((condition: string) => ({ condition })), // mapping array to condition interface
      Trade_id: response.data.latestTrade.i,
      Price: response.data.latestTrade.p,
      Size: response.data.latestTrade.s,
      Timestamp: response.data.latestTrade.t,
      Exchange: response.data.latestTrade.x,
      Tape: response.data.latestTrade.z,
    },
    minuteBar: {
      ClosePrice: response.data.minuteBar.c,
      HighPrice: response.data.minuteBar.h,
      LowPrice: response.data.minuteBar.l,
      NumberOfTrades: response.data.minuteBar.n,
      OpenPrice: response.data.minuteBar.o,
      Timestamp: response.data.minuteBar.t,
      Volume: response.data.minuteBar.v,
      VolumeWeightedAveragePrice: response.data.minuteBar.vw,
    },
    prevDailyBar: {
      ClosePrice: response.data.prevDailyBar.c,
      HighPrice: response.data.prevDailyBar.h,
      LowPrice: response.data.prevDailyBar.l,
      NumberOfTrades: response.data.prevDailyBar.n,
      OpenPrice: response.data.prevDailyBar.o,
      TimeStamp: response.data.prevDailyBar.t,
      Volume: response.data.prevDailyBar.v,
      VolumeWeightedAveragePrice: response.data.prevDailyBar.vw,
    },
    symbol: response.data.symbol,
  };

  console.log('Mapped Data:', mappedResponse);

  return mappedResponse;
};




export const FetchSymbol = async (symbol: string): Promise<string> => {
  const response: any = await alpacaApi.get(`/stocks/${symbol}/snapshot`);

  // Just returning the symbol from the response
  const mappedSymbol = response.data.symbol;

  console.log('Fetched Symbol:', mappedSymbol);

  return mappedSymbol;
};



export const fetchStockData = async (symbol: string) => {
  const response = await alpacaApi.get(`/stocks/${symbol}/snapshot`);
  console.log('Fetched Data:', response.data);

  return (response.data);
   
};


export const addStock = async (symbol: string) => {
  console.log("addStock initiated");

  try {
    const stockData = await Fetchandmap(symbol);

    // Check if stock exists in DB
    const getStock = await prisma.company.findUnique({
      where: { symbol: symbol },
    });

    // If stock already exists, return it
    if (getStock) {
      console.log("Stock already exists:", getStock);
      return getStock;
    }

    // Create new stock if not found
    const newStockAction = await prisma.company.create({
      data: {
        symbol: stockData.symbol,
        name: null, 
        exchange: null, 
        datetime: new Date(),
        open: stockData.dailyBar.openPrice,
        high: stockData.dailyBar.high,
        low: stockData.dailyBar.low,
        close: stockData.dailyBar.close,
        volume: stockData.dailyBar.Volume,
        previous_close: stockData.prevDailyBar.ClosePrice,
        change: null, // You can calculate or leave null
        average_volume: null, // You can calculate or leave null
        figi_code: '', // Populate if available, or leave as placeholder
      },
    });

    console.log("New Stock Added:", newStockAction);
    return newStockAction;
  } catch (error) {
    console.error("Error adding stock data:", error);
    throw new Error("Error adding stock data");
  }
};
