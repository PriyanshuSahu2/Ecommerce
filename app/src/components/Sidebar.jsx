import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { logout } from "../redux/userRedux";
import { removeCart } from "../redux/cartRedux";
const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  z-index: 99;
  display: flex;
  flex-direction: column;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-100%")};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  width: 250px;
  background-color: #ffffff;
  transition: transform 0.3s ease-in-out;
  padding: 0.9rem 2rem;
  overflow-y: auto; /* Enable vertical scrolling */
  font-family: ui-serif;
  border-right: 1px solid #ff3e6c;
`;

const SidebarHeading = styled.h3`
  font-size: 18px; /* Updated font size for headings */
  color: #ff3e6c;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-top: 15px;
  line-height: 1.3; /* Adjusted line height */
`;

const SidebarItem = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #000000;
  font-weight: 500;
  margin-bottom: 8px; /* Reduced margin for items */
  padding: 8px 0; /* Added padding for better spacing */
  &:hover {
    background-color: #f2f2f2;
    border-radius: 5px;
  }
`;

const LogoutBtn = styled.button`
  font-weight: 700;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#ff3e6c" : "white")};
  border: 1px solid #ff3e6c;
  color: ${(props) => (props.primary ? "#fff" : "#ff3e6c")};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  outline: none;
  padding: 5px;
  margin-top: auto;
  &:hover {
    border: 1px solid #ff3e6c;
    background-color: #ff3e6c;
    color: white;
  }
`;

const LogoutIcon = styled(FiLogOut)`
  width: 30px;
  height: 30px;
  font-weight: 800;
  margin-right: 10px;
`;
const BtnLabel = styled.span`
  font-weight: 700;
`;

const Sidebar = ({ showSidebar }) => {
  const id = useSelector((state) => state?.user?.currentUser?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    if (id) {
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
  return (
    <SidebarContainer className="p-0" open={showSidebar}>
      <h3
        style={{ color: "#FF3E6C", fontSize: "40px" }}
        className=" m-0 
                px-4 py-3"
      >
        MarketHub
      </h3>
      <hr style={{ color: "#FF3E6C", marginTop: "5px" }} />
      <SidebarHeading>Pages</SidebarHeading>
      <div className="px-5 text-left d-flex flex-column">
        <SidebarItem to="/">Home</SidebarItem>
        <SidebarItem to="/allProducts">Products</SidebarItem>
        <SidebarItem to="/">Cart</SidebarItem>
        <SidebarItem to={"/user/" + id}>User Profile</SidebarItem>
        <SidebarItem to={"/orders/" + id}>Orders</SidebarItem>
      </div>
      <SidebarHeading>Mens Categories</SidebarHeading>
      <div className="px-5 text-left d-flex flex-column">
        <SidebarItem to="/allProducts?Categories=TShirt">T-Shirt</SidebarItem>
        <SidebarItem to="/allProducts?Categories=Shirt">Shirt</SidebarItem>
        <SidebarItem to="/allProducts?Categories=Pants">Pants</SidebarItem>
        <SidebarItem to="/allProducts?Categories=Shoes">Shoes</SidebarItem>
        <SidebarItem to="/allProducts?Categories=Jeans">Jeans</SidebarItem>
      </div>
      <LogoutBtn onClick={handleLogOut}>
        <LogoutIcon />
        <BtnLabel>{id ? "Logout" : "Login"}</BtnLabel>
      </LogoutBtn>
    </SidebarContainer>
  );
};

export default Sidebar;
