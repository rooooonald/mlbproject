import { useEffect, useState } from "react";

import AddComments from "./add-comments";
import CommentList from "./comment-list";
import Notification from "../ui/notification";

import styles from "./comments.module.css";

export default function Comments({ matchId }) {
  const [comments, setComments] = useState([]);
  const [sendStatus, setSendStatus] = useState();
  const [errorMsg, setErrMsg] = useState();

  useEffect(() => {
    fetch(`/api/comments/${matchId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [matchId, sendStatus]);

  async function sendDataHandler(commentBody) {
    const res = await fetch(`/api/comments/${matchId}`, {
      method: "POST",
      body: JSON.stringify(commentBody),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
  }

  async function submitDataHandler(commentBody) {
    setSendStatus("loading");
    try {
      await sendDataHandler(commentBody);
      setSendStatus("success");
    } catch (err) {
      setSendStatus("error");
      setErrMsg(err.message);
    }
  }

  useEffect(() => {
    if (sendStatus === "success" || sendStatus === "error") {
      const timer = setTimeout(() => {
        setSendStatus(null);
        setErrMsg(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [sendStatus]);

  let notification;

  if (sendStatus === "loading") {
    notification = {
      status: "loading",
      message: "POSTING ...",
    };
  }
  if (sendStatus === "success") {
    notification = {
      status: "success",
      message: "POSTED!",
    };
  }
  if (sendStatus === "error") {
    notification = {
      status: "error",
      message: errorMsg,
    };
  }

  return (
    <div className={styles.comments}>
      <CommentList comments={comments} />
      <AddComments submitData={submitDataHandler} />
      {notification && <Notification notification={notification} />}
    </div>
  );
}
