import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import ProductBaseSkeleton from "./SkeletonsComponents/ProductBaseSkeleton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h4`
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0.15em;
  font-size: 2em;
  margin: 50px 0 10px 30px;
  font-weight: 700;
  background-color: #ff3e6c;
  padding: 10px;
  max-width: fit-content;
  border-radius: 8px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const ProductBase = lazy(() => import("./ProductBase"));

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
        console.log(`FeaturedProducts ${err}`);
      }
    };

    getFeaturedProducts();
  }, []);

  // Memoize the featuredProducts state to prevent unnecessary re-renders
  const memoizedFeaturedProducts = useMemo(() => featuredProducts, [featuredProducts]);

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
          <Suspense fallback={<ProductBaseSkeleton />}>
            {!loading &&
              memoizedFeaturedProducts.map((data) => (
                data._id && <ProductBase key={data._id} data={data._id} />
              ))}
          </Suspense>
        )}

      </ProductsContainer>
    </Container>
  );
};

export default FeaturedProducts;
