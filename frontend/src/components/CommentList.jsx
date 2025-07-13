import ReplyForm from "./ReplyForm";

const CommentList = ({
  comments,
  activeReply,
  setActiveReply,
  deleteHandler,
  replyValues,
  setReplyValues,
  replySubmitHandler,
}) => {
  return (
    <ul className="list-group">
      {comments.map((comment) => {
        return (
          <div className="list-group-item mb-4 border-1" key={comment._id}>
            <CommentItem
              comment={comment}
              activeReply={activeReply}
              setActiveReply={setActiveReply}
              deleteHandler={deleteHandler}
            />

            {activeReply == comment._id && (
              <ReplyForm
                comment={comment}
                replyValues={replyValues}
                setReplyValues={setReplyValues}
                replySubmitHandler={replySubmitHandler}
              />
            )}

            {comment.replies && comment.replies.length > 0 && (
              <CommentList
                comments={comment.replies}
                activeReply={activeReply}
                setActiveReply={setActiveReply}
                deleteHandler={deleteHandler}
                replyValues={replyValues}
                setReplyValues={setReplyValues}
                replySubmitHandler={replySubmitHandler}
              />
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default CommentList;

const CommentItem = ({
  comment,
  activeReply,
  setActiveReply,
  deleteHandler,
}) => {
  return (
    <>
      <li
        className=" d-flex align-items-center justify-content-between my-2"
        aria-current="true"
      >
        <div>
          <h5 className="username">{comment.name}</h5>
          <p>{comment.text}</p>
        </div>
        <div>
          <button
            className="btn btn-info me-3"
            onClick={() => {
              setActiveReply((prev) =>
                prev === comment._id ? null : comment._id
              );
            }}
          >
            {activeReply === comment._id ? "Cancel" : "Reply"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteHandler(comment._id);
            }}
          >
            delete
          </button>
        </div>
      </li>
    </>
  );
};
