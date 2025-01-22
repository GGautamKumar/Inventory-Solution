// contains the code related to our redux store
import { configureStore } from "@reduxjs/toolkit";

import InventorySlice from "../src/Modules/Inventory/Inventory.Slice";
import CartSlice from "../src/Modules/Cart/Cart.Slice";
import InvoiceSlice from "../src/Modules/Invoice/Invoice.slice";
const store = configureStore({
  reducer: {
    Inventory: InventorySlice,
    Cart: CartSlice,
    Invoice: InvoiceSlice,
  },
});

export default store;
