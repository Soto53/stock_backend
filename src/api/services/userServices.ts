// import {Prisma, PrismaClient} from '@prisma/client'
// import {User} from ''
// import {Request, Response} from 'express'

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

import {Prisma, PrismaClient} from '@prisma/client'
import {User, Company, CompanyData} from '../types/types'
import {Request, Response} from 'express'
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { captureRejectionSymbol } from 'stream';

const prisma = new PrismaClient();
////////////////////////////////////////////////////////////////////for users
//create
export const CreateUser = async(name:string, email:string)=>{
   
    const newUser = await prisma.user.create({
        data:{
            name: name,
            email: email,
        
        }
    });
    
    //   users.push(newUser);
      return (newUser);

};

// read

export const GetUser = async (id:number):Promise<User | null> => {
   
    const user = await prisma.user.findUnique({
        where:{
            id: id,
        },
    })

    if(!user){
        console.log("the user dosnt exist 500");
        return null;
    }
    return user;
}

//update

export const UpdateUser = async (user: User)=>{


    await prisma.user.update({
        where: { id: user.id},
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
         });
         return 
}

// delete

export const DeleteUser = async (id:number)=>{

   

    // const deleteUser = 
    await prisma.user.delete({
        where:{ id:id},
    })

    return ;
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////for companys





export const CreateCompany = async(

        stockprice: number, 
        symbol: string, 
        name: string, 
        exchange:string,
        datetime: string,
        open: number,
        high: number,
        low: number,
        close:number,
        volume:number,
        previous_close:number,
        change:number,
        average_volume:number,
        figi_code:string,

    )=>{
   
    const formattedDatetime = new Date(datetime);
    
    const newCompany = await prisma.company.create({
        data:{
            
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
};

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
export const UpdateCompany = async (company: Company)=>{


    const updatedCompany = await prisma.company.update({
        where: { id: company.id},
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
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getApiData = async  () => {

    console.log("you made it here");
    const Apires = await axios.get('https://api.twelvedata.com/ad?apikey=459e4dfc97e6485997ef59ff4f51c2d9&interval=1min&symbol=AAPL');
    // const externalData = Apires.data;
    console.log('almost there');

    return Apires.data;
    
}

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


export async function DataEater() {
    // Get the external data
    const externalData = await getApiData();
  
    // Extract the meta and values from the response
    const { meta, values } = externalData;
  
    // Extract the metadata
    const { symbol, exchange, name, figi_code } = meta;
  
    // Loop through each value and upsert the data into the database
    const companies = await Promise.all(
      values.map(async (newData: CompanyData) => {
        const { datetime, open, high, low, close, volume }:CompanyData = newData;
  
        // Use Prisma's upsert method to insert or update data
        const company = await prisma.company.upsert({
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
            symbol ,
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
      })
    );
  
    // Optionally log or return the updated companies
    console.log(companies);
  
    return companies;
  }
  

export const fetchDataFromAPI = async (req: Request, res: Response) => {
    try {
        const externalData = await DataEater(); 
        res.json({externalData});  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching external data' });
    }
};

  
