const {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
} = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authers", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 55 }).notNull(),
  lastName: varchar({ length: 55 }),
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports = authorsTable;
// authers
