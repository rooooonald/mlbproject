import styles from "./comment-grid.module.css";

export default function CommentGrid({ id, name, comment, publishedTime }) {
  const formattedTime = new Date(publishedTime).toLocaleString("en-US");

  return (
    <li>
      <div className={styles["comment-box"]}>
        <div className={styles.name}>{name}</div>
        <div className={styles.comment}>{comment}</div>
        <div className={styles["publish-time"]}>{formattedTime}</div>
      </div>
    </li>
  );
}
