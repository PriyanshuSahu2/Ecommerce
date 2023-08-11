import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #222;
  color: white;
  height: 100%;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 15px 20px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #333;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const SidebarComponents = () => {
  return (
    <SidebarWrapper>
      <Logo>Admin Dashboard</Logo>
      <NavList>
        <NavItem>
          <NavLink to="/admin">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/products">Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/users">Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/Orders">Orders</NavLink>
        </NavItem>
      </NavList>
    </SidebarWrapper>
  );
};

export default SidebarComponents;
