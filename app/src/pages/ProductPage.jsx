import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";
import HeaderComponent from "../components/HeaderComponent";
import Announcement from "../components/Announcement";
import FooterComponent from "../components/FooterComponent";
import { BsFillBagPlusFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { addCartProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { FiArrowRight } from "react-icons/fi";
import ReviewComponents from "../components/ReviewComponents";
const Wrapper = styled.div`
  display: flex;
`;

const ProductImageGridContainer = styled.div`
  float: left;
  width: 58%;

  display: grid;
  grid-template-columns: auto auto;
`;
const ProductImagesContainer = styled.div`
  border: 1px solid #eaeaec;
  font-size: 30px;
  text-align: center;
`;
const ProductImage = styled.img`
  width: 100%;
  background-image: url("https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22627706/2023/4/3/9ba4e4b6-80fd-47c6-ae01-d60187664aac1680522721646Watches1.jpg");
`;
const ProductDescriptionContainer = styled.div`
  float: right;
  width: 42%;
  padding: 0 0 0 30px;
  display: flex;
  flex-direction: column;
`;
const ProductPriceInfo = styled.span``;
const ProductBrandTitle = styled.h1`
  color: #282c3f;
  padding: 0 20px 0 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
`;
const ProductTitle = styled.h1`
  color: #535665;
  padding: 5px 20px 14px 0;
  font-size: 20px;
  opacity: 0.8;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
`;
const SellingPriceContianer = styled.div`
  color: #696e79;
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 5px;
  display: inline-block;
`;
const Price = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  color: black;
`;
const Info = styled.span`
  color: #03a685;
  font-weight: 700;
  font-size: 14px;
  display: block;
  margin: 5px 10px 0 0;
`;
const ProductSizeSelectContainer = styled.div`
  margin: 10px 0 24px;
`;
const SizeContianerHeader = styled.div`
  margin: 0 0 10px;
  position: relative;
  line-height: 1;
`;
const Header = styled.h4`
  display: inline-block;
  font-size: 16px;
  margin: 0;
  font-weight: 700;
`;
const AllSizeButtonsContainer = styled.div`
  display: flex;
`;
const SizeBtnContainer = styled.div`
  margin: 10px 10px 10px 0;
  position: relative;
`;
const SizeBtn = styled.button`
  border: 1px solid #ff3f6c;
  background-color: #fff;

  border-radius: 50px;
  padding: 0;
  min-width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
  background-color: ${(props) => (props.isselected ? "#ff3f6c" : "white")};
  color: ${(props) => (props.isselected ? "white" : "#ff3f6c")};
  &:hover {
  }
`;
const SizeLabel = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 0 8px;
  font-weight: 700;
  color: inherit;
`;
const ProductActionsContainer = styled.div`
  padding: 0;
  z-index: 0;
  width: 100%;
  display: flex;
`;
const AddToBagBtn = styled.div`
  font-weight: 700;
  cursor: pointer;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;

  flex: 3;
  width: 100%;
  margin-right: 3%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
`;
const GoToBagBtn = styled(Link)`
  font-weight: 700;
  cursor: pointer;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;
  text-decoration: none;
  flex: 3;
  width: 100%;
  margin-right: 3%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
`;
const AddToBagIcon = styled(BsFillBagPlusFill)`
  background-position: -2283px -40px;
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;
const GoToBagIcon = styled(FiArrowRight)`
  background-position: -2283px -40px;
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;
const BtnLabel = styled.span`
  font-weight: 700;
  cursor: pointer;
`;
const WhishlistBtnContianer = styled(AddToBagBtn)`
  background-color: white;
  border: 1px solid #d4d5d9;
  color: #282c3f;
  flex: 2;
  &:hover {
    border: 1px solid #ff3e6c;
  }
`;
const WhislistIcon = styled(AiOutlineHeart)`
  background-position: -2283px -40px;
  width: 22px;
  height: 22px;
  margin-right: 5px;
`;

const ProductDescriptionLabel = styled.h4`
  color: #282c3f;
  font-size: 16px;
  margin: 0;
  font-weight: 700;
  text-transform: capitalize;
  border: none;
  padding-bottom: 12px;
`;
// const ProductDescriptionContent = styled.p`
//   color: #282c3f;
//   line-height: 1.4;
//   font-size: 16px;
//   margin-top: 12px;
//   width: 84%;
// `;
const ProductSpecifcationTableContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const SpecificationRow = styled.div`
  position: relative;
  border-bottom: 1px solid #eaeaec;
  margin: 0 0 12px;
  padding-bottom: 10px;
  -ms-flex-preferred-size: 40%;
  flex-basis: 40%;
  margin-right: 10%;
`;
const SpecificationTitle = styled.div`
  position: relative;
  color: #7e818c;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 5px;
`;
const SpecficationValue = styled.div`
  position: relative;
  color: #282c3f;
  font-size: 16px;
  line-height: 1.2;
`;
const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const dispatch = useDispatch();
  const productId = useLocation().pathname.split("/")[2];
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest("products/" + productId);
        setProduct(response.data); // Access the `data` property of the response
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getProduct(); // Call the `getProducts` function
  }, [productId]);

  const SelectedSize = (size) => {
    setSelectedSize(size);
  };

  const cartProducts = useSelector((state) => state.cart.products);
  const isProductInCart = cartProducts?.some((item) => {
    return item._id === product._id && item.selectedSize === selectedSize;
  });
  const AddToCart = () => {
    dispatch(
      addCartProduct({
        products: [
          {
            productId: `${product._id}`,
            quantity: 1,
            selectedSize: `${selectedSize}`,
          },
        ],
      })
    );
  };
  console.log();
  return (
    <>
      <Announcement />
      <HeaderComponent />
      <Container>
        <Wrapper className="mt-5">
          <ProductImageGridContainer>
            {product.img?.map((item, idx) => {
              return (
                <ProductImagesContainer>
                  <ProductImage src={item} />
                </ProductImagesContainer>
              );
            })}
          </ProductImageGridContainer>

          <ProductDescriptionContainer>
            <ProductPriceInfo>
              <ProductBrandTitle>{product.brand}</ProductBrandTitle>
              <ProductTitle>{product.productName}</ProductTitle>
              <SellingPriceContianer>
                <Price>Rs. {product.price}</Price>
                <Info>inclusive of all taxes</Info>
              </SellingPriceContianer>
            </ProductPriceInfo>

            <ProductSizeSelectContainer>
              <SizeContianerHeader>
                <Header>SELECT SIZE </Header>
              </SizeContianerHeader>
              <AllSizeButtonsContainer>
                <SizeBtnContainer>
                  {product.sizes?.map((item, idx) => {
                    const isSelected = item === selectedSize;

                    return (
                      <SizeBtn
                        isselected={isSelected}
                        key={idx}
                        onClick={() => {
                          SelectedSize(item);
                        }}
                      >
                        <SizeLabel>{item}</SizeLabel>
                      </SizeBtn>
                    );
                  })}
                </SizeBtnContainer>
              </AllSizeButtonsContainer>
            </ProductSizeSelectContainer>

            <div>
              <ProductActionsContainer>
                {!isProductInCart ? (
                  <AddToBagBtn onClick={AddToCart}>
                    <AddToBagIcon />
                    <BtnLabel>Add to Cart</BtnLabel>
                  </AddToBagBtn>
                ) : (
                  <GoToBagBtn to="/cart">
                    <GoToBagIcon />
                    <BtnLabel>Go to Cart</BtnLabel>
                  </GoToBagBtn>
                )}

                <WhishlistBtnContianer>
                  <WhislistIcon />
                  <BtnLabel>Whislist</BtnLabel>
                </WhishlistBtnContianer>
              </ProductActionsContainer>
            </div>

            <hr />

            <>
              <ProductDescriptionLabel>PRODUCT DETAILS</ProductDescriptionLabel>

            </>
            <hr />
            <ReviewComponents productId={productId} averageRating = {product?.rating}/>
          </ProductDescriptionContainer>

          
        </Wrapper>
      </Container>
      <FooterComponent />
    </>
  );
};

export default ProductPage;
