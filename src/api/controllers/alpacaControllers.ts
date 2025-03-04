import { Request, Response } from 'express';
import { fetchStockData, Fetchandmap,FetchSymbol, addStock } from '../services/alpacaServices';


export const getStockSnapshot = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const stockData = await fetchStockData(symbol);
  console.log('Stock Data:', stockData);
  res.json(stockData);
};

export const getMapped = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const stockMap = await Fetchandmap(symbol);
  console.log('Stock Data:', stockMap);
  res.json(stockMap);
};

  
export const getSymbol = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const stockSymbol = await FetchSymbol(symbol);
  console.log('Stock Symbol:', stockSymbol);
  res.json({ symbol: stockSymbol });
};

// export const addingStock = async (req: Request, res: Response) => {
//   const { symbol } = req.params;
//   const addDb = await addStock(symbol);
  
//   res.json({ addDb });
// };

export const addStockController = async (req: Request, res: Response) => {
  console.log('req', req);
  const { symbol } = req.params;

    const newStock = await addStock(symbol);

    // Return the new stock object or just a success message
    res.status(200).json({ message: "Stock data added successfully", newStock });

};
