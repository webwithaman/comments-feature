const CommentForm = ({ commentText, setCommentText, submitHandler }) => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="inputText" className="form-label">
            Add Comment
          </label>
          <input
            type="text"
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
            name="text"
            value={commentText}
            className="form-control"
            id="inputText"
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Comment
        </button>
      </form>
    </>
  );
};

export default CommentForm;
