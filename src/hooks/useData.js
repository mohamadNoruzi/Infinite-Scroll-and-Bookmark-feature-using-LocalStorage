import { useEffect, useState } from "react";
import { getData } from "../apis/coinmarketcapApi";
import { useSelector } from "react-redux";

export default function useData() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { start } = useSelector((state) => {
    return { start: state.data.start };
  });

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getData(start, { signal })
      .then((response) => {
        setResult((prev) => [...prev, ...response.data]);
        setHasNextPage(Boolean(response.data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ "axios error:": e });
      });

    return () => controller.abort();
  }, [start]);

  

  return { result, error, isError, isLoading, hasNextPage };
}
