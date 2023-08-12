import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "react-bootstrap";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Left = styled.div`
  width: 100%;
`;
const Right = styled.div`
  /* Set a width to maintain space within flex container */
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;
const Horizontal = styled.div`
  width: 100%;
  display: flex;
  .react-loading-skeleton {
    margin-left: 10px;
  }
`;
const ProductPageSkeleton = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Wrapper>
            <Left>
              {" "}
              <Skeleton height={400} />
            </Left>
            <Right>
              {" "}
              <Skeleton height={400} />
            </Right>
          </Wrapper>
          <Wrapper>
            <Left>
              {" "}
              <Skeleton height={400} />
            </Left>
            <Right>
              {" "}
              <Skeleton height={400} />
            </Right>
          </Wrapper>
        </Left>
        <Right>
          <Skeleton height={30} width={200} />
          <Skeleton height={30} width={400} />
          <br />
          <Skeleton height={30} width={100} />
          <Skeleton height={15} width={200} />
          <br />
          <Skeleton height={30} width={100} />
          <div style={{ marginTop: "10px" }}></div>
          <Horizontal>
            <Skeleton circle height={60} width={60} />
            <Skeleton circle height={60} width={60} />
            <Skeleton circle height={60} width={60} />
            <Skeleton circle height={60} width={60} />
          </Horizontal>
          <br />
          <Skeleton height={50} />
          <hr />
          <Skeleton count={5} height={30} />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ProductPageSkeleton;
