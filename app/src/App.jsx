import React, { Suspense, lazy, useEffect, useState } from "react";



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterComponent from "./components/FooterComponent";
import { styled } from "styled-components";
import Layout from "./pages/Layout";

const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderScreen = lazy(() => import("./pages/OrderScreen"));
const Dashbaord = lazy(() => import("./pages/adminPages/Dashbaord"));
const AdminProductsPage = lazy(() => import("./pages/adminPages/AdminProductsPage"));
const AllUserPage = lazy(() => import("./pages/adminPages/AllUserPage"));
const AllOrderPage = lazy(() => import("./pages/adminPages/AllOrdersPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const Wrapper = styled.div`
  font-family: "Assistant", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Wrapper>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>

            <Routes>
              {/* Routes for authenticated users */}
              {user && (
                <>
                  <Route path="/admin" element={<Dashbaord />} />
                  <Route path="/admin/products" element={<AdminProductsPage />} />
                  <Route path="/admin/users" element={<AllUserPage />} />
                  <Route path="/admin/orders" element={<AllOrderPage />} />
                  <Route path="/user/:id" element={<UserProfile />} />
                  <Route path="/orders/:id" element={<OrderHistoryPage />} />
                </>
              )}

              {/* Routes for all users */}
              <Route path="/" element={<Home />} />
              <Route path="/allProducts" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />

              {/* Route for authentication */}
              <Route
                path="/auth"
                element={user ? <Navigate to="/" /> : <AuthPage />}
              ></Route>
            </Routes>

          </Suspense>
        </Router>
        <FooterComponent />
      </Wrapper>
    </>
  );
};

export default App;
