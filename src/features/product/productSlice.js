import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get-products",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const getASingleProducts = createAsyncThunk(
  "product/get-single-products",
  async (productId, thunkAPI) => {
    try {
      return await productService.getSingleProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const addProducts = createAsyncThunk(
  "product/add-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.addProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const updateTheProduct = createAsyncThunk(
  "product/update-products",
  async ({ productId, values }, thunkAPI) => {
    try {
      await productService.updateProduct(productId, values);
      thunkAPI.dispatch(getAllProducts());
      return { productId, values };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

export const deleteTheProduct = createAsyncThunk(
  "product/delete-products",
  async (productId, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      thunkAPI.dispatch(getAllProducts());
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.result?.message || error
      );
    }
  }
);

const productInitialState = {
  products: [],
  productName: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.isMessage = "success";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(getASingleProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASingleProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productName = action.payload.title;
        state.isMessage = "success";
      })
      .addCase(getASingleProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProducts = action.payload;
        state.isMessage = "success";
      })
      .addCase(updateTheProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTheProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { id, productData } = action.payload;
        state.products = state.products.map((product) =>
          product._id === id ? { ...product, productData } : product
        );
        state.isMessage = "success";
      })
      .addCase(updateTheProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteTheProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.isMessage = "success";
      })
      .addCase(deleteTheProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      });
  },
});

export default productSlice.reducer;
