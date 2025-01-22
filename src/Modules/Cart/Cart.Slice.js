import { createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";

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

  ismodalVisible: false,
  viewRecord: {},
  editRecord: {},
  cartItems: [],
  isCheckoutModalVisible: false,
  draftInvoice: {},
};
const CartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    setDrawerVisible: (state, { payload }) => {
      state.drawerVisible = payload.visible;
      state.type = payload?.type;
      state.editRecord = payload?.record || {};
    },
    setCheckoutModalVisible: (state, { payload }) => {
      state.isCheckoutModalVisible = payload?.visible || false;
      state.type = payload?.type;
      state.draftInvoice = payload?.record || {};
    },
    setViewModalVisible: (state, { payload }) => {
      state.ismodalVisible = payload.visible;
      state.viewRecord = payload?.record || {};
    },
    setCartDetails: (state, { payload }) => {
      console.log(payload);
      const finditempresentincart =
        state.cartItems.find((eve) => eve?._id === payload?._id) || {};
      if (finditempresentincart?._id) {
        message.warning(`${payload?.product_name} is already in the cart`);
      } else {
        message.success(`${payload.product_name} added to cart`);
        state.cartItems = [...state.cartItems, payload];
      }
    },
    setQuantitybyId: (state, { payload }) => {
      state.cartItems = state.cartItems.map((eve) => {
        if (payload._id === eve._id) {
          return payload;
        } else {
          return eve;
        }
      });
    },
    setCartEmpty: (state, { payload }) => {
      state.cartItems = [];
    },
    deleteCartDetails: (state, { payload }) => {},
  },
  //   extraReducers: (builder) => {
  //     builder

  //   },
});
export const {
  setQuantitybyId,
  setCartDetails,
  deleteCartDetails,
  setCheckoutModalVisible,
  setCartEmpty,
} = CartSlice.actions;

export default CartSlice.reducer;
