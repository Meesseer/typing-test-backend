import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/AuthRoutes.js';
import SessionRoutes from './routes/SessionRoutes.js';

dotenv.config()

const app = express()

app.use(cors({origin:'http://localhost:3000', credentials: true}))

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', AuthRoutes);
app.use('/api', SessionRoutes)

app.get('/', (req,res)=> 
    res.send('Server Running'))

app.use('/api', SessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5001, () => console.log(`Server running on port ${process.env.PORT || 5001}`));
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));
