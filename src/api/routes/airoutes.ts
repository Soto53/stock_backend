import express from 'express';
import {openAiCall } from '../controllers/aicontroller'

const router = express.Router();

router.post('/ask-openai', openAiCall);
 
export default router;