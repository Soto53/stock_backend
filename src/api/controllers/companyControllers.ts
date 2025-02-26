import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCompany = async (req: Request, res: Response) => {
  const { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume } = req.body;
  const company = await prisma.company.create({
    data: { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume, datetime: new Date() },
  });
  res.json(company);
};


export const getCompanies = async (req: Request, res: Response) => {
  const companies = await prisma.company.findMany();
  res.json(companies);
};


export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume } = req.body;
  const company = await prisma.company.update({
    where: { id: Number(id) },
    data: { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume },
  });
  res.json(company);
};


export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.company.delete({ where: { id: Number(id) } });
  res.json({ message: 'Company deleted' });
};

 




