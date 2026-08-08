import dotenv from 'dotenv';
import app from './app.js';
import { connectToDataBase } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectToDataBase();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
