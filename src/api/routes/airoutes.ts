import express from 'express';
import { OpenAI } from "openai";
import { getStockSnapshot, getMapped, getSymbol, addStockController } from '../controllers/alpacaControllers';
import {openAiCall  } from '../controllers/aicontroller'

const router = express.Router();


router.post('/ask-openai', openAiCall);
 



export default router;