import { createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import { getInventoryList } from "./Inventory.Action";

const initialState = {
  isLoading: true,
  isTLoading: false,
  isSuccess: false,
  isError: false,
  isMessage: null,

  drawerVisible: false,
  type: "",

  totalCount: null,
  pagination: { current: 1, pageSize: 10 },
  InventoryData: [
    {
      product_name: "Watch",
      category: "Electronics",
      price: 8000,
      gst_rate: 18,
      stock_quantity: 18,
      product_id: "Product-1",
      _id: "sLYtQlhQcBpbzz4jhMVbx",
    },
    {
      product_name: "Mobile",
      category: "Electronics",
      price: 10000,
      gst_rate: 18,
      stock_quantity: 12,
      product_id: "Product-2",
      _id: "h9nbHOI7yFtk47W8g7xgc",
    },
    {
      product_name: "Air Conditioner",
      category: "Electronics",
      price: 35000,
      gst_rate: 28,
      stock_quantity: 17,
      product_id: "Product-3",
      _id: "6Vxtih63DzwR0_m1HQ2r2",
    },
    {
      product_name: "TV",
      category: "Electronics",
      price: 15000,
      gst_rate: 18,
      stock_quantity: 17,
      product_id: "Product-4",
      _id: "sfhywsu_jCB9QK9FKkbTN",
    },
    {
      product_name: "Parle",
      category: "Snacks",
      price: 100,
      gst_rate: 5,
      stock_quantity: 100,
      product_id: "Product-5",
      _id: "_BshvJSx6RZm4i2CgfxwZ",
    },
    {
      product_name: "Hide&Seek",
      category: "Snacks",
      price: 800,
      gst_rate: 10,
      stock_quantity: 17,
      product_id: "Product-6",
      _id: "_QnnHuEWLr4pjSPqt26dd",
    },
    {
      product_name: "Himalyan face wash",
      category: "Beauty",
      price: 150,
      gst_rate: 8,
      stock_quantity: 17,
      product_id: "Product-7",
      _id: "aQUPangCVWHVQGcRCZA6k",
    },
    {
      product_name: "Wall clock",
      category: "Household",
      price: 0.07,
      gst_rate: 12,
      stock_quantity: 18,
      product_id: "Product-8",
      _id: "ldS-G8Kjy8zAt7o5LTYf3",
    },
    {
      product_name: "Brush",
      category: "Grocery",
      price: 10,
      gst_rate: 0,
      stock_quantity: 8,
      product_id: "Product-9",
      _id: "taEHTM8P9uP7L_VaH1hI8",
    },
    {
      product_name: "Dal",
      category: "Grocery",
      price: 100,
      gst_rate: 12,
      stock_quantity: 0,
      product_id: "Product-10",
      _id: "C6qbhhTYYgdubYNx28hi7",
    },
  ],
  ismodalVisible: false,
  viewRecord: {},
  editRecord: {},
  FilterInventoryData: [],
  searchparam: "",
};
const InventorySlice = createSlice({
  name: "Inventory",
  initialState: initialState,
  reducers: {
    setDrawerVisible: (state, { payload }) => {
      state.drawerVisible = payload.visible;
      state.type = payload.type;
      state.editRecord = payload?.record || {};
    },
    setViewModalVisible: (state, { payload }) => {
      state.ismodalVisible = payload.visible;
      state.viewRecord = payload?.record || {};
    },
    setInventoryData: (state, { payload }) => {
      if (payload?.id) {
        state.InventoryData = state.InventoryData.map((eve, eveIndex) => {
          if (payload?.id === eve?._id) {
            return { ...payload };
          } else {
            return eve;
          }
        });
        state.drawerVisible = false;
        message.success("Inventory Item Updated Successfully");
      } else {
        state.InventoryData = [
          ...state.InventoryData,
          {
            ...payload,
            product_id: `Product-${state.InventoryData?.length + 1}`,
            _id: nanoid(),
          },
        ];
        state.drawerVisible = false;

        message.success("Inventory Item Created Successfully");
      }
    },
    deleteInventoryData: (state, { payload }) => {
      const { id } = payload;
      state.InventoryData = state.InventoryData.filter(
        (item) => item._id !== id
      );
      message.success("Inventory Item Deleted Successfully");
    },
    searchbyName: (state, { payload }) => {
      state.searchparam = payload;
    },
    setMangeInventory: (state, { payload }) => {
      const cartItems = payload?.cartItems; // cart items
      cartItems.forEach((cartItem) => {
        const product = state.InventoryData.find(
          (item) => item.product_id === cartItem.product_id
        );
        if (product) {
          product.stock_quantity -= cartItem.quantity;
          if (product.stock_quantity < 0) {
            product.stock_quantity = 0; // Prevent negative stock
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInventoryList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInventoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.InventoryData = action?.payload?.data || [];
      })
      .addCase(getInventoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});
export const {
  setDrawerVisible,
  setInventoryData,
  deleteInventoryData,
  setViewModalVisible,
  searchbyName,
  setMangeInventory,
} = InventorySlice.actions;

export default InventorySlice.reducer;
