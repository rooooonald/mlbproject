import { useCallback, useEffect, useState } from "react";

export default function useDisabled(array, favIndex = 0) {
  const [index, setIndex] = useState(favIndex);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    index < 1 ? setPrevDisabled(true) : setPrevDisabled(false);
    index >= array?.length - 1 ? setNextDisabled(true) : setNextDisabled(false);
  }, [index, array]);

  const changeIndexHandler = useCallback((control) => {
    setIndex((prev) => prev + control);
  }, []);

  const resetIndexHandler = useCallback(() => {
    setIndex(0);
  }, []);

  return {
    prevDisabled,
    nextDisabled,
    index,
    changeIndexHandler,
    resetIndexHandler,
  };
}
