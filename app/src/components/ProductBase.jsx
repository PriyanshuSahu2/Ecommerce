import React from "react";
import { styled } from "styled-components";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../requestMethod";
const Container = styled.div`
  width: 210px;
  text-align: left;
  position: relative;
  vertical-align: top;
  overflow: hidden;
  display: inline-block;

  margin: 0 10px 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid #edebef;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
const ProductRatingContainer = styled.div`
  z-index: 1;
  position: absolute;
  margin-left: 10px;
  margin-top: 250px;
  font-size: 12px;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0 0 0 4px;
  background-color: hsla(0, 0%, 100%, 0.8);
`;
const ProductImageSliderContainer = styled.div`
  position: relative;
  width: 210px;
  height: 270px;
`;
const ProductInfo = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding: 10px 10px;
  height: 80px;
  min-height: 70px;

  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 5px;
`;
const ProductImage = styled.img`
  width: 100%;
  display: block;
  height: 100%;
  overflow-clip-margin: content-box;
  overflow: clip;
`;
const ProductBrand = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: #282c3f;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProductName = styled.h4`
  color: #3d3d3d;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  display: block;
`;
const ProductPrice = styled.div`
  font-size: 14px;
  line-height: 15px;
  color: #282c3f;
  white-space: nowrap;
  margin: 10px 0 6px;
`;
const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #282c3f;
`;
const Rating = styled.span`
  margin: 0px 2px;
  color: black;
`;
const Star = styled(TiStarFullOutline)`
  margin: 0px 2px;
  color: teal;
`;
const Seperator = styled.div`
  font-size: 10px;
`;
const TotalRating = styled.span`
  margin: 0 4px;
  color: black;
`;

const ProductBase = ({ data }) => {
  return (
    <Link to={"/product/" + data?._id}>
      <Container>
        <ProductRatingContainer>
          <Rating>{data?.rating?.toFixed(1)}</Rating>
          <Star />
          <Seperator>|</Seperator>
          <TotalRating>{data?.totalReviews}</TotalRating>
        </ProductRatingContainer>
        <div>
          <ProductImageSliderContainer>
            <ProductImage src={`${IMAGE_BASE_URL}/products/${data?.img[0]}`} />
          </ProductImageSliderContainer>
          <ProductInfo>
            <ProductBrand>{data?.brand}</ProductBrand>
            <ProductName>{data?.productName}</ProductName>
            <ProductPrice>
              <Price>${data?.price}</Price>
            </ProductPrice>
          </ProductInfo>
        </div>
      </Container>
    </Link>
  );
};

export default ProductBase;
