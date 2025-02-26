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
exports.updateCompany = exports.getCompany = exports.createCompany = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getFirstName = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("../putjhere/users.json"));
const userServices_1 = require("../services/userServices");
const getUsers = (req, res) => {
    const userlist = users_json_1.default;
    res.json(userlist);
};
exports.getUsers = getUsers;
const getFirstName = (req, res) => {
    const userlist = users_json_1.default;
    const firstName = userlist.users.map(user => ({ name: user.name }));
    res.json({ users: firstName });
};
exports.getFirstName = getFirstName;
// export const filterUser = (req:Request, res:Response)=>{
//     const{name} = req.params;
//     const userlist = users as UserList;
//     const user = userlist.users.find(user=>user.name === parseInt(name));
//     if (!user){
//         return res.status(404).json({message: 'usernotfound'})
//     }
//     res.json({message: 'userfound',user})
// }
// export async function addUserById(user:User){
//     try{
//         await userService.adduser 
//     }
// }
// export const getUser = (req:Request, res:Response)=>{
//     console.log(req.params);
//     const{id} = req.params;
//     const userlist = users as UserList;
//     const user = userlist.users.find((user)=>user.id === parseInt(id));
//     if (!user){
//         return res.status(404).json({message: 'usernotfound'})
//     }
//     res.json({message: 'userfound',user})
// }
//create user controller
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const user = (0, userServices_1.CreateUser)(name, email);
    res.json(user); //implied return
});
exports.createUser = createUser;
// res.json({message:'hello form users'});
//get user controller
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, userServices_1.GetUser)(Number(id));
    if (!user) {
        return res.json('user not found');
    }
    return res.json(user);
});
exports.getUser = getUser;
//update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
        return res.json('name and email?');
    }
    const newUser = {
        id: Number(id),
        name: name,
        email: email
    };
    const updatedUser = yield (0, userServices_1.UpdateUser)(newUser);
    return res.json(updatedUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Call the DeleteUser service function and await the result
        const deletedUser = yield (0, userServices_1.DeleteUser)(Number(id));
        return res.json({
            message: 'User deleted successfully',
            deletedUser,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
// create company controller
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stockprice, symbol, name, exchange, datetime, open, high, low, close, volume, previous_close, change, average_volume } = req.body;
    const company = (0, userServices_1.CreateCompany)(stockprice, symbol, name, exchange, datetime, open, high, low, close, volume, previous_close, change, average_volume);
    res.json(company); //implied return
});
exports.createCompany = createCompany;
// get company
//get user controller
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, userServices_1.GetUser)(Number(id));
    if (!user) {
        return res.json('user not found');
    }
    return res.json(user);
});
exports.getCompany = getCompany;
//update
// UPDATE: Update an existing company
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const companyToUpdate = Object.assign(Object.assign({}, updatedData), { id: companyId });
    const updatedCompany = yield (0, userServices_1.UpdateCompany)(companyToUpdate);
    return res.json(updatedCompany);
});
exports.updateCompany = updateCompany;
