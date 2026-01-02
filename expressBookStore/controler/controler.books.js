// const { BOOKS } = require("../models/books");
const booksTable = require("../models/books.model");
const authorsTable = require("../models/author.model");
const db = require("../db");
const { eq, ilike } = require("drizzle-orm");
const { sql } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search;
  // console.log({ search });
  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
      );

    res.json(books);
  }
  const books = await db.select().from(booksTable);
  res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.autherId, authorsTable.id))
    .limit(1);
  if (!book)
    res.status(404).json({ error: `books with id ${id} does not Exist` });
  return res.json(book);
};

exports.createBooks = async function (req, res) {
  const { title, autherId, description } = req.body;
  if (!title || title === "")
    return res.status(404).json({ error: "the title requird" });

  const [result] = await db
    .insert(booksTable)
    .values({ title, autherId, description })
    .returning({ id: booksTable.id });

  return res
    .status(201)
    .json({ message: "books craete succesfully ", id: result.id });
};

exports.deleteBooks = async function (req, res) {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: "Book deleted sucessfully" });
};
