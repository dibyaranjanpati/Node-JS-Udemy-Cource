import express from "express";

const app = express();
const PORT = 8000;

// middleware
app.use(express.json());

const DIARY = {};
const EMAILS = new Set();
// here is my card plase park it and given me back a tocken
// email is the unique car
app.post("/signup", (req, res) => {
  const { name, email, passward } = req.body;
  if (EMAILS.has(email)) {
    return res.status(400).json({ error: "Email already taken" });
  }
  //   create a token for user
  const token = `${Date.now()}`;
  // Do a entry on Diary
  DIARY[token] = { name, email, passward };
  EMAILS.add(email);

  // return a token
  return res.json({ status: "success", token });
});

app.post("/me", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "missing Token" });
  }

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invelid Token" });
  }

  const entry = DIARY[token];
  return res.json({ data: entry });
});

app.post("/privet-data", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "missing Token" });
  }

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invelid Token" });
  }

  const entry = DIARY[token];
  return res.json({ data: { privetdata: "Access granted" } });
});

app.listen(PORT, () => console.log(`server started at PORT no ${PORT}`));
