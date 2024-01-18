import Image from "next/image";
import Link from "next/link";

import styles from "./logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Image
          src={"/images/logo.svg"}
          alt={"MLB Match Tracker"}
          width={75}
          height={40}
        />
      </Link>
    </div>
  );
}
