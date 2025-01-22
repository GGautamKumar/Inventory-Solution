import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInventoryListAPI,
  CreateInventoryListAPI,
  UpdateInventoryListAPI,
  DeleteInventoryListAPI,
} from "../../services/inventoryServices";
export const getInventoryList = createAsyncThunk(
  "Inventory/get-lists",
  async (data, thunkAPI) => {
    try {
      const res = await getInventoryListAPI(data);

      return res;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const CreateInventoryList = createAsyncThunk(
  "Inventory/create-lists",
  async (data, thunkAPI) => {
    try {
      const res = await CreateInventoryListAPI(data);

      return res;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const UpdateInventoryList = createAsyncThunk(
  "Inventory/get-lists",
  async (data, thunkAPI) => {
    try {
      const res = await UpdateInventoryListAPI(data);

      return res;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const DeleteInventoryList = createAsyncThunk(
  "Inventory/delete-lists",
  async (data, thunkAPI) => {
    try {
      const res = await DeleteInventoryListAPI(data);

      return res;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
