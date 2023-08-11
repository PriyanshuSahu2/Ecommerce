import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 220px;
  text-align: left;
  position: relative;
  vertical-align: top;
  overflow: hidden;
  display: inline-block;

  margin: 0 10px 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 5px;
`;
const ProductBaseSkeleton = () => {
  return (
    <Container>
      <Skeleton height={260} />
      <Skeleton count={0.5} />
      <Skeleton count={1} />
      <Skeleton count={0.2} />
    </Container>
  );
};

export default ProductBaseSkeleton;
