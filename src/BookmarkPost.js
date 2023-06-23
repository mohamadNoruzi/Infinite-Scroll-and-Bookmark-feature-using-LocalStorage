import React from "react";
import { useDispatch } from "react-redux";
import { deleteIds, changeBookmark } from "./store";
import { BsTrash3 } from "react-icons/bs";

export default function BookmarkPost({ data }) {
  const dispatch = useDispatch();
  const content = (
    <>
      <article>
        <div className="w-[130px] h-[170px] flex flex-col justify-between p-6 mx-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.symbol}
          </p>
          <div
            className="flex justify-center px-3 py-2 my-1 cursor-pointer w-[40px] text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              dispatch(deleteIds(data.id));
              dispatch(changeBookmark());
            }}
          >
            <BsTrash3 />
          </div>
        </div>
      </article>
      <br />
    </>
  );

  return content;
}
