import { useContext } from "react";

import FavoriteContext from "@/store/favorite-context";

import styles from "./scoreboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";

export default function Scoreboard({ homeScore, awayScore, matchData }) {
  const favoriteCtx = useContext(FavoriteContext);

  const isFav = favoriteCtx.isFavorite(matchData.gamePk);

  function clickHandler() {
    if (isFav) {
      favoriteCtx.removeFavorite(matchData.gamePk);
    } else {
      favoriteCtx.addFavorite({
        gamePk: matchData.gamePk,
        gameDate: matchData.gameDate,
        teams: matchData.teams,
        venue: matchData.venue,
      });
    }
  }

  return (
    <div className={styles.scoreboard}>
      <div className={styles.score}>
        <p>{homeScore || homeScore === 0 ? homeScore : "?"}</p>
      </div>

      <div
        onClick={clickHandler}
        className={styles.fav}
        style={{ color: isFav ? "rgb(255, 215, 0)" : "white" }}
      >
        <FontAwesomeIcon icon={faBaseball} size="xl" spin={true} />
        <p>{isFav ? "UNFAVOURITE" : "ADD TO FAV!"}</p>
      </div>

      <div className={styles.score}>
        <p>{awayScore || awayScore === 0 ? awayScore : "?"}</p>
      </div>
    </div>
  );
}
