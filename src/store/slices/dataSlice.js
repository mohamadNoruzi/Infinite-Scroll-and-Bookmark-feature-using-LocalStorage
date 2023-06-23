import { createSlice } from "@reduxjs/toolkit";

const dataSlices = createSlice({
  name: "data",
  initialState: {
    start: 0,
    ids: [],
    isBookm: false,
    isEvenChange: false,
    wasBookmark: Boolean(),
  },
  reducers: {
    changeStart(state, action) {
      state.start = action.payload;
    },
    changeIds(state, action) {
      if (!state.ids.includes(action.payload))
        state.ids = [...state.ids, action.payload];
    },
    deleteIds(state, action) {
      state.ids = state.ids.filter((obj) => {
        return obj !== action.payload;
      });
    },
    changeBookmark(state, action) {
      state.isBookm = !state.isBookm;
      state.isEvenChange = true;
    },
    changeWasBookmark(state, action) {
      
      
    },
  },
});

export const {
  changeStart,
  changeIds,
  deleteIds,
  changeBookmark,
  changeWasBookmark,
} = dataSlices.actions;
export const dataReducer = dataSlices.reducer;
