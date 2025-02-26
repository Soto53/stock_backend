import {Request, Response} from 'express'
import users from '../putjhere/users.json';
import {CreateUser, GetUser, UpdateUser, DeleteUser, CreateCompany, UpdateCompany} from '../services/userServices'

interface User{
    id:number;
    name:string;
    email:string;
}


interface UserList{
    users: User[];
}


export const getUsers = (req: Request, res: Response)=>{
    
    const userlist = users as UserList; 
    res.json(userlist); 
};

export const getFirstName = (req:Request, res:Response)=>{
    const userlist= users as UserList;
    const firstName = userlist.users.map(user=>({name: user.name}))
    res.json({users: firstName}); 
};

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
export const createUser = async (req:Request, res:Response)=>{
    const{name, email}= req.body;

    const user = CreateUser(name, email);

    res.json(user);   //implied return
}
// res.json({message:'hello form users'});


//get user controller
export const getUser = async (req:Request, res: Response)=>{
    const {id} = req.params;

    const user = await GetUser(Number(id));

    if(!user){
        return res.json('user not found');
    }

    return res.json(user);


 

}
//update
export const updateUser = async( req:Request, res:Response)=>{
    const {id}= req.params;
    const{name,email} = req.body;

    if(!name|| !email){
        return res.json('name and email?')
    }

    const newUser: {id: number, name: string, email: string} = {
        id: Number(id),
        name: name,
        email: email 
    } as User 
    

    

    const updatedUser = await UpdateUser(newUser);
    return res.json(updatedUser);

}

export const deleteUser = async(req:Request, res:Response)=>{
    const{id}= req.params;

    try {
        // Call the DeleteUser service function and await the result
        const deletedUser = await DeleteUser(Number(id));
    
        return res.json({
          message: 'User deleted successfully',
          deletedUser,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
      }

}


// create company controller
export const createCompany = async (req:Request, res:Response)=>{
   
    
    const{
        stockprice, 
        symbol, 
        name, 
        exchange,
        datetime,
        open,
        high,
        low,
        close,
        volume,
        previous_close,
        change,
        average_volume,
        figi_code,
    }= req.body;

    const company = CreateCompany(stockprice, 
        symbol, 
        name, 
        exchange,
        datetime,
        open,
        high,
        low,
        close,
        volume,
        previous_close,
        change,
        average_volume,
        figi_code,);

    res.json(company);   //implied return
}

// get company

//get user controller
export const getCompany = async (req:Request, res: Response)=>{
    const {id} = req.params;

    const user = await GetUser(Number(id));

    if(!user){
        return res.json('user not found');
    }

    return res.json(user);


 

}

//update
// UPDATE: Update an existing company
export const updateCompany = async (req: Request, res: Response): Promise<Response> => {
    const companyId = parseInt(req.params.id, 10);
    const updatedData = req.body;
   
    const companyToUpdate = { ...updatedData, id: companyId }; 
    const updatedCompany = await UpdateCompany(companyToUpdate);
    return res.json(updatedCompany);

};