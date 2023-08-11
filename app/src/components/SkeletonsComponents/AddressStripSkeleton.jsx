import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  margin-bottom: 8px;
  background: #fff;
  font-size: 14px;
  border: 1px solid #eaeaec;
  border-radius: 4px;
  padding: 10px;
  display: flex;
`;

const Left = styled.div`
  /* Set a width to maintain space within flex container */
  width: 100%;
  width: 120px;
`;
const Right = styled.div`
  /* Set a width to maintain space within flex container */

  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`;
const AddressStripSkeleton = () => {
  return (
    <Container>
      <Left>
        <Skeleton width={110} height={148} />
      </Left>
      <Right>
        <Skeleton count={0.3} />
        <Skeleton count={0.5} />
        <Skeleton count={0.2} />
        <Skeleton count={0.3} />
        <Skeleton count={0.5} />
      </Right>
    </Container>
  );
};

export default AddressStripSkeleton;
