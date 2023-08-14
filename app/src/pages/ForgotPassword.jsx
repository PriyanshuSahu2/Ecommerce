import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { BsQuestionDiamond } from "react-icons/bs";
import LoadingBar from "../components/Loadings/LoadingBar";
import HeaderComponent from "../components/HeaderComponent";
import { publicRequest } from "../requestMethod";
import LoadingClip from "../components/Loadings/LoadingClip";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  overflow: hidden;
  height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 600px;
  border-radius: 10px;
  margin-top: 150px;
  background-color: #f7f7f7;
`;

const Left = styled.div`
  flex: 2;
  border-radius: 10px 0px 0px 10px;
  background-color: #ff3f6c; /* Updated to primaryColor */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: medium;
`;

const Right = styled.div`
  flex: 3;
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
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleGetVerificationCode = async () => {
    setVerificationLoading(true);
    try {
      const res = await publicRequest.post("/user/send-otp", {
        email: email,
      });
      console.log(res);
      setVerificationStatus(res.data);
      if (res.status === 200) {
        setIsCodeSent(true);
      }
    } catch (error) {
      console.log(error);
      setVerificationStatus(error.response.data.error);
    }
    setVerificationLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/user/reset-password", {
        email: email,
        password: password,
        verificationCode: verificationCode,
      });
      await Swal.fire({
        icon: "success",
        title: "Reset Successful",
        text: res.data.message,
      });
      handleToggle();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "success",
        title: "Reset Failed",
        text: error.response.data.error,
      });
    }
  };
  const navigate = useNavigate();
  const handleToggle = () => {
    navigate("/auth", { replace: true });
  };
  return (
    <Container>
      <HeaderComponent />
      <Wrapper>
        <Left>
          <h1>Forgot Password?</h1>
          <BsQuestionDiamond fontSize={100} />
        </Left>
        <Right>
          <CustomForm onSubmit={handleReset}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
              Forgot Your Password?
            </h2>
            <EmailInput>
              <StyledFormControl
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            )}
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
                {loading ? <LoadingBar /> : "Change"}
              </SubmitButton>
            </div>
            <LoginLink>
              Did You Remember Your Password?{" "}
              <span onClick={handleToggle}>Login</span>
            </LoginLink>
          </CustomForm>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
