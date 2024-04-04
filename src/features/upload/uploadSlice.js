import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadTheImage = createAsyncThunk(
  "upload/upload-img",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const deleteUploadTheImage = createAsyncThunk(
  "upload/delete-img",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const clearUploadState = createAction("Reset_Upload_State");

const imageInitialState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const uploadSlice = createSlice({
  name: "images",
  initialState: imageInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadTheImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadTheImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        state.isMessage = "success";
      })
      .addCase(uploadTheImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteUploadTheImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUploadTheImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (image) => image.public_id !== action.payload
        );
        state.isMessage = "success";
      })
      .addCase(deleteUploadTheImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(clearUploadState, () => imageInitialState);
  },
});

export default uploadSlice.reducer;
