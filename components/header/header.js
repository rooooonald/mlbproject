import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import FavoriteContext from "@/store/favorite-context";

import Logo from "./logo";
import DateSelector from "../ui/date-selector";

import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const router = useRouter();

  const favoriteCtx = useContext(FavoriteContext);

  function daySelectHandler(date) {
    setShowMobileMenu(false);
    const { year, month, day } = date;
    router.push(`/${year}/${month}/${day}`);
  }

  function mouseOverHandler() {
    setIsMouseOver(true);
  }

  function mouseOutHandler() {
    setIsMouseOver(false);
  }

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles["control-panel"]}>
        <div className={styles["form-container"]}>
          <DateSelector onSubmit={daySelectHandler} />
        </div>
        <div className={styles["form-container-mobile"]}>
          <button onClick={() => setShowMobileMenu(true)}>Pick a Date</button>
          {showMobileMenu && (
            <DateSelector
              onSubmit={daySelectHandler}
              onCloseForm={() => setShowMobileMenu(false)}
            />
          )}
        </div>
        <Link
          href="/favorites"
          className={styles.fav}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        >
          <div className={styles.favNum}>{favoriteCtx.favNum}</div>
          <div className={styles.favBall}>
            <FontAwesomeIcon
              icon={faBaseball}
              size="xl"
              spin={isMouseOver ? true : false}
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
