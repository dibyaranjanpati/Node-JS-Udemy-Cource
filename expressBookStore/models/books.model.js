const {
  integer,
  index,
  pgTable,
  varchar,
  uuid,
  text,
} = require("drizzle-orm/pg-core");

const { sql } = require("drizzle-orm");

const authorsTable = require("./author.model");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    autherId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index("title_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),
  })
);

module.exports = booksTable;
