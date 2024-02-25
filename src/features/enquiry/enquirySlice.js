import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enquiryService } from "./enquiryService";

export const getAllEnquiries = createAsyncThunk(
  "enquiry/get-all-enquiry",
  async (_, thunkAPI) => {
    try {
      return await enquiryService.getenquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);
export const updateTheEnquiries = createAsyncThunk(
  "enquiry/update-enquiry",
  async (updateEnquiryId, userData, thunkAPI) => {
    try {
      await enquiryService.deleteEnquiry(updateEnquiryId, userData);
      thunkAPI.dispatch(getAllEnquiries);
      return updateEnquiryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);
export const deleteTheEnquiries = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (enquiryId, thunkAPI) => {
    try {
      await enquiryService.deleteEnquiry(enquiryId);
      thunkAPI.dispatch(getAllEnquiries);
      return enquiryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const enquiryInitialState = {
  enquiries: [],
  enquiryStatus: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState: enquiryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryStatus = action.payload;
      })
      .addCase(updateTheEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })

      .addCase(deleteTheEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = state.enquiries.filter(
          (enquiry) => enquiry._id !== action.payload
        );
      })
      .addCase(deleteTheEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default enquirySlice.reducer;
