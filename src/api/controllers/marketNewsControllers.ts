import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import {addStockNews} from '../services/marketNewsService'

export const getMarketNews = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const stockSymbol = await addStockNews(symbol);

  
  // console.log('controller new', news.data[0].entities[0])

  console.log('Stock Symbol:', stockSymbol);
  res.json({ symbol: stockSymbol });
};