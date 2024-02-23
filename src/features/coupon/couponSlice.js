import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { couponService } from "./couponService";

export const getAllCoupons = createAsyncThunk(
  "coupon/get-all-coupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getCoupon();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addTheCoupon = createAsyncThunk(
  "color/add-color",
  async (userData, thunkAPI) => {
    try {
      return await couponService.addCoupon(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const deleteTheCoupon = createAsyncThunk(
  "color/delete-color",
  async (couponId, thunkAPI) => {
    try {
      await couponService.deleteCoupon(couponId);
      thunkAPI.dispatch(getAllCoupons);
      return couponId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const couponInitialState = {
  coupons: [],
  addCoupon: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState: couponInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addTheCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addCoupon = action.payload;
      })
      .addCase(addTheCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        );
      })
      .addCase(deleteTheCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default couponSlice.reducer;
