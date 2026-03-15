import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS fix
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Test Route
app.get("/", (req, res) => {
  res.send("Blogsy Backend Running 🚀");
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});