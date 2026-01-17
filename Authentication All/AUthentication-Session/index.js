import express from "express";
import userRoutes from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  return res.json({ status: "Server is Running" });
});
app.use("/user", userRoutes);
app.use("/admin", adminRouter);
app.listen(PORT, () => console.log(`app is running on ${PORT}`));
