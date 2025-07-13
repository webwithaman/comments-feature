import Comment from "../models/Comment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

export const addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const newComment = await Comment.create({
      text,
      userId: req.user.id,
      name: req.user.name,
    });

    return res.status(201).json({
      message: "Comment added successfully",
      addedComment: newComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add comment", error: err });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Optional: check if logged-in user is owner
    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can delete only your own comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete comment", error: err });
  }
};

export const addReply = async (req, res) => {
  const commentId = req.params.id;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Reply text is required" });
  }

  try {
    const parentComment = await Comment.findById(commentId);

    if (!parentComment)
      return res.status(404).json({ message: "Parent comment not found" });

    const newReply = {
      text,
      userId: req.user.id,
      name: req.user.name,
      createdAt: new Date(),
    };

    parentComment.replies.unshift(newReply);
    await parentComment.save();

    return res
      .status(201)
      .json({ message: "Reply added", addedReply: newReply });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add reply", error: err });
  }
};
