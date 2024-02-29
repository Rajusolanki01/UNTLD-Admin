import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customerService } from "./customerService";

export const getAllUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const getaSingleUsers = createAsyncThunk(
  "customer/single-customers",
  async (id, thunkAPI) => {
    try {
      return await customerService.getASingleUsers(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const blockAUser = createAsyncThunk(
  "customer/block",
  async (id, thunkAPI) => {
    try {
      return await customerService.blockUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

export const unblockAUser = createAsyncThunk(
  "customer/unblock",
  async (id, thunkAPI) => {
    try {
      return await customerService.UnblockUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error);
    }
  }
);

const customerInitialState = {
  customers: [],
  singleCustomer: {},
  isBlockedUser: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(getaSingleUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaSingleUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleCustomer = action.payload;
        state.isMessage = "success";
      })
      .addCase(getaSingleUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(blockAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isBlockedUser = action.payload;
        state.isMessage = "success";
      })
      .addCase(blockAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(unblockAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblockAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isBlockedUser = action.payload;
        state.isMessage = "success";
      })
      .addCase(unblockAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default customerSlice.reducer;
