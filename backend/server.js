import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./route/userRoutes.js";
import productRoutes from "./route/productRoutes.js";
import categoryRoutes from "./route/cateGoryRoutes.js";
import orderRoutes from "./route/orderRoutes.js";
import cors from "cors";

// Connect to DB
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`SERVER runnning in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
