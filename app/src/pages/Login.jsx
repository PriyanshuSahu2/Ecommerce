import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/userRedux";
import { Button, Form, Image } from "react-bootstrap";
import ShoppingCart from "../images/shopping-cart.png";
import LoadingBar from "../components/Loadings/LoadingBar";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 600px;
  border-radius: 10px;
  background-color: #f7f7f7;
`;

const Left = styled.div`
  flex: 1;
  border-radius: 10px 0px 0px 10px;
  background-color: #ff3f6c; /* Updated to primaryColor */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: larger;
  color: white;
`;

const Right = styled.div`
  flex: 2;
  border-radius: 0px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;

const CustomForm = styled(Form)`
  padding: 30px;
`;

const StyledFormControl = styled(Form.Control)`
  margin-top: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #ff3f6c; /* Updated to primaryColor on focus */
    box-shadow: 0 0 0 0.2rem rgba(255, 63, 108, 0.25); /* Updated to primaryColor shadow on focus */
  }
`;

const SubmitButton = styled(Button)`
  background-color: #ff3f6c; /* Updated to primaryColor */
  border: none;
  margin-top: 20px;
  width: 100px;
  height: 40px;

  &:hover {
    background-color: #ff2e5a; /* Slightly darker shade for hover effect */
  }
`;

const LoginLink = styled.p`
  margin-top: 20px;
  text-align: left;
  font-weight: 500;
  color: #555;
  & > span {
    color: #ff3f6c; /* Updated to primaryColor */
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const ShoppingImage = styled(Image)`
  object-fit: contain;
  margin-top: 20px;
  width: 50%;
`;
const ForgotPasswordLink = styled(LoginLink)`
  text-align: end;
  margin-top: 10px;
`;
const Login = ({ handleToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Perform login logic here
    await login(dispatch, { email, password });
    setLoading(false);
  };

  return (
    <Wrapper>
      <Left>
        <h1>Welcome Back</h1>
        <ShoppingImage src={ShoppingCart} fluid />
      </Left>
      <Right>
        <CustomForm onSubmit={handleLogin}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
            Login
          </h2>
          <StyledFormControl
            type="text"
            placeholder="Email or Username"
            onChange={(e) => setEmail(e.target.value)}
            id="loginIdentifier"
            name="loginIdentifier"
          />
          <StyledFormControl
            type="password"
            placeholder="Password"
            hint="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <div className="d-flex justify-content-between">
            <SubmitButton variant="dark" type="submit">
              {loading ? <LoadingBar /> : "Login"}
            </SubmitButton>
            <ForgotPasswordLink>
              <Link to={"/auth/forgot-password"}>Forgot your Password?</Link>
            </ForgotPasswordLink>
          </div>
          <LoginLink>
            Don't have an account? <span onClick={handleToggle}>Register</span>
          </LoginLink>
        </CustomForm>
      </Right>
    </Wrapper>
  );
};

export default Login;
