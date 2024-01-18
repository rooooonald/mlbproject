import MatchBox from "./match-box";

import styles from "./match-list.module.css";

export default function FavMatchList({ favoriteMatches }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headline}>FAVORITES</h1>
      <div className={styles.menu}>
        {favoriteMatches.map((match) => {
          const homeTeam = {
            name: match.teams.home.team.name,
            score: match.teams.home.score,
            id: match.teams.home.team.id,
          };
          const awayTeam = {
            name: match.teams.away.team.name,
            score: match.teams.away.score,
            id: match.teams.away.team.id,
          };
          return (
            <MatchBox
              key={match.gamePk}
              matchId={match.gamePk}
              date={match.gameDate}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
            />
          );
        })}
      </div>
    </div>
  );
}
