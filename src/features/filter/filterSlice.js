import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  location: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    clearFilters(state) {
      state.query = "";
      state.location = "";
    },
  },
});

export const { setQuery, setLocation, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
