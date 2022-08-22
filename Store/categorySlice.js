import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: {
    id: 1,
    name: 2,
  },
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories: (state, { payload }) => {
      const parsedList = payload.map((category) => {
        return {
          id: category._id,
          name: category.name,
        };
      });
      return { isLoadind: false, data: parsedList };
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
