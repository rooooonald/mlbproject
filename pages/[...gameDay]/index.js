import { useEffect } from "react";
import Head from "next/head";
import useDisabled from "@/hooks/use-disabled";

import MatchNavigation from "@/components/ui/match-nav";
import Match from "@/components/match/match";

export default function MatchPage({ matches, queryDate }) {
  const {
    prevDisabled,
    nextDisabled,
    index: matchIndex,
    changeIndexHandler: changeMatchIndex,
    resetIndexHandler: resetMatchIndex,
  } = useDisabled(matches.dates[0]?.games);

  useEffect(() => {
    resetMatchIndex();
  }, [matches, resetMatchIndex]);

  if (!matches) {
    return <p>Loading</p>;
  }

  const date = new Date(
    `${queryDate.year}-${queryDate.month}-${queryDate.day}`
  );

  if (!matches.totalGames) {
    return (
      <MatchNavigation
        date={date}
        displayMode="error"
        errorMsg="NO MATCH"
        prevDisabled="true"
        nextDisabled="true"
      />
    );
  }

  const match = matches.dates[0].games[matchIndex];

  if (!match) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>
          {`${match.teams.home.team.name} vs ${match.teams.away.team.name}`}
        </title>
      </Head>
      <MatchNavigation
        date={date}
        displayMode={"match"}
        matchNum={matchIndex + 1}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
        onChangeMatch={(control) => changeMatchIndex(control)}
      />

      <Match match={match} />
    </>
  );
}

export async function getServerSideProps(context) {
  const [year, month, day] = context.params.gameDay;

  const res = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${year}-${month}-${day}&endDate=${year}-${month}-${day}`
  );

  const matchDayData = await res.json();
  const queryDate = { year, month, day };

  return {
    props: { matches: matchDayData, queryDate },
  };
}
