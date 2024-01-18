import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useDisabled from "@/hooks/use-disabled";
import FavoriteContext from "@/store/favorite-context";

import MatchNavigation from "@/components/ui/match-nav";
import Match from "@/components/match/match";

export default function FavMatchPage() {
  const router = useRouter();
  const matchId = router.query.matchId;

  const favoriteCtx = useContext(FavoriteContext);
  const currFavMatchIndex = favoriteCtx.favMatch.findIndex(
    (match) => match.gamePk === +matchId
  );
  const [selectedMatch, setSelectedMatch] = useState();

  const {
    prevDisabled,
    nextDisabled,
    index: favIndex,
    changeIndexHandler: changeFavIndexHandler,
  } = useDisabled(favoriteCtx.favMatch, currFavMatchIndex);

  useEffect(() => {
    if (currFavMatchIndex === -1) {
      router.push("/favorites");
    } else {
      setSelectedMatch(favoriteCtx.favMatch[favIndex]);
    }
  }, [favoriteCtx.favMatch, favIndex, currFavMatchIndex, router]);

  function changeMatchHandler(control) {
    changeFavIndexHandler(control);
    router.push(
      `/favorites/${favoriteCtx.favMatch[favIndex + control].gamePk}`
    );
  }

  if (!selectedMatch) {
    return;
  }

  return (
    <>
      <Head>
        <title>
          {`${selectedMatch.teams.home.team.name} vs ${selectedMatch.teams.away.team.name}`}
        </title>
      </Head>
      <MatchNavigation
        date={selectedMatch.gameDate}
        matchNum={favIndex + 1}
        displayMode="favorites"
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
        onChangeMatch={changeMatchHandler}
      />

      <Match match={selectedMatch} />
    </>
  );
}
