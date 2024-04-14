import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorService } from "./colorService";

export const getAllColors = createAsyncThunk(
  "color/get-all-colors",
  async (_, thunkAPI) => {
    try {
      return await colorService.getColor();
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
      return await colorService.addColor(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheColor = createAsyncThunk(
  "color/update-color",
  async ({ colorId, updateColor }, thunkAPI) => {
    try {
      await colorService.updateColor(colorId, updateColor);
      thunkAPI.dispatch(getAllColors);
      return { colorId, updateColor };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTheColor = createAsyncThunk(
  "color/delete-color",
  async (colorId, thunkAPI) => {
    try {
      await colorService.deleteColor(colorId);
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
        state.isMessage = "success";
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
        state.isMessage = "success";
      })
      .addCase(addTheColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { colorId, updateColor } = action.payload;
        state.colors = state.colors.map((color) =>
          color._id === colorId ? { ...color, title: updateColor } : color
        );
        state.isMessage = "success";
      })
      .addCase(updateTheColor.rejected, (state, action) => {
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
        state.isMessage = "success";
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
