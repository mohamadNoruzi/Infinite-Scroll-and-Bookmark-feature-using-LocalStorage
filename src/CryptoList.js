import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStart } from "./store";
import Bookmark from "./Bookmark";
import useData from "./hooks/useData";
import Post from "./Post";
import Skeletons from "./components/Skeletons";

export default function CryptoList() {
  const { result, error, isError, isLoading, hasNextPage } = useData();
  const dispatch = useDispatch();

  const { start } = useSelector((state) => {
    return {
      start: state.data.start,
    };
  });

  const intersectionObserver = useRef();
  const lastDataRef = useCallback(
    (data) => {
      if (isLoading) return;

      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && hasNextPage)
          dispatch(changeStart(start + 10));
      });

      if (data) intersectionObserver.current.observe(data);
    },
    [hasNextPage, isLoading, dispatch, start]
  );

  if (isError) return <h1>Error: {error.message}</h1>;

  const content = result.map((data, index) => {
    if (result.length === index + 1)
      return <Post key={data.id} data={data} ref={lastDataRef} />;

    return <Post key={data.id} data={data} />;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col fixed">
        <Bookmark />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-40 bg-white shadow-md rounded-b-2xl mb-5 flex flex-row justify-center items-center">
          <h1 className="text-4xl font-sans">List of Cryptocurrencies</h1>
        </div>
        {content}
        {isLoading && <Skeletons times={10} />}
      </div>
    </div>
  );
}
