import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import profileRoutes from './routes/profileRoutes.js';

const app = express();

//? Middlewares
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? Routes
app.use('/api/profile', profileRoutes);

//? Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Developer portfolio API is running!' });
});

export default app;