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
exports.deleteUser = exports.updateUser = exports.createUser = exports.fetchUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'http://localhost:3000/api';
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${API_URL}/users`);
    return response.data;
});
exports.fetchUsers = fetchUsers;
const createUser = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${API_URL}/user`, { name, email });
    return response.data;
});
exports.createUser = createUser;
const updateUser = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.put(`${API_URL}/user/${id}`, { name, email });
    return response.data;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.delete(`${API_URL}/user/${id}`);
    return response.data;
});
exports.deleteUser = deleteUser;
