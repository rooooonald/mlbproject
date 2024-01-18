import Image from "next/image";

import styles from "./team.module.css";

export default function Team({ homeAway, name, record, logoId }) {
  const logoPath = `/images/team_logo/${logoId}.svg`;

  return (
    <div className={styles.team}>
      <div className={styles["home-away"]}>{homeAway}</div>
      <div className={styles["team-info"]}>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          {record.wins} - {record.losses}
        </div>
      </div>
      <div className={styles.logo}>
        <Image src={logoPath} alt={name} width={0} height={0} />
      </div>
    </div>
  );
}
