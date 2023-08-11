import React, { useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";

import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../redux/cartRedux";
import FeaturedProducts from "../components/FeaturedProducts";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  useEffect(() => {
    const getCartItems = () => {
      if (currentUser) {
        dispatch(getCartProducts());
      }
    };

    getCartItems();
  }, [currentUser, dispatch]);

  return (
    <Wrapper>
      <HeaderComponent />
      <FeaturedProducts />
    </Wrapper>
  );
};

export default Home;
