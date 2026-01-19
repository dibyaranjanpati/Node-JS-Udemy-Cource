import express from "express";
import { connectionMongoDB } from "./connection.js";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

connectionMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("monogoDB Connected"),
);
app.use(express.json());
app.use(authMiddleware);
app.use("/user", userRouter);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
