import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogCategoryService } from "./blogCategoryService";

export const getAllBlogCategories = createAsyncThunk(
  "blogcategory/get-all-blog-category",
  async (_, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategoires();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addTheBlogCategory = createAsyncThunk(
  "blogcategory/add-blog",
  async (userData, thunkAPI) => {
    try {
      return await blogCategoryService.addTheBlogCategory(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheBlogCategoryTitle = createAsyncThunk(
  "blogcategory/update-blog-category",
  async ({ blogCategoryId, title }, thunkAPI) => {
    try {
      await blogCategoryService.updateBlogCategory(blogCategoryId, title);
      thunkAPI.dispatch(getAllBlogCategories);
      return { blogCategoryId, title };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTheBlogCategory = createAsyncThunk(
  "blogcategory/delete-blog",
  async (blogId, thunkAPI) => {
    try {
      await blogCategoryService.deleteTheBlogCategory(blogId);
      thunkAPI.dispatch(getAllBlogCategories);
      return blogId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const blogCategoryInitialState = {
  blogCategories: [],
  addBlogCategory: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const blogCategorySlice = createSlice({
  name: "blogcategory",
  initialState: blogCategoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addTheBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addBlogCategory = action.payload;
        state.isMessage = "success";
      })
      .addCase(addTheBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheBlogCategoryTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheBlogCategoryTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { blogCategoryId, title } = action.payload;
        state.blogCategories = state.blogCategories.map((blogcategory) =>
          blogcategory._id === blogCategoryId
            ? { ...blogcategory, title: title }
            : blogcategory
        );
        state.isMessage = "success";
      })
      .addCase(updateTheBlogCategoryTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = state.blogCategories.filter(
          (blogCategory) => blogCategory._id !== action.payload
        );
        state.isMessage = "success";
      })
      .addCase(deleteTheBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default blogCategorySlice.reducer;
