import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./MainLayout";
import Inventory from "./Modules/Inventory";
import ProductList from "./Modules/Product";
import Cart from "./Modules/Cart";
import Invoice from "./Modules/Invoice";
// import "./App.css";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={
              <MainLayout>
                <Inventory />
              </MainLayout>
            }
          />
          <Route
            path="/product"
            element={
              <MainLayout>
                <ProductList />
              </MainLayout>
            }
          />
          <Route path="/setting" element={<MainLayout></MainLayout>} />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />
          <Route
            path="/invoice"
            element={
              <MainLayout>
                <Invoice />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
