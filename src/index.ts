import express from 'express';
import userRoutes from './api/routes/userRoutes';
import companyRoutes from './api/routes/companyRoutes';
import alpacaRoutes from './api/routes/alpacaRoutes';


const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', companyRoutes);
app.use('/api', alpacaRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});

export default app;