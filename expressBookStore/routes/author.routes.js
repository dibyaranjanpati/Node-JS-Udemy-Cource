const express = require("express");
const authorsTable = require("../models/author.model");
const booksTable = require("../models/books.model");
const db = require("../db");
const { eq } = require("drizzle-orm");
const { error } = require("console");

const router = express.Router();

// to get the Authors
router.get("/", async (req, res) => {
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
});

// to get the Authors by id
router.get("/:id", async (req, res) => {
  const [authors] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, req.params.id));

  if (!authors) {
    return res
      .status(404)
      .json({ error: `authors id with ${req.params.id} does not Exists` });
  }

  return res.json(authors);
});

// to create the Authors

router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });

  return res.json({ message: "Author create Successfully", id: result.id });
});

// get all books bt author id

router.get("/:id/books", async (req, res) => {
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.autherId, req.params.id));

  return res.json(books);
});

module.exports = router;
