"use strict";
// import {Prisma, PrismaClient} from '@prisma/client'
// import {User} from ''
// import {Request, Response} from 'express'
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
exports.fetchDataFromAPI = exports.getApiData = exports.UpdateCompany = exports.CreateCompany = exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.CreateUser = void 0;
exports.DataEater = DataEater;
// const dbFilePath = path.join
// const prisma = new PrismaClient();
// export async funtion getUsers(): Promis<User[]>{
//     const users = await prisma.user.findMany();
//     return users as User[];                                //make sure the types match up as in the db
// }
// expoer async function addUser(user: User){
//     const userCheck = await prisma.user.findUnique({
//         where:{
//             id : user.id
//         }
//     })
//     const newUser = await prisma.user.create({
//         dadta:user
//     })
// }
// crud Create Read Update Delete
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
////////////////////////////////////////////////////////////////////for users
//create
const CreateUser = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield prisma.user.create({
        data: {
            name: name,
            email: email,
        }
    });
    //   users.push(newUser);
    return (newUser);
});
exports.CreateUser = CreateUser;
// read
const GetUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!user) {
        console.log("the user dosnt exist 500");
        return null;
    }
    return user;
});
exports.GetUser = GetUser;
//update
const UpdateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.update({
        where: { id: user.id },
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
    return;
});
exports.UpdateUser = UpdateUser;
// delete
const DeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const deleteUser = 
    yield prisma.user.delete({
        where: { id: id },
    });
    return;
});
exports.DeleteUser = DeleteUser;
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////for companys
const CreateCompany = (stockprice, symbol, name, exchange, datetime, open, high, low, close, volume, previous_close, change, average_volume, figi_code) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedDatetime = new Date(datetime);
    const newCompany = yield prisma.company.create({
        data: {
            stockprice: stockprice,
            symbol: symbol,
            name: name,
            exchange: exchange,
            datetime: formattedDatetime,
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
            previous_close: previous_close,
            change: change,
            average_volume: average_volume,
            figi_code: figi_code,
        }
    });
    return (newCompany);
});
exports.CreateCompany = CreateCompany;
// read
// export const GetCompany = async (id:number):Promise<Company | null> => {
//     const company = await prisma.company.findUnique({
//         where:{
//             id: id,
//         },
//     })
//     if(!company){
//         console.log("the company dosnt exist 500");
//         return null;
//     }
//     return company;
// }
// update
const UpdateCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCompany = yield prisma.company.update({
        where: { id: company.id },
        data: {
            stockprice: company.stockprice,
            symbol: company.symbol,
            name: company.name,
            exchange: company.exchange,
            datetime: company.datetime,
            open: company.open,
            high: company.high,
            low: company.low,
            close: company.close,
            volume: company.volume,
            previous_close: company.previous_close,
            change: company.change,
            average_volume: company.average_volume
        }
    });
    return updatedCompany;
});
exports.UpdateCompany = UpdateCompany;
/////////////////////////////////////////////////////////////////////////////////////////////////
const getApiData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("you made it here");
    const Apires = yield axios_1.default.get('https://api.twelvedata.com/ad?apikey=459e4dfc97e6485997ef59ff4f51c2d9&interval=1min&symbol=AAPL');
    // const externalData = Apires.data;
    console.log('almost there');
    return Apires.data;
});
exports.getApiData = getApiData;
// export async function DataEater() {
//       const externalData = await getApiData();
//       const {  
//         id,
//         stockprice, 
//         symbol, 
//         name, 
//         exchange,
//         datetime,
//         open,
//         high,
//         low,
//         close,
//         volume,
//         previous_close,
//         change,
//         average_volume}: Company = externalData.data;
//       console.log("data",externalData.data);
// return externalData.data;
//         // Use Prisma's upsert method to insert or update data
//         const company = await prisma.company.upsert({
//             where: { symbol }, // Using 'symbol' as a unique key
//             update: {
//                 stockprice, 
//                 name, 
//                 exchange, 
//                 datetime: new Date(datetime), // Ensure datetime is converted to Date type
//                 open, 
//                 high, 
//                 low, 
//                 close, 
//                 volume, 
//                 previous_close, 
//                 change, 
//                 average_volume 
//             },
//             create: {
//                 stockprice, 
//                 symbol, 
//                 name, 
//                 exchange, 
//                 datetime: new Date(datetime), // Ensure datetime is converted to Date type
//                 open, 
//                 high, 
//                 low, 
//                 close, 
//                 volume, 
//                 previous_close, 
//                 change, 
//                 average_volume
//             }
//         });
//    return company;
// }
function DataEater() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the external data
        const externalData = yield (0, exports.getApiData)();
        // Extract the meta and values from the response
        const { meta, values } = externalData;
        // Extract the metadata
        const { symbol, exchange, name, figi_code } = meta;
        // Loop through each value and upsert the data into the database
        const companies = yield Promise.all(values.map((newData) => __awaiter(this, void 0, void 0, function* () {
            const { datetime, open, high, low, close, volume } = newData;
            // Use Prisma's upsert method to insert or update data
            const company = yield prisma.company.upsert({
                where: { symbol },
                update: {
                    stockprice: close, // Assuming the 'close' is the latest price
                    name,
                    exchange,
                    datetime: new Date(datetime), // Ensure datetime is in the correct format
                    open,
                    high,
                    low,
                    close,
                    volume,
                    figi_code,
                },
                create: {
                    symbol,
                    stockprice: close,
                    name,
                    exchange,
                    datetime: new Date(datetime),
                    open,
                    high,
                    low,
                    close,
                    volume,
                    figi_code,
                },
            });
            return company;
        })));
        // Optionally log or return the updated companies
        console.log(companies);
        return companies;
    });
}
const fetchDataFromAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const externalData = yield DataEater();
        res.json({ externalData });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching external data' });
    }
});
exports.fetchDataFromAPI = fetchDataFromAPI;
