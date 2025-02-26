import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const fetchCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`);
  return response.data;
};

export const createCompany = async (symbol: string, stock_price: number, name: string, exchange: string, open: number, high: number, low: number, close: number, volume: number, previous_close: number, change: number, average_volume: number) => {
  const response = await axios.post(`${API_URL}/company`, { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume });
  return response.data;
};

export const updateCompany = async (id: number, symbol: string, stock_price: number, name: string, exchange: string, open: number, high: number, low: number, close: number, volume: number, previous_close: number, change: number, average_volume: number) => {
  const response = await axios.put(`${API_URL}/company/${id}`, { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume });
  return response.data;
};

export const deleteCompany = async (id: number) => {
  const response = await axios.delete(`${API_URL}/company/${id}`);
  return response.data;
};

