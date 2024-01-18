import { formatDate } from "@/lib/date-formatter";

import styles from "./match-nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function MatchNavigation({
  prevDisabled,
  nextDisabled,
  matchNum,
  date,
  errorMsg,
  displayMode,
  onChangeMatch,
}) {
  function clickHandler(control) {
    onChangeMatch(control);
  }

  const formattedDate = formatDate(date);

  return (
    <nav className={styles.nav}>
      <button
        className={styles["nav-button"]}
        onClick={() => clickHandler(-1)}
        style={{
          visibility: prevDisabled ? "hidden" : "visible",
        }}
      >
        <FontAwesomeIcon icon={faLeftLong} />
      </button>
      <div className={styles.date}>
        <h2>{formattedDate}</h2>
      </div>
      <div className={styles["match-number"]}>
        {displayMode === "match" && (
          <h2>MATCH #{matchNum < 10 ? "0" + matchNum : matchNum}</h2>
        )}
        {displayMode === "favorites" && (
          <h2>FAV #{matchNum < 10 ? "0" + matchNum : matchNum}</h2>
        )}
        {displayMode === "error" && <h2>{errorMsg}</h2>}
      </div>
      <button
        className={styles["nav-button"]}
        onClick={() => clickHandler(1)}
        style={{
          visibility: nextDisabled ? "hidden" : "visible",
        }}
      >
        <FontAwesomeIcon icon={faRightLong} />
      </button>
    </nav>
  );
}
