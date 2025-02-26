"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyControllers_1 = require("../controllers/companyControllers");
const router = express_1.default.Router();
router.post('/company', companyControllers_1.createCompany);
router.get('/companies', companyControllers_1.getCompanies);
router.put('/company/:id', companyControllers_1.updateCompany);
router.delete('/company/:id', companyControllers_1.deleteCompany);
exports.default = router;
