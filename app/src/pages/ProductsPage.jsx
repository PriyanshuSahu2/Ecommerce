import React, { useState } from "react";
import FilterSection from "../components/FilterSection";
import { Container } from "react-bootstrap";
import AllProductSection from "../components/AllProductSection";
import { styled } from "styled-components";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import Announcement from "../components/Announcement";

const Wrapper = styled.div`
  display: flex;

`;

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  return (
    <>
      <Announcement />
      <HeaderComponent />
      <Container className="mt-3">
        <Wrapper>
          <FilterSection selectedCategories ={selectedCategories} setSelectedCategories ={setSelectedCategories} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>
          <AllProductSection selectedCategories ={selectedCategories} setSelectedCategories ={setSelectedCategories} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>
        </Wrapper>
      </Container>
      <FooterComponent />
    </>
  );
};

export default ProductsPage;
