import React, { useState } from "react";
import useChangeLocalStorage from "./hooks/useChangeLocalStorage";
import { useDispatch } from "react-redux";
import { changeBookmark } from "./store";
import useEachData from "./hooks/useEachData";
import BookmarkPost from "./BookmarkPost";
import { CircularProgress } from "@mui/material";
import { BsFillBookmarkStarFill, BsFillBookmarkXFill } from "react-icons/bs";

export default function Bookmark() {
  const dispatch = useDispatch();
  const { ids } = useChangeLocalStorage();
  const { result, isLoading, isError, error } = useEachData();
  const [isOpen, setIsOpen] = useState(false);

  console.log(ids)

  let classes = isOpen
    ? "hamOn flex flex-col items-center absolute shadow-sm top-0 h-screen bg-gray-200 z-10"
    : "hamOff flex flex-col items-center absolute shadow-sm top-0 h-screen";

  if (isError) return <h1>Error: {error.message}</h1>;

  const content = result
    ? result?.map((data) => {
        return <BookmarkPost key={data.id} data={data} />;
      })
    : null;

  return (
    <>
      <div
        className="w-28 h-10 py-2 px-1 my-4 fixed top-[10px] left-[10px] bg-blue-300 border-blue-400 hover:bg-blue-500 rounded-xl text-center cursor-pointer"
        onClick={() => {
          dispatch(changeBookmark());
          setIsOpen(true);
        }}
      >
        <h1 className="">
          Bookmarks
          <BsFillBookmarkStarFill />
        </h1>
      </div>
      <div className={classes}>
        <div
          className="py-1 px-1 my-4 bg-blue-300 border-blue-400 hover:bg-blue-500 rounded-xl text-center cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <BsFillBookmarkXFill className="text-2xl" />
        </div>
        <div className="">{content}</div>
        {isLoading && (
          <div className="my-6">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
}
