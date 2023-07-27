import React from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import "@fortawesome/react-fontawesome";

import SearchCommponent from "./SearchCommponent";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { PiHandbagLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid  #FF3E6C;
`;
const Container = styled.div``;
const Top = styled(Col)`
  display: flex;
  background-color: white;
  justify-content: space-between;
  padding: 5px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  font-size: 25px;
  align-items: center;
  margin: 0px 20px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  font-size: 25px;
  align-items: center;
  margin: 0px 20px;
  text-align: center;
  justify-content: space-between;
`;
const Middle = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.span`
  font-family: "Akronim", cursive;
  font-size: 30px;
  letter-spacing: 5px;
  color:  #FF3E6C;
`;
const CartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
  text-decoration: none;
`;
const Bottom = styled.div``;
const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 5px;
  font-size: 14px;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CartIcon = styled(PiHandbagLight)`
  color: black !important;
`;
const HeaderComponent = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);

  return (
    <Header>
      <Container>
        <Top>
          <Left>
            <HiMiniBars3BottomLeft />
          </Left>
          <Middle>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Logo>MarketHub</Logo>
            </Link>
          </Middle>
          <Right className="justify-content-md-end">
            <SearchCommponent />
            <Link to="/cart">
              <CartButton>
                <CartIcon />
                <Badge>{cartQuantity}</Badge>{" "}
              </CartButton>
            </Link>
          </Right>
        </Top>
        <Bottom></Bottom>
      </Container>
    </Header>
  );
};

export default HeaderComponent;
