// AllUserPage.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserCard from "../../components/adminComponents/UserCard";
import HeaderComponent from "../../components/HeaderComponent";
import { userRequest } from "../../requestMethod";
import SidebarComponents from "../../components/adminComponents/SidebarComponents";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 20px;
`;
const PageHeader = styled.h2`
  color: #282c3f;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const FieldHeader = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding: 10px 0;
`;

const UsersContainer = styled.div`
  margin-top: 20px;
`;

const FieldHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  text-align: center;
  padding: 0 30px;
  background-color: #000000;
  border-radius: 5px;
`;

const AllUserPage = () => {
  const [users, setUsers] = useState([]);
  const [update,setUpdate] = useState("");
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await userRequest("/user/getAllUser");
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };
    getAllUsers();
  }, [update]);

  return (
    <Container>
      <HeaderComponent />
      <Wrapper>
        <Left>
          <SidebarComponents />
        </Left>
        <Right>
          <PageHeader>All Users</PageHeader>
          <FieldHeaderContainer>
            <FieldHeader>ID</FieldHeader>
            <FieldHeader>Name</FieldHeader>
            <FieldHeader>Role</FieldHeader>
            <FieldHeader>Email</FieldHeader>
            <FieldHeader>Edit/Delete</FieldHeader>
          </FieldHeaderContainer>
          <UsersContainer>
            {users.map((user) => (
              <UserCard key={user._id} user={user} setUpdate={setUpdate}/>
            ))}
          </UsersContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default AllUserPage;
