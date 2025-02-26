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
exports.DataEater = DataEater;
const externalapi_1 = require("./externalapi");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function DataEater() {
    return __awaiter(this, void 0, void 0, function* () {
        const externalData = yield (0, externalapi_1.getExternalData)();
        const { found, returned, limit, page } = externalData.data;
        console.log("found, returned, limit, page");
        const dbFilePath = path_1.default.join(__dirname, '../putjhere/users.json');
        // Create a JSON object with the data you want to save
        const dataToSave = {
            found,
            returned,
            limit,
            page,
        };
        // Write the JSON object to a file
        fs_1.default.writeFile(dbFilePath, JSON.stringify(dataToSave, null, 2), (err) => {
            if (err) {
                console.error('Error writing file', err);
            }
            else {
                console.log('Data successfully written');
            }
        });
        return externalData;
    });
}
//   interface ExternalData {
//     meta: Meta;
//   }
