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

export const getASingleEnquiry = createAsyncThunk(
  "enquiry/get-single-enquiry",
  async (enquiryId, thunkAPI) => {
    try {
      return await enquiryService.getSingleEnquiry(enquiryId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheEnquiriesStatus = createAsyncThunk(
  "enquiry/update-enquiry-status",
  async ({ updateEnquiryId, statusEnquiry }, thunkAPI) => {
    try {
      await enquiryService.updateEnquiry(updateEnquiryId, statusEnquiry);
      thunkAPI.dispatch(getAllEnquiries);
      return { updateEnquiryId, statusEnquiry };
    } catch (error) {
      throw error;
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
  singleEnquiry: "",
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
        state.isMessage = "success";
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(getASingleEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleEnquiry = action.payload;
        state.isMessage = "success";
      })
      .addCase(getASingleEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateTheEnquiriesStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheEnquiriesStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { updateEnquiryId, statusEnquiry } = action.payload;
        state.enquiries = state.enquiries.map((enquiry) =>
          enquiry._id === updateEnquiryId
            ? { ...enquiry, status: statusEnquiry }
            : enquiry
        );
        state.isMessage = "success";
      })
      .addCase(updateTheEnquiriesStatus.rejected, (state, action) => {
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
        state.isMessage = "success";
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
