import { Request, Response } from 'express';
import { fetchStockData } from '../services/alpacaServices';


export const getStockSnapshot = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const stockData = await fetchStockData(symbol);
  console.log('Stock Data:', stockData);
  res.json(stockData);
};

const = TextDecoderStream; 