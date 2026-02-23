import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  console.log(`System Status: SECURE / MVC ARCHITECTURE ENABLED`);
});
