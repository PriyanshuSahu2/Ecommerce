import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;
const Header = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin: 24px 0 16px;
  color: #535766;
`;
const OrderSummary = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;
const Items = styled.div`

`;
const Label = styled.span`
  float: left;
`;
const Value = styled.span`
  float: right;
`;
const PriceDetails = () => {
  return (
    <Container>
      <Header>Price Details (1 Item)</Header>
      <OrderSummary>
        <Items>
          <Label>Total MRP</Label>
          <Value>$69999</Value>
        </Items>
      </OrderSummary>
    </Container>
  );
};

export default PriceDetails;
