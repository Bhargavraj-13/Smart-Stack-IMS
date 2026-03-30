import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart-Stack-IMS API is running"
  });
});

app.use("/api/products", productRoutes);

export default app;