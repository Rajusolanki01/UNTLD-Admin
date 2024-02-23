import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorService } from "./colorService";

export const getAllColors = createAsyncThunk(
  "color/get-all-colors",
  async (_, thunkAPI) => {
    try {
      return await colorService.getcolor();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addTheColor = createAsyncThunk(
  "color/add-color",
  async (userData, thunkAPI) => {
    try {
      return await colorService.addcolor(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const deleteTheColor = createAsyncThunk(
  "color/delete-color",
  async (colorId, thunkAPI) => {
    try {
      await colorService.deletecolor(colorId);
      thunkAPI.dispatch(getAllColors);
      return colorId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const colorInitialState = {
  colors: [],
  addColor: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState: colorInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addTheColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addcolor = action.payload;
      })
      .addCase(addTheColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = state.colors.filter(
          (color) => color._id !== action.payload
        );
      })
      .addCase(deleteTheColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default colorSlice.reducer;
