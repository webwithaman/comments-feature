import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    replies: [
      {
        text: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
