import express from 'express';
import { getStockSnapshot } from '../controllers/alpacaControllers';

const router = express.Router();

router.get('/stocks/:symbol/snapshot', getStockSnapshot);

export default router;
