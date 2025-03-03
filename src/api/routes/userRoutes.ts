import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userControllers';

const router = express.Router();

router.post('/user', createUser);
router.get('/users', getUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


  



export default router;