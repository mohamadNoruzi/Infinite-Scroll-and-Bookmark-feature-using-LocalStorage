import { configureStore } from "@reduxjs/toolkit";
import { dataReducer, changeStart, changeIds, deleteIds, changeBookmark,changeWasBookmark } from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export { store, changeStart, changeIds, deleteIds, changeBookmark,changeWasBookmark };
