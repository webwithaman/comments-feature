const ReplyForm = ({
  comment,
  replyValues,
  setReplyValues,
  replySubmitHandler,
}) => {
  return (
    <>
      <form className="mb-3"
        onSubmit={(e) => {
          replySubmitHandler(e, comment._id);
        }}
      >
        <div className="mb-3">
          <label htmlFor="inputText" className="form-label">
            Add Comment
          </label>
          <input
            type="text"
            onChange={(e) => {
              setReplyValues((prev) => ({
                ...prev,
                [comment._id]: e.target.value,
              }));
            }}
            name="text"
            value={replyValues[comment._id] || ""}
            className="form-control"
            id="inputText"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-dark text-light">
          reply
        </button>
      </form>
    </>
  );
};

export default ReplyForm;
