import express from "express";
import db from "../db/index.js";
import { userSessions, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.patch("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ errer: "you are not log in " });
  }
  const { name } = req.body;
  await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id));

  return res.json({ status: "success" });
});

router.get("/", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ errer: "you are not log in " });
  }

  return res.json({ user });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `user with the ${email} already existing!` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({ status: "success", data: { userid: user.id } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      salt: usersTable.salt,
      role: usersTable.role,
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser) {
    return res
      .status(400)
      .json({ error: `user with the ${email} does not exist!` });
  }

  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHash) {
    return res.status(400).json({ error: "incorrect Password" });
  }
  // for session base
  // const [session] = await db
  //   .insert(userSessions)
  //   .values({ userId: existingUser.id })
  //   .returning({ id: userSessions.id });

  // using jwt
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({ status: "success", token });
});

export default router;
