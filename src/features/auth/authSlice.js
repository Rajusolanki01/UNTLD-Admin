import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { toast } from "sonner";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const getAllUsersOrders = createAsyncThunk(
  "auth/get-all-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const getAOrderByUser = createAsyncThunk(
  "auth/get-order-by-user",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrderByUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const updateTheOrderStatus = createAsyncThunk(
  "enquiry/update-order-status",
  async ({ orderId, orderStatus }, thunkAPI) => {
    try {
      await authService.updateOrder(orderId, orderStatus);
      thunkAPI.dispatch(getAllUsersOrders);
      return { orderId, orderStatus };
    } catch (error) {
      throw error;
    }
  }
);

export const getAMonthlyWiseOrders = createAsyncThunk(
  "auth/Monthly-Orders",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const getAYearlyWiseTotalOrders = createAsyncThunk(
  "auth/Yearly-Orders",
  async (thunkAPI) => {
    try {
      return await authService.yearTotalOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const forgortPasswordUser = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.forgotPassword(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "auth/reset-password",
  async (userData, thunkAPI) => {
    try {
      return await authService.resetPassword(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (userData, thunkAPI) => {
    try {
      return await authService.logout(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

// const userDefaultState = {
//   _id: null,
//   firstname: null,
//   lastname: null,
//   email: null,
//   mobile: null,
//   token: null,
// };

const userInitialState = {
  user: {},
  orders: [],
  orderByUser: {},
  getMonthlyOrder: {},
  getYearlyOrder: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllUsersOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllUsersOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(getAOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderByUser = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAOrderByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(updateTheOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { orderId, orderStatus } = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: orderStatus } : order
        );
        state.isMessage = "success";
      })
      .addCase(updateTheOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(getAMonthlyWiseOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAMonthlyWiseOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getMonthlyOrder = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAMonthlyWiseOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(getAYearlyWiseTotalOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAYearlyWiseTotalOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getYearlyOrder = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAYearlyWiseTotalOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isMessage = "success";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(forgortPasswordUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgortPasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isMessage = "success";
      })
      .addCase(forgortPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess) {
          toast.success("Password Successfully Change");
        }
        state.user = action.payload;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.ismessage = action.error;
      });
  },
});

export default authSlice.reducer;
