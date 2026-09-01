import 'dotenv/config';
import app from "./app.js";
import { connectToDataBase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDataBase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
