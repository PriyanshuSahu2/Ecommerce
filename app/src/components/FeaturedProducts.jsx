import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductBase from "./ProductBase";
import { publicRequest } from "../requestMethod";
import ProductBaseSkeleton from "./SkeletonsComponents/ProductBaseSkeleton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
  background-color: #f8f8f8; /* Add a light background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4`
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0.15em;
  font-size: 2em; /* Increase font size */
  margin: 50px 0 10px 30px;
  font-weight: 700;
  background-color: #ff3e6c; /* Add a highlight color for the title */
  padding: 10px;
  max-width: fit-content;
  border-radius: 8px;
`;

const ProductsContainer = styled.div`
  display: grid; /* Use a grid layout for better alignment */
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Responsive grid columns */
  gap: 20px;
  justify-items: center; /* Center the items within the grid */
`;

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await publicRequest("/products/top");
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getFeaturedProducts();
  }, []);

  return (
    <Container>
      <Title>Top Products</Title>
      <ProductsContainer>
        {loading ? (
          <>
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
          </>
        ) : (
          featuredProducts.map((data) => {
            return data._id &&  <ProductBase key={data?._id} data={data?._id} />; // Add a key prop for the list items
          })
        )}
      </ProductsContainer>
    </Container>
  );
};

export default FeaturedProducts;
