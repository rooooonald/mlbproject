import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/lib/date-formatter";

import styles from "./match-box.module.css";

export default function MatchBox({ homeTeam, awayTeam, date, matchId }) {
  const formattedDate = formatDate(date);

  return (
    <Link href={`/favorites/${matchId}`} className={styles.match}>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.scoreboard}>
        <div className={styles.logo}>
          <Image
            src={`/images/team_logo/${homeTeam.id}.svg`}
            alt={homeTeam.name}
            width={0}
            height={0}
            fill={true}
          />
        </div>
        <div className={styles.score}>
          {homeTeam.score || homeTeam.score === 0 ? homeTeam.score : "?"} -{" "}
          {awayTeam.score || awayTeam.score === 0 ? awayTeam.score : "?"}
        </div>
        <div className={styles.logo}>
          <Image
            src={`/images/team_logo/${awayTeam.id}.svg`}
            alt={awayTeam.name}
            width={0}
            height={0}
            fill={true}
          />
        </div>
      </div>
    </Link>
  );
}
