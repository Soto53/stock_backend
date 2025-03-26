import express from 'express';
import {getMarketNews } from '../controllers/marketNewsControllers';

const router = express.Router();

router.get('/news/:symbol', getMarketNews);

// router.get('/mapped/:symbol/snapshot', getMapped);

// router.get('/symbol/:symbol', getSymbol);

// router.post('/addStock/:symbol', addStockController);

// router.get('/socket/:symbol',socketData);

export default router;