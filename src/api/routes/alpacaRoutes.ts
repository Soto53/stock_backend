import express from 'express';
import { getStockSnapshot, getMapped, getSymbol, addingStock } from '../controllers/alpacaControllers';

const router = express.Router();

router.get('/stocks/:symbol/snapshot', getStockSnapshot);

router.get('/mapped/:symbol/snapshot', getMapped);

router.get('/symbol/:symbol', getSymbol);

router.post('/addStock/:symbol', addingStock);

export default router;
