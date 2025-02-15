import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.use("/api/products", productRoutes);

app.use(express.json()); // This will allows us to parse incomming data
app.use(cors());
app.use(helmet()); // Helmet is a security middlware that helps you Protect Your App by setting various HTTP Headers
app.use(morgan("dev"));

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database Initialized Successfully");
  } catch (error) {
    console.log("Error in initDB", error);
  }
}

app.get("/test", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello From Test Route");
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on Port:${PORT}`);
  });
});
