import React from "react";
import { styled } from "styled-components";
import { TiStarFullOutline } from "react-icons/ti";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
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
  height: 280px;
`;
const ProductInfo = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding: 0 10px;
  height: 100%;
  margin-top: 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 5px;
`;
const ProductImage = styled.img`
  width: 100%;
  display: block;
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
  -webkit-margin-before: initial;
  ${Container}:hover & {
    visibility: hidden;
  }
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
const ProductAction = styled.div`
  display: none;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 245px;
  background: #fff;
  width: 100%;
  padding: 16px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  ${Container}:hover & {
    display: flex;
  }
`;
const ProductWishListButton = styled.span`
  width: 100%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  padding: 5px;
  border: 1px solid #d4d5d9;
  color: #282c3f;
  letter-spacing: 0.3px;
  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }
`;
const WishListBtn = styled(AiOutlineHeart)`
  margin: -4px 8px;
  width: 17px;
  height: 22px;
  background-position: -315px -186px;
`;
const ProductBase = ({ data }) => {

  return (
    <Link to={"/product/"+data._id}>
      <Container>
        <ProductRatingContainer>
          <Rating>{data.rating}</Rating>
          <Star />
          <Seperator>|</Seperator>
          <TotalRating>4k</TotalRating>
        </ProductRatingContainer>
        <div>
          <ProductImageSliderContainer>
            <ProductImage src={data.img[0]} />
          </ProductImageSliderContainer>
          <ProductInfo>
            <ProductBrand>{data.brand}</ProductBrand>
            <ProductName>{data.productName}</ProductName>
            <ProductPrice>
              <Price>Rs. {data.price}</Price>
            </ProductPrice>
          </ProductInfo>
        </div>
        <ProductAction>
          <ProductWishListButton>
            <WishListBtn />
            Add To Cart
          </ProductWishListButton>
        </ProductAction>
      </Container>
    </Link>
  );
};

export default ProductBase;
