import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  return res.json({ status: "Server is Running" });
});

app.listen(PORT, () => console.log(`app is running on ${PORT}`));
