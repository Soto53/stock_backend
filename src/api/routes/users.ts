import{Router,Request,Response} from 'express';
import {getUsers,getUser,getFirstName, createUser,updateUser, deleteUser} from '../controllers/userController';
import {getExternalData,fetchDataFromAPI} from '../externalApi/externalapi';
import {DataEater} from '../externalApi/DataConsumption';

const router = Router();
//create
router.post('/'),(req:Request, res:Response)=>{
    createUser(req,res);
}

//read
router.get(':id'),(req: Request, res: Response)=>{ 
    getUser(req,res);
};
 //update       
router.put(':id'), (req: Request, res: Response)=>{ 
    updateUser(req,res);
};

//delete
router.delete(':id'), (req: Request, res: Response)=>{ 
    deleteUser(req,res);
};  

 
// router.get('/all',(req: Request, res:Response)=>{
//     console.log("hit") 
//     getUsers(req,res);
//     // res.json({message: 'Get to work'})

// });

// router.get('/firstname', (req:Request, res:Response)=>{
//     getFirstName(req,res);
// });

// router.get('/fetch',(req:Request, res:Response)=>{ // changing the controller location
//     fetchDataFromAPI(req,res);
// });

// // router.get('/eatData',(req:Request, res:Response)=>{ // changing the controller location
// //     DataEater(req,res);
// // });

// router.get('/:id', (req: Request, res: Response) => {
//     getUser(req, res);  // Pass the request and response to the controller
// });

export const userRoutes = router;