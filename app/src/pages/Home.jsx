import React, { Suspense, lazy, startTransition, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../redux/cartRedux";
import { styled } from "styled-components";
import HeroSection from "../components/HeroSection";

const HeaderComponent = lazy(() => import("../components/HeaderComponent"));
const FeaturedProducts = lazy(() => import("../components/FeaturedProducts"));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
`;

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  useEffect(() => {
    const getCartItems = () => {
      if (currentUser) {
        startTransition(() => {
          dispatch(getCartProducts());
        });
      }
    };

    getCartItems();
  }, [currentUser, dispatch]);

  const images = [
    "/assets/m1.png",
    "/assets/m2.webp",
    "/assets/m3.jpeg",
    "/assets/m4.webp",
]
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderComponent />
        </Suspense>
        <HeroSection images={images}/>
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedProducts />
        </Suspense>
      </Wrapper>
    </Suspense>
  );
};

export default Home;
