import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk(
  "blog/get-all-blogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addTheBlog = createAsyncThunk(
  "blog/add-blog",
  async (userData, thunkAPI) => {
    try {
      return await blogService.addBlog(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const deleteTheBlog = createAsyncThunk(
  "blog/delete-blog",
  async (blogId, thunkAPI) => {
    try {
      await blogService.deleteBlog(blogId);
      thunkAPI.dispatch(getAllBlogs);
      return blogId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const blogInitialState = {
  blogs: [],
  addBlog: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: blogInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addTheBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addBlog = action.payload;
        state.isMessage = "success";
      })
      .addCase(addTheBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.isMessage = "success";
      })
      .addCase(deleteTheBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default blogSlice.reducer;
