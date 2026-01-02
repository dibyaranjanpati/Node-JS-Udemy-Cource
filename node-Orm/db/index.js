const { drizzle } = require("drizzle-orm/node-postgres");

// postgres://<user>:<passward>@<host>:<port00>/<dbname>
const db = drizzle("postgres://postgres:12527:localhost:5432/myDB");

module.exports = db;
