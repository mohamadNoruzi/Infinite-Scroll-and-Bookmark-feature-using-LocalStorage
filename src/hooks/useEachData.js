import { useEffect, useState } from "react";
import { getEachData } from "../apis/coinmarketcapApi";
import { useSelector } from "react-redux";

export default function useEachData() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ids, isBookm } = useSelector((state) => {
    return {
      ids: state.data.ids,
      isBookm: state.data.isBookm,
    };
  });

  useEffect(() => {
    if (ids.length !== 0) {
      setIsLoading(true);
    }
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getEachData(ids, { signal })
      .then((response) => {
        setResult(response);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ "axios get bookmark data: ": e });
      });

    return () => controller.abort();
  }, [isBookm, ids]);

  return { result, isLoading, isError, error };
}
