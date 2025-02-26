"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/routes/index"));
const userServices_1 = require("./api/services/userServices");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use('/api', index_1.default);
// app.get('/api', (req:Request, res: Response)=>{
//     const params= req.
//     res.json({message:'Hello from the API!'});
// });
// Route to trigger data fetch from the external API
app.get('/fetch-data', userServices_1.fetchDataFromAPI);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
