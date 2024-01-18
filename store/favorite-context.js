import { createContext, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

const FavoriteContext = createContext({
  favMatch: [],
  favNum: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => {},
});

export function FavoriteContextProvider(props) {
  const [favMatch, setFavMatch] = useState([]);
  const [firstFetchIsDone, setFirstFetchIsDone] = useState(false);
  const [favChanged, setFavChanged] = useState(false);

  function addFavoriteHandler(matchData) {
    setFavMatch((prev) => {
      return [...prev, matchData];
    });
    setFavChanged(true);
  }

  function removeFavoriteHandler(matchId) {
    setFavMatch((prev) => {
      return prev.filter((match) => match.gamePk !== matchId);
    });
    setFavChanged(true);
  }

  function isFavoriteHandler(matchId) {
    return favMatch.some((match) => match.gamePk === matchId);
  }

  useEffect(() => {
    const fetchFavData = async () => {
      const res = await fetch(
        "https://mlb-project-26b3d-default-rtdb.firebaseio.com/fav.json"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch favourites");
      }
      const data = await res.json();

      const formattedData = [];
      for (const favMatch in data) {
        formattedData.push(data[favMatch]);
      }

      setFavMatch(formattedData);
      setFirstFetchIsDone(true);
    };

    fetchFavData().catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const sendFavData = async () => {
      const res = await fetch(
        "https://mlb-project-26b3d-default-rtdb.firebaseio.com/fav.json",
        { method: "PUT", body: JSON.stringify(favMatch) }
      );

      if (!res.ok) {
        throw new Error("Cannot save favourite!");
      }
    };

    if (!firstFetchIsDone) {
      return;
    }

    if (favChanged) {
      sendFavData().catch((err) => console.log(err.message));
    }
  }, [favMatch, firstFetchIsDone, favChanged]);

  const sortedFavMatches = favMatch.sort((a, b) => {
    const dateA = new Date(a.gameDate);
    const dateB = new Date(b.gameDate);
    return dateB - dateA;
  });

  const context = {
    favMatch: sortedFavMatches,
    favNum: favMatch.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isFavoriteHandler,
  };

  return (
    <FavoriteContext.Provider value={context}>
      {props.children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
