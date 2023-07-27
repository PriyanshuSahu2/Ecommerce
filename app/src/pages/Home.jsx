import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { styled } from "styled-components";

import carouselData from "../data/carouselDataTemp.json";
import MainHeadlineDeals from "../components/MainHeadlineDeals";
import DealsSection from "../components/DealsSection";
import { Container } from "react-bootstrap";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../redux/cartRedux";
import { useLocation } from "react-router-dom";
import HomeImage from "../images/clothes.jpg";
import FeaturedProducts from "../components/FeaturedProducts";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
const HeadImage = styled.div`
  width: 100%; /* Set width of .headimage to 100% */
  height: 800px; /* Set height of .headimage to 800px */
  overflow: hidden; /* Hide overflowing content */
  img {
    width: 100%; /* Set width of image to 100% */
    height: 100%; /* Set height of image to 100% */
    object-fit: cover; /* Scale the image to cover the container */
  }
`;
const TextOverlay = styled.div`
  position: absolute; /* Set position to absolute */
  top: 40%; /* Set top position to 40% of parent container */
  left: 50%; /* Set left position to 50% of parent container */
  transform: translate(
    -50%,
    -50%
  ); /* Center the element horizontally and vertically */
  text-align: center; /* Set text alignment to center */
  color: #ffffff; /* Set text color to white */
  font-size: 24px; /* Set font size to 24px */
  backdrop-filter: blur(7px); /* Apply a blur effect to the background */
  padding: 20px; /* Add padding to the element */
`;
const Text = styled.p`
  font-family: "Akronim", cursive;
  font-size: 35px;
  letter-spacing: 5px;
  color: #ff3e6c;
`;
const Home = ({ user }) => {
  const [allDeals, setAllDeals] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getCartItems = () => {
      if (currentUser) {
        dispatch(getCartProducts());
      }
    };

    const getDeals = async () => {
      try {
        const response = await publicRequest("/deals");

        setAllDeals(response.data.Deals); // Access the `data` property of the response

        console.log(response.data);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getCartItems();
    getDeals(); // Call the `getProducts` function
  }, [currentUser]);
  return (
    <Wrapper>
      <Announcement />
      <HeaderComponent />
      <HeadImage>
        <img src={HomeImage} alt="Home Main Image" />
        <TextOverlay>
          <Text style={{ fontSize: "100px" }}>FashionHub</Text>
          <Text style={{ fontSize: "50px", color: "white" }}>
            Elevate your fashion game, effortlessly.
          </Text>
        </TextOverlay>
      </HeadImage>
<FeaturedProducts/>
      <FooterComponent />
    </Wrapper>
  );
};

export default Home;
