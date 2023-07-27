import React, { useEffect } from "react";
import { styled } from "styled-components";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "./redux/cartRedux";
import AuthPage from "./pages/AuthPage";
import OrderScreen from "./pages/OrderScreen";
import PaymentScreen from "./pages/PaymentScreen";
import ProductPlace from "./pages/ProductPlace";
const Wrapper = styled.div`
  font-family: "Assistant", sans-serif;
`;
const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allProducts" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<ProductPlace />} />
          <Route path="/order" element={<OrderScreen />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/" /> : <AuthPage />}
          ></Route>
        </Routes>
      </Router>
    </Wrapper>
  );
};

export default App;
