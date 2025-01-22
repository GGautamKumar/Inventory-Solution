import { createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import { formatDate } from "../../utils/helper";

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
  InvoiceList: [],
  InvoiceRecord: {},
  viewInvoicedrawerVisible: false,
};
const InvoiceSlice = createSlice({
  name: "Invoice",
  initialState: initialState,
  reducers: {
    setDrawerVisible: (state, { payload }) => {
        console.log(payload)
      state.viewInvoicedrawerVisible = payload.visible;
      state.InvoiceRecord = payload?.record || {};
    },
    setViewModalVisible: (state, { payload }) => {
      state.ismodalVisible = payload.visible;
      state.viewRecord = payload?.record || {};
    },
    CreateInvoive: (state, { payload }) => {
      state.InvoiceList = [
        ...state.InvoiceList,
        {
          ...payload,
          _id: nanoid(),
          invoiceId: "Invoice-" + state.InvoiceList?.length + 1,
          invoiceDate: formatDate(new Date()),
        },
      ];
    },

    deleteCartDetails: (state, { payload }) => {},
  },
  //   extraReducers: (builder) => {
  //     builder

  //   },
});
export const { CreateInvoive,setDrawerVisible } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
