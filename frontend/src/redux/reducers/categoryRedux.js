import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    addCategoryRequest: (state) => {
      state.isLoading = true;
    },
    addCategorySuccess: (state, action) => {
      state.categories.push(action.payload);
      state.isLoading = false;
    },
    addCategoryFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getCategoriesRequest: (state) => {
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    getCategoriesFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload
      );
    },
  },
});

export const {
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  removeCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
