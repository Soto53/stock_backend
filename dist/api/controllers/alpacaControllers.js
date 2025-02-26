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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockSnapshot = void 0;
const alpacaServices_1 = require("../services/alpacaServices");
const getStockSnapshot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol } = req.params;
    const stockData = yield (0, alpacaServices_1.fetchStockData)(symbol);
    console.log('Stock Data:', stockData);
    res.json(stockData);
});
exports.getStockSnapshot = getStockSnapshot;
