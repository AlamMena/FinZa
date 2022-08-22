import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: [
    {
      id: 1,
      name: "Food",
    },
    {
      id: 2,
      name: "Games",
    },
    {
      id: 3,
      name: "Gym",
    },
    {
      id: 4,
      name: "Restaurants",
    },
    {
      id: 5,
      name: "Shows",
    },
  ],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories: (state, { payload }) => {
      state.isLoading = false;
      state.data = [];
      // const parsedList = payload.map((category) => {
      //   return {
      //     id: category._id,
      //     name: category.name,
      //   };
      // });
    },
    addCategory: (state, { payload }) => {
      state.data = [{ ...payload }, ...state.data];
      state.isLoading = false;
    },
    updateCategory: (state, { payload }) => {
      const category = state.data.find((c) => c.id === payload.id);
      category.name = payload.name;
    },
    deleteCategory: (state, { payload }) => {
      state.data = state.data.filter((c) => c.id !== payload.id);
    },
  },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
