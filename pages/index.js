import Image from "next/image";

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["title-image"]}>
        <div className={styles["ball-container"]}>
          <div className={styles.ball}></div>
        </div>
        <Image
          src={"/images/title.svg"}
          alt="MLB Match Tracker"
          width={0}
          height={0}
          priority
        />
      </div>
      <h1>MLB MATCH TRACKER</h1>
    </div>
  );
}
