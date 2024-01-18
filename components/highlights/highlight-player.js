import { useEffect, useState, useRef } from "react";

import ReactPlayer from "react-player/lazy";

import styles from "./highlight-player.module.css";

export default function HighlightPlayer({ onReturn, headline, url }) {
  const [domLoaded, setDomLoaded] = useState(false);

  const playerRef = useRef();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div className={styles.wrapper} onClick={onReturn}>
          <div
            className={styles["highlight-video"]}
            onClick={(e) => e.stopPropagation()}
          >
            <ReactPlayer
              ref={playerRef}
              className={styles.player}
              url={url}
              controls={true}
              width="1280"
              height="720"
              onEnded={onReturn}
            />
          </div>

          <h1 className={styles.headline}>{headline}</h1>
        </div>
      )}
    </>
  );
}
