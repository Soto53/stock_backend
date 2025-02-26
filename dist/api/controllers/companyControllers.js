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
exports.deleteCompany = exports.updateCompany = exports.getCompanies = exports.createCompany = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume } = req.body;
    const company = yield prisma.company.create({
        data: { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume, datetime: new Date() },
    });
    res.json(company);
});
exports.createCompany = createCompany;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield prisma.company.findMany();
    res.json(companies);
});
exports.getCompanies = getCompanies;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume } = req.body;
    const company = yield prisma.company.update({
        where: { id: Number(id) },
        data: { symbol, stock_price, name, exchange, open, high, low, close, volume, previous_close, change, average_volume },
    });
    res.json(company);
});
exports.updateCompany = updateCompany;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.company.delete({ where: { id: Number(id) } });
    res.json({ message: 'Company deleted' });
});
exports.deleteCompany = deleteCompany;
