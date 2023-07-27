import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import DealsComponent from "./DealsComponent";
import ProductBase from "./ProductBase";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
`;
const Title = styled.h4`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: #3e4152;
  letter-spacing: 0.15em;
  font-size: 1.8em;
  margin: 50px 0 10px 30px;
  max-height: 5em;
  font-weight: 700;
`;
const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 20px;
`;
const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await publicRequest("/featuredProducts");
        console.log(response.data);
        setFeaturedProducts(response.data);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getFeaturedProducts();
  }, []);
  return (
    <Container>
      <Title>Feature Products</Title>
      <ProductsContainer>
        {featuredProducts.map((data) => {
          return <ProductBase data={data} />;
        })}
      </ProductsContainer>
    </Container>
  );
};

export default FeaturedProducts;
