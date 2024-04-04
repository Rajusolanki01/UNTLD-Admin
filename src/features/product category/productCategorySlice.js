import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "./productCategoryService";

export const getAllCategories = createAsyncThunk(
  "category/get-all-categories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addTheCategory = createAsyncThunk(
  "category/add-category",
  async (userData, thunkAPI) => {
    try {
      return await categoryService.addCategory(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheCategoryTitle = createAsyncThunk(
  "category/update-Category",
  async ({ categoryId, title }, thunkAPI) => {
    try {
      await categoryService.updateCategory(categoryId, title);
      thunkAPI.dispatch(getAllCategories);
      return { categoryId, title };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTheCategory = createAsyncThunk(
  "category/delete-category",
  async (categoryId, thunkAPI) => {
    try {
      await categoryService.deleteCategory(categoryId);
      thunkAPI.dispatch(getAllCategories);
      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const categoryInitialState = {
  categories: [],
  addCategory: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addTheCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addCategory = action.payload;
        state.isMessage = "success";
      })
      .addCase(addTheCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheCategoryTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheCategoryTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { categoryId, title } = action.payload;
        state.categories = state.categories.map((category) =>
          category._id === categoryId ? { ...category, title: title } : category
        );
        state.isMessage = "success";
      })
      .addCase(updateTheCategoryTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
        state.isMessage = "success";
      })
      .addCase(deleteTheCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default categorySlice.reducer;
