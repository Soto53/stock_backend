import express from 'express';
import { createCompany, getCompanies, updateCompany, deleteCompany } from '../controllers/companyControllers';


const router = express.Router();


router.post('/company', createCompany);
router.get('/companies', getCompanies);
router.put('/company/:id', updateCompany);
router.delete('/company/:id', deleteCompany);

export default router;

