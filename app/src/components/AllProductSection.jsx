import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { BASE_URL } from "../requestMethod";

import ProductBase from "./ProductBase";
// import SortingSection from "./SortingSection";
import ProductBaseSkeleton from "./SkeletonsComponents/ProductBaseSkeleton";

const Container = styled.div`
  width: 100%;
  flex: 4;
`;

const ProductsContainer = styled.div`
  padding: 20px;
`;

const AllProductSection = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const getProducts = async () => {
      try {
        setLoading(true);
        // Construct the filter query parameters
        const categories = selectedCategories.join(",");
        const brands = selectedBrands.join(",");
        const searchQuery = urlParams.get("search");
        console.log(brands);

        if (categories && brands) {
          const response = await axios.get(
            `${BASE_URL}/products?Categories=${categories}&Brand=${brands}`
          );
          setProducts(response.data);
        } else if (categories) {
          const response = await axios.get(
            `${BASE_URL}/products?Categories=${categories}`
          );
          setProducts(response.data);
        } else if (brands) {
          const response = await axios.get(
            `${BASE_URL}/products?Brand=${brands}`
          );
          setProducts(response.data);
        } else if (searchQuery) {
          const response = await axios.get(
            `${BASE_URL}/products?search=${searchQuery}`
          );
          setProducts(response.data);
        } else {
          const response = await axios.get(`${BASE_URL}/products/`);
          setProducts(response.data);
        }
        setLoading(false);
        // Access the `data` property of the response
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getProducts(); // Call the `getProducts` function
  }, [selectedCategories, selectedBrands]); // Include selectedCategories in the dependency array

  return (
    <Container>
      <ProductsContainer>
        {loading ? (
          <>
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
            <ProductBaseSkeleton />
          </>
        ) : (
          products.map((item) => <ProductBase key={item._id} data={item} />)
        )}
      </ProductsContainer>
    </Container>
  );
};

export default AllProductSection;
