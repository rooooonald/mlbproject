import CommentGrid from "./comment-grid";

export default function CommentList({ comments }) {
  if (!comments) {
    return <p>Loading ...</p>;
  }

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <CommentGrid
            key={comment.id}
            id={comment.id}
            name={comment.name}
            comment={comment.comment}
            publishedTime={comment.publishedTime}
          />
        );
      })}
    </ul>
  );
}
