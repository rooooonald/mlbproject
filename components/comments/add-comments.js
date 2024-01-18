import { useState } from "react";

import styles from "./add-comments.module.css";

export default function AddComments({ submitData }) {
  const [name, setName] = useState();
  const [comment, setComment] = useState();

  async function submitHandler(event) {
    event.preventDefault();

    const publishedTime = new Date();
    const commentBody = { name, comment, publishedTime };

    submitData(commentBody);
    setName("");
    setComment("");
  }

  return (
    <>
      <div>
        <div className={styles["comment-group"]}>
          <label htmlFor="comments">LEAVE YOUR COMMENT</label>
          <textarea
            className={styles["comment-box"]}
            id="comments"
            name="comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.submit}>
          <label htmlFor="name">DISPLAY NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </>
  );
}
