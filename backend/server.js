import express, { application } from "express";
import cors from "cors"; // ✅ Import cors
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentsRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "comment_section_project",
  })
  .then((data) => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("error while connecting to mongodb", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running on port 3001");
});
