import { useContext } from "react";
import Head from "next/head";

import FavoriteContext from "@/store/favorite-context";

import FavMatchList from "@/components/favorites/match-list";

export default function FavoritePage() {
  const favoriteCtx = useContext(FavoriteContext);
  const favoriteMatches = favoriteCtx.favMatch;
  const sortedFavoriteMatches = favoriteMatches.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <Head>
        <title>Favorites | MLB Match Tracker</title>
      </Head>
      <FavMatchList favoriteMatches={sortedFavoriteMatches} />
    </>
  );
}
