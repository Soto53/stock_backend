"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStockData = void 0;
const axios_1 = __importDefault(require("axios"));
const ALPACA_API_KEY = process.env.ALPACA_API_KEY || 'PKMQH30TFV7J4VZ7XD2J';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || 'AtoRkjIvkgnmcOZQRe8B7WZGKZdjFgbHF3Ov4gz9';
const ALPACA_API_BASE_URL = 'https://data.alpaca.markets/v2';
const alpacaApi = axios_1.default.create({
    baseURL: ALPACA_API_BASE_URL,
    headers: {
        'APCA-API-KEY-ID': ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
    },
});
const fetchStockData = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield alpacaApi.get(`/stocks/${symbol}/snapshot`);
    console.log('Fetched Data:', response.data);
    return response.data;
});
exports.fetchStockData = fetchStockData;
