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
    updateCategoryRequest: (state) => {
      state.isLoading = true;
    },
    updateCategorySuccess: (state, action) => {
      const { id, updatedCategory } = action.payload;

      const index = state.categories.findIndex(
        (category) => category._id === id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedCategory,
        };
      }

      state.isLoading = false;
    },
    updateCategoryFail: (state, action) => {
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
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  removeCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
