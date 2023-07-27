import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { login } from "../redux/userRedux";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  justify-content: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    login(dispatch, { email, password });
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      <hr />
      <Button onClick={null}>Submit</Button>
    </Wrapper>
  );
};

export default Login;
