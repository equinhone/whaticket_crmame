import { Console } from "console";
import "../bootstrap";

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin"
  },
  dialect: process.env.DB_DIALECT || "mysql",
  
  dialectOptions: { 
    useUTC: false,
    timezone: process.env.DB_TIMEZONE // for reading the data
  },
  timezone: process.env.DB_TIMEZONE, // for writing the data

  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging:  process.env.DB_DEBUG === "true"
};

