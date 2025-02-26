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
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.fetchCompanies = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const fetchCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${API_URL}/companies`);
    return response.data;
});
exports.fetchCompanies = fetchCompanies;
const createCompany = (symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${API_URL}/company`, { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume });
    return response.data;
});
exports.createCompany = createCompany;
const updateCompany = (id, symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.put(`${API_URL}/company/${id}`, { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume });
    return response.data;
});
exports.updateCompany = updateCompany;
const deleteCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.delete(`${API_URL}/company/${id}`);
    return response.data;
});
exports.deleteCompany = deleteCompany;
