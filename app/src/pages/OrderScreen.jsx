import React from "react";

import { styled } from "styled-components";
import CartItem from "../components/CartItem";
import HeaderComponent from "../components/HeaderComponent";
import { useSelector } from "react-redux";
import { GiConfirmed } from "react-icons/gi";

const Wrapper = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 0 10px 16px;
  min-height: 320px;
  color: #282c3f;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemSectionContainer = styled.div`
  display: inline-block;
  width: 64%;
  padding-right: 20px;
  border-right: 1px solid #eaeaec;

`;

const Summary = styled.div`
  flex: 1;
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
`;

const PaymentContainer = styled.div`
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Hr = styled.hr`
  background-color: #080808;
  border: none;
  height: 1px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const OrderSummaryContainer = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const PaymentSelect = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;
const OrderConfirmationContainer = styled.div`
  width: 980px;
  height: 200px;

  margin:10px;
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const ConfirmationIcon = styled(GiConfirmed)`
  width: 50px;
  height: 50px;
  color: #03a685;
  margin-top: 10px;
`;
const StatusText = styled.span`
  color: #03a685;
  font-weight: 700;
  font-size: 32px;

`;
const StatusDesc = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #282c3f;
  text-align: center;
`
const OrderScreen = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <>
      <HeaderComponent />
      <Container>
        <OrderConfirmationContainer>
          <ConfirmationIcon />
          <StatusText>Order Confirmed</StatusText>
          <StatusDesc>Your order is confirmed. 
            <br></br>You will receive confirmation E-mail/SMS shortly with expected delivery date for your items.</StatusDesc>
        </OrderConfirmationContainer>
        <Wrapper>
          <ItemSectionContainer>
            {cartProducts.map((item) => {
              console.log(item);
              return <CartItem data={item} />;
            })}
          </ItemSectionContainer>

          <OrderSummaryContainer>
          <PaymentContainer>
              <Title>PAYMENT STATUS</Title>
              <PaymentSelect>
                <span>PayPal</span>
                <span>Pending</span>
              </PaymentSelect>
            </PaymentContainer>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs. {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs. 40</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -40</SummaryItemPrice>
              </SummaryItem>
              <Hr />
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs. {totalPrice}</SummaryItemPrice>
              </SummaryItem>
            </Summary>


          </OrderSummaryContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default OrderScreen;
