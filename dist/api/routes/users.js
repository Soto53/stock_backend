"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
//create
router.post('/'), (req, res) => {
    (0, userController_1.createUser)(req, res);
};
//read
router.get(':id'), (req, res) => {
    (0, userController_1.getUser)(req, res);
};
//update       
router.put(':id'), (req, res) => {
    (0, userController_1.updateUser)(req, res);
};
//delete
router.delete(':id'), (req, res) => {
    (0, userController_1.deleteUser)(req, res);
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
exports.userRoutes = router;
