"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./api/routes/userRoutes"));
const companyRoutes_1 = __importDefault(require("./api/routes/companyRoutes"));
const alpacaRoutes_1 = __importDefault(require("./api/routes/alpacaRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api', companyRoutes_1.default);
app.use('/api', alpacaRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});
exports.default = app;
