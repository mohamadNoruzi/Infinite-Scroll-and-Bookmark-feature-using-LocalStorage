import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIds, deleteIds, changeBookmark } from "./store";
import { BsStar, BsStarFill } from "react-icons/bs";

const Post = React.forwardRef(({ data }, ref) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const { ids } = useSelector((state) => {
    return { ids: state.data.ids };
  });
  const dispatch = useDispatch();
  const includeId = ids.includes(data.id);

  const handleClick = (item) => {
    dispatch(changeBookmark());
    setIsBookmark((prev) => !prev);
    if (!includeId) {
      dispatch(changeIds(item.id));
    }
    if (includeId) {
      dispatch(deleteIds(item.id));
    }
  };

  const body = (
    <>
      <div className="sm:w-[600px] w-52 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end">
          {includeId ? (
            <BsStarFill
              className="cursor-pointer text-xl"
              onClick={() => handleClick(data)}
            />
          ) : (
            <BsStar
              className="cursor-pointer text-xl"
              onClick={() => handleClick(data)}
            />
          )}
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h3>

        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {data.symbol}
        </p>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Rank: {data.rank}
        </p>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          ${data.price_usd}
        </p>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Change in 24h: %{data.percent_change_24h}
        </p>
      </div>
      <br />
    </>
  );

  const content = ref ? (
    <article ref={ref}>{body}</article>
  ) : (
    <article>{body}</article>
  );

  return content;
});

export default Post;
