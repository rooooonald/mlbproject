import styles from "./notification.module.css";

export default function Notification({ notification }) {
  const { status, message } = notification;

  let notificationStyle;
  if (status === "loading") {
    notificationStyle = styles.loading;
  }

  if (status === "success") {
    notificationStyle = styles.success;
  }

  if (status === "error") {
    notificationStyle = styles.error;
  }

  return (
    <div className={styles.notification}>
      <div className={notificationStyle}>{message}</div>
    </div>
  );
}
