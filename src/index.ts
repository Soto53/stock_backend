import express, {Request,Response} from 'express';
import router from './api/routes/index';
import {fetchDataFromAPI} from './api/services/userServices'


const app = express();
const PORT = process.env.PORT|| 3001;

app.use(express.json())
app.use('/api', router)
// app.get('/api', (req:Request, res: Response)=>{
//     const params= req.
//     res.json({message:'Hello from the API!'});
// });


// Route to trigger data fetch from the external API
app.get('/fetch-data', fetchDataFromAPI);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;