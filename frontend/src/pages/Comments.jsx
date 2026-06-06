import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserInfoFromJwtToken } from "../utils/auth";
import CommentForm from "../components/CommentForm.jsx";
import CommentList from "../components/CommentList.jsx";

const Comments = () => {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [activeReply, setActiveReply] = useState(null); // which comment's reply box is open
  const [replyValues, setReplyValues] = useState({}); // input values for each comment

  const fetchAllComments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`);
    console.log("fetched all comments", res.data);
    setAllComments(res.data.reverse());
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        },
      );

      setCommentText("");
      console.log("Added Comment :", res.data.addedComment);
      alert("Comment Added Successfully");
      fetchAllComments();
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        },
      );

      console.log("deleted comment :", res.data.comment);
      alert("Comment Deleted Successfully");
      fetchAllComments();
    } catch (err) {
      console.error("error", err.response.data);
      alert(err.response.data.message);
    }
  };

  const replySubmitHandler = async (e, id) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments/${id}/reply`,
        {
          text: replyValues[id],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        },
      );

      console.log("replied comment :", res.data.comment);
      alert("Reply Added Successfully");
      setReplyValues({ ...replyValues, [id]: "" });
      fetchAllComments();
    } catch (err) {
      console.error("error", err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <h5 className="card-title">{getUserInfoFromJwtToken().name}</h5>
      <h5 className="card-title">{getUserInfoFromJwtToken().email}</h5>

      <button className="btn btn-warning mt-2 mb-4">
        <Link className="text-light text-decoration-none" to="/dashboard">
          Dashboard
        </Link>
      </button>

      <CommentForm
        commentText={commentText}
        setCommentText={setCommentText}
        submitHandler={submitHandler}
      />

      <hr />

      <h2 className="mt-5 mb-2">Comments</h2>

      <CommentList
        comments={allComments}
        activeReply={activeReply}
        setActiveReply={setActiveReply}
        deleteHandler={deleteHandler}
        replyValues={replyValues}
        setReplyValues={setReplyValues}
        replySubmitHandler={replySubmitHandler}
      />
    </>
  );
};

export default Comments;
