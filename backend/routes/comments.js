import express from "express";
import {
  addComment,
  getAllComments,
  deleteComment,
  addReply,
} from "../controllers/commentController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.post("/:id/reply", verifyToken, addReply);

export default router;
