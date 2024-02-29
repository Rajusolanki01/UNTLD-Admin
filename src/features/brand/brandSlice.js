import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brandService } from "./brandService";

export const getAllBrands = createAsyncThunk(
  "brand/get-brands",
  async (_, thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addBrand = createAsyncThunk(
  "brand/add-brand",
  async (userData, thunkAPI) => {
    try {
      return await brandService.createBrand(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheBrandTitle = createAsyncThunk(
  "brand/update-brand",
  async ({ brandId, title }, thunkAPI) => {
    try {
      await brandService.updateBrand(brandId, title);
      thunkAPI.dispatch(getAllBrands);
      return { brandId, title };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTheBrand = createAsyncThunk(
  "brand/delete-brand",
  async (deleteId, thunkAPI) => {
    try {
      await brandService.deleteBrand(deleteId);
      thunkAPI.dispatch(getAllBrands());
      return deleteId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const brandInitialState = {
  brands: [],
  addBrand: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState: brandInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addBrand = action.payload;
        state.isMessage = "success";
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheBrandTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheBrandTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { brandId, title } = action.payload;
        state.brands = state.brands.map((brand) =>
          brand._id === brandId ? { ...brand, title: title } : brand
        );
        state.isMessage = "success";
      })
      .addCase(updateTheBrandTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
        state.isMessage = "success";
      })
      .addCase(deleteTheBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default brandSlice.reducer;
