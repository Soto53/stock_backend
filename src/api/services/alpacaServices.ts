import axios from 'axios';

const ALPACA_API_KEY = process.env.ALPACA_API_KEY || 'PKMQH30TFV7J4VZ7XD2J';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || 'AtoRkjIvkgnmcOZQRe8B7WZGKZdjFgbHF3Ov4gz9';
const ALPACA_API_BASE_URL = 'https://data.alpaca.markets/v2';

const alpacaApi = axios.create({
  baseURL: ALPACA_API_BASE_URL,
  headers: {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
  },
});

export const fetchStockData = async (symbol: string) => {
  const response = await alpacaApi.get(`/stocks/${symbol}/snapshot`);
  console.log('Fetched Data:', response.data);
  return response.data;
};

