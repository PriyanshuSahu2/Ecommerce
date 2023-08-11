import React, { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import Swal from "sweetalert2";
import { Button, Form, Image } from "react-bootstrap";
import ShoppingCart from "../images/shopping-cart.png";
import LoadingBar from "../components/Loadings/LoadingBar";
import LoadingClip from "../components/Loadings/LoadingClip";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Left = styled.div`
  flex: 1;
  border-radius: 10px 0px 0px 10px;
  background-color: #ff3f6c;
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
`;

const CustomForm = styled(Form)`
  padding: 30px;
`;

const StyledFormControl = styled(Form.Control)`
  margin-top: 20px;
`;

const SubmitButton = styled(Button)`
  background-color: #ff3f6c;
  border: none;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  &:hover {
    background-color: #068ddb;
  }
`;

const ShoppingImage = styled(Image)`
  object-fit: contain;
  margin-top: 20px;
  width: 50%;
`;
const LoginLink = styled.p`
  margin-top: 20px;
  text-align: left;
  font-weight: 500;
  & > span {
    color: #ff3f6c;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const EmailInput = styled.div`
  width: 100%;
  position: relative;
  ${StyledFormControl} {
    padding-right: 80px;
  }
`;
const VerificationSpan = styled.span`
  color: #ff0a33;
  position: absolute;
  right: 10px;
  top: 50%; /* Vertically center the link */
  transform: translateY(-50%);
  cursor: pointer;
`;
const VerificationMessage = styled.p`
  color: #0ca9f1;
`;
const Signup = ({ handleToggle }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    verificationCode: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (
      !formData.name &&
      !formData.email &&
      !formData.mobileNumber &&
      !formData.password &&
      !formData.confirmPassword
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
    }
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
    }
    setLoading(true);
    try {
      const res = await publicRequest.post("/user/signup", formData);
      console.log(res);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleGetVerificationCode = async () => {
    setVerificationLoading(true);
    try {
      const res = await publicRequest.post("/user/send-otp", {
        email: formData.email,
      });
      console.log(res);
      setVerificationStatus(res?.data);
      if (res.status === 200) {
        setIsCodeSent(true);
      }
    } catch (error) {
      console.log(error);
      setVerificationStatus(error.response.data.error);
    }
    setVerificationLoading(false);
  };
  return (
    <Wrapper>
      <Left>
        <h1>Join Us</h1>
        <ShoppingImage src={ShoppingCart} fluid />
      </Left>
      <Right>
        <CustomForm onSubmit={handleSignup}>
          <h2 style={{ fontSize: "40px", fontWeight: "700" }}>Register</h2>
          <StyledFormControl
            type="text"
            placeholder="Full Name"
            id="fullName"
            name="fullName" // Add the name attribute here
            onChange={handleChange} // Apply the handleChange function
          />
          <EmailInput>
            <StyledFormControl
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
            />
            {!isCodeSent && (
              <VerificationSpan
                onClick={handleGetVerificationCode}
                isVerificationCodeSent={verificationLoading}
              >
                {verificationLoading ? <LoadingClip size={15} /> : "Get OTP"}
              </VerificationSpan>
            )}
          </EmailInput>
          <VerificationMessage>{verificationStatus}</VerificationMessage>
          {isCodeSent && (
            <StyledFormControl
              type="number"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter Verification Code"
              title="Verification Code"
              onChange={handleChange}
            />
          )}
          <StyledFormControl
            type="password"
            placeholder="Password"
            hint="At least 8 characters"
            id="password"
            name="password" // Add the name attribute here
            onChange={handleChange} // Apply the handleChange function
          />
          <StyledFormControl
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword" // Add the name attribute here
            onChange={handleChange} // Apply the handleChange function
          />
          <SubmitButton variant="dark" type="submit">
            {loading ? <LoadingBar /> : "Register"}
          </SubmitButton>
          <LoginLink>
            Already have an account? <span onClick={handleToggle}>Login</span>
          </LoginLink>
        </CustomForm>
      </Right>
    </Wrapper>
  );
};

export default Signup;
