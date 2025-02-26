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
exports.fetchDataFromAPI = exports.getExternalData = void 0;
const axios_1 = __importDefault(require("axios"));
const DataConsumption_1 = require("./DataConsumption");
const getExternalData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("you made it here");
    const Apires = yield axios_1.default.get('https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=vixRNSzfHufwyMBzESZuJEnCyxoG9fuy69AL2uri');
    // const externalData = Apires.data;
    console.log('almost there');
    return Apires.data;
});
exports.getExternalData = getExternalData;
const fetchDataFromAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const externalData = yield (0, DataConsumption_1.DataEater)();
        res.json({ externalData });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching external data' });
    }
});
exports.fetchDataFromAPI = fetchDataFromAPI;
