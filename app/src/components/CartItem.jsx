import React, { useState } from "react";
import { styled } from "styled-components";
import { MdLocalOffer } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import DialogBox from "./DialogBox";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../redux/cartRedux";


const Container = styled.div`
  margin-bottom: 8px;
  background: #fff;
  font-size: 14px;
  border: 1px solid #eaeaec;
  border-radius: 4px;
  position: relative;
  padding: 12px 12px 0;
`;
const Left = styled.div`
  position: absolute;
`;
const Right = styled.div`
  padding-left: 12px;
  position: relative;
  min-height: 148px;
  margin-left: 111px;
  margin-bottom: 12px;
`;
const ProductImageSliderContainer = styled.div`
  position: relative;
  background: rgb(229, 241, 255);
  height: 148px;
  width: 111px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  overflow-clip-margin: content-box;
  object-fit: contain;
  overflow: clip;
`;
const RightContainer = styled.div`
  text-decoration: none;
  padding-bottom: 0;
  margin-right: 6px;
`;
const ProductInfoContainer = styled.div`
  margin: 0 0 10px 0;
`;

const Info = styled.span`
  color: #03a685;
  font-weight: 700;
  font-size: 14px;
  display: block;
  margin: 5px 10px 0 0;
`;
const ProductBrand = styled.div`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  margin-bottom: 4px;
  font-weight: 700;
`;
const ProductName = styled.a`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  text-decoration: none;
  padding-bottom: 0;
  margin-right: 6px;
  color: #554d4d;
`;
const SizeAndQtyContainer = styled.div`
  margin: 10px 0;
`;
const SizeSelect = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding: 2px 8px;
  background: #f5f5f6;
  color: #282c3f;
  font-weight: 700;
  cursor: pointer;
  margin-right: 12px;
  border-radius: 2px;
  line-height: 16px;
`;
const QtySelect = styled(SizeSelect)``;
const PriceContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  display: inline-block;
  color: #282c3f;
`;
const DeleteBtn = styled(AiFillDelete)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const CartItem = ({ data, interactable = true }) => {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  // const productQuantity = useSelector((state) => state.cart.products.quantity);
  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const deleteProductFromCart = () => {
    dispatch(deleteCartItem(data));
  };
  return (
    <Container>
      <Left>
        {/* <a href=""> */}
        <ProductImageSliderContainer>
          <ProductImage src={`${data?.img[0]}`} />
        </ProductImageSliderContainer>
        {/* </a> */}
      </Left>
      <Right>
        <RightContainer>
          <ProductInfoContainer>
            <ProductBrand>{data?.brand}</ProductBrand>
            <ProductName> {data?.productName}</ProductName>
          </ProductInfoContainer>

          <SizeAndQtyContainer onClick={interactable ? handleOpenDialog : null}>
            <SizeSelect>Size: {data?.selectedSize}</SizeSelect>
            <QtySelect>Qty: {data?.quantity}</QtySelect>
          </SizeAndQtyContainer>
          {showDialog && (
            <DialogBox
              title="Select Size & Quantity"
              quantity={data?.quantity}
              size={data?.selectedSize}
              sizes={data?.sizes}
              onClose={handleCloseDialog}
              id={data?.cartId}
            />
          )}
          <PriceContainer>
            <TotalPrice>
              $ {data?.price} x {data?.quantity} ={" "}
              {data?.price * data?.quantity}
            </TotalPrice>
          </PriceContainer>
          <Info>
            <MdLocalOffer /> Free delivery on This Product
          </Info>
        </RightContainer>
      </Right>
      {interactable && (
        <DeleteBtn onClick={interactable ? deleteProductFromCart : null} />
      )}
    </Container>
  );
};

export default CartItem;
