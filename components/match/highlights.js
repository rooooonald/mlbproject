import { useState, useEffect } from "react";
import useDisabled from "@/hooks/use-disabled";
import Image from "next/image";

import HighlightPlayer from "../highlights/highlight-player";

import styles from "./highlights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faBackwardStep,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export default function Highlights({ highlights }) {
  const [showPlayer, setShowPlayer] = useState(false);

  const {
    prevDisabled,
    nextDisabled,
    index: highlightIndex,
    changeIndexHandler: changeHighlightIndex,
    resetIndexHandler: resetHighlightIndex,
  } = useDisabled(highlights?.items);

  useEffect(() => {
    resetHighlightIndex();
  }, [highlights, resetHighlightIndex]);

  function playHighlightHandler() {
    setShowPlayer(true);
  }

  function removeOverlayHandler() {
    setShowPlayer(false);
  }

  if (!highlights) {
    return;
  }

  if (!highlights.items[highlightIndex]) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <div className={styles.highlight}>
        <div className={styles["highlight-thumbnail"]}>
          <Image
            src={highlights.items[highlightIndex].image.cuts[4].src}
            alt={highlights.items[highlightIndex].headline}
            width={800}
            height={448}
          />
        </div>
        <p className={styles["highlight-headline"]}>
          {highlights.items[highlightIndex].headline}
        </p>
      </div>

      <div className={styles["highlight-control"]}>
        <button
          className={prevDisabled ? styles.disabled : undefined}
          onClick={() => changeHighlightIndex(-1)}
          disabled={prevDisabled}
        >
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button onClick={playHighlightHandler}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className={nextDisabled ? styles.disabled : undefined}
          onClick={() => changeHighlightIndex(1)}
          disabled={nextDisabled}
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
      {showPlayer && (
        <HighlightPlayer
          url={highlights.items[highlightIndex].playbacks[0].url}
          headline={highlights.items[highlightIndex].headline}
          onReturn={removeOverlayHandler}
        />
      )}
    </>
  );
}
