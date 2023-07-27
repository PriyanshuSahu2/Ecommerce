import React from "react";
import { styled } from "styled-components";
import DealsComponent from "./DealsComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h4`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: #3e4152;
  letter-spacing: 0.15em;
  font-size: 1.8em;
  margin: 50px 0 10px 30px;
  max-height: 5em;
  font-weight: 700;
`;
const DealsSection = ({Data}) => {
  console.log(Data.Deal)
  return (
    <Container>
    
  <Title>{Data.Title}</Title>
    <DealsComponent  Deals = {Data.Deal}/>
    </Container>
  );
};

export default DealsSection;
