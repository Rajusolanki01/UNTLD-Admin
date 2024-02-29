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

export const updateTheCoupon = createAsyncThunk(
  "brand/update-coupon",
  async (userData, thunkAPI) => {
    try {
      const { couponId, ...data } = userData;
      await couponService.updateCoupon(couponId, data);
      thunkAPI.dispatch(getAllCoupons);
      return { couponId, data };
    } catch (error) {
      throw error;
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
        state.isMessage = "success";
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
        state.isMessage = "success";
      })
      .addCase(addTheCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { couponId, data } = action.payload;
        state.coupons = state.coupons.map((coupon) =>
          coupon._id === couponId ? { ...coupon, ...data } : coupon
        );
        state.isMessage = "success";
      })
      .addCase(updateTheCoupon.rejected, (state, action) => {
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
        state.isMessage = "success";
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
