import { useState, useEffect } from "react";

import Team from "./team";
import Scoreboard from "./scoreboard";
import Highlights from "./highlights";
import Comments from "../comments/comments";

import styles from "./match.module.css";

export default function Match({ match }) {
  const { home: homeTeam, away: awayTeam } = match.teams;
  const venue = match.venue.name;
  const matchId = match.gamePk;

  const [highlights, setHighlights] = useState();
  const [display, setDisplay] = useState("info");

  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/game/${matchId}/content`)
      .then((res) => res.json())
      .then((data) => {
        setHighlights(data.highlights.highlights);
      });
    setDisplay("info");
  }, [matchId]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.menu}>
        <button
          className={
            display === "info" ? styles["btn-active"] : styles["btn-inactive"]
          }
          onClick={() => setDisplay("info")}
        >
          MATCH INFO
        </button>
        <button
          className={
            display === "comments"
              ? styles["btn-active"]
              : styles["btn-inactive"]
          }
          onClick={() => setDisplay("comments")}
        >
          COMMENTS
        </button>
      </nav>
      {display === "info" && (
        <div className={styles.match}>
          <div className={styles["home-team"]}>
            <Team
              homeAway="HOME"
              name={homeTeam.team.name}
              record={homeTeam.leagueRecord}
              logoId={homeTeam.team.id}
            />
          </div>

          <div className={styles.venue}>{venue}</div>
          <div className={styles.scoreboard}>
            <Scoreboard
              homeScore={homeTeam.score}
              awayScore={awayTeam.score}
              matchData={match}
            />
          </div>
          {highlights && (
            <div className={styles.highlights}>
              <h2 className={styles.highlight}>HIGHLIGHT</h2>
              <Highlights highlights={highlights} matchId={matchId} />
            </div>
          )}

          <div className={styles["away-team"]}>
            <Team
              homeAway="AWAY"
              name={awayTeam.team.name}
              record={awayTeam.leagueRecord}
              logoId={awayTeam.team.id}
            />
          </div>
        </div>
      )}
      {display === "comments" && <Comments matchId={matchId} />}
    </div>
  );
}
