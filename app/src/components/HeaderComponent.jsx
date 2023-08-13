import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import "@fortawesome/react-fontawesome";

import SearchCommponent from "./SearchCommponent";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { PiHandbagLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { RiAdminLine } from "react-icons/ri";
import { logout } from "../redux/userRedux";
import { removeCart } from "../redux/cartRedux";
import Swal from "sweetalert2";
const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid #ff3e6c;
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
  color: #ff3e6c;
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

const UserIcon = styled(RiAdminLine)`
  font-size: 25px;
  margin: 0 20px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px; /* Adjust the distance from the user icon */
  right: 0;
  width: 200px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled(Link)`
  padding: 5px 10px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: black;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const HeaderComponent = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const [showSidebar, setShowSidebar] = useState(false);
  const menus = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menus.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    if (currentUser) {
      dispatch(logout());
      dispatch(removeCart());
      localStorage.clear();
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout Successful",
      });
    }
    
    navigate("/auth");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <Header>
      <Container>
        <Top>
          <Left ref={menus}>
            <HiMiniBars3BottomLeft
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            />
            <Sidebar showSidebar={showSidebar} />
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
            <UserIcon onClick={toggleDropdown} />

            {currentUser ? (
              <Dropdown isOpen={isDropdownOpen}>
                <DropdownItem to={"/user/" + currentUser?._id}>
                  Profile
                </DropdownItem>
                {currentUser.isAdmin && (
                  <DropdownItem to={"/admin"}>Admin</DropdownItem>
                )}
                <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
              </Dropdown>
            ) : (
              <Dropdown isOpen={isDropdownOpen}>
                <DropdownItem to={"/auth"}>Login</DropdownItem>
              </Dropdown>
            )}
          </Right>
        </Top>
        <Bottom></Bottom>
      </Container>
    </Header>
  );
};

export default HeaderComponent;
