const { drizzle } = require("drizzle-orm/node-postgres");

// postgres://<user>:<passward>@<host>:<port00>/<dbname>
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
