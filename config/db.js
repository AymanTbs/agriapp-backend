const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "159357123",
  database: process.env.DB_NAME || "agriapp"
});

db.connect((err) => {
  if (err) {
    console.log("⚠️ Database connection failed:", err.message);
    console.log("Server will run but API will not function without database");
  } else {
    console.log("✅ MySQL Connected");
  }
});

module.exports = db;