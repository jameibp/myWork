import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("No .env found");
}

export default {
  port: parseInt(process.env.PORT || "4000", 10),
  logs: {
    morgan: process.env.MORGAN || "dev",
  },
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1/my_database",
};
