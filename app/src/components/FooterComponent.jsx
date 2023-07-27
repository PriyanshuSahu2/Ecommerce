import React from "react";
import styled from "styled-components";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";
import { Container } from "react-bootstrap";

const FooterContainer = styled.footer`
  background-color: #f6f2ee;
  padding-top: 5rem;
  padding-bottom: 1rem;
  width: 100%;
`;

const Wrapper = styled.div`
justify-content: space-between;
`;
// const FooterContent = styled.div`
//   color: #fff;
//   text-align: center;
// `;

const SectionHeading = styled.h2`
  font-size: 16px;
  letter-spacing: 1.1px;
  font-weight: 700;
  text-align: start;
  text-transform: uppercase;
  color: black;
`;

const SectionText = styled.p`
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 200;
  text-align: start;
  text-transform: uppercase;
  color:black;
`;

const FormInput = styled.input`
  width: 75%;
  border-radius: 0;
  margin: 2px 0;
`;

const SignUpButton = styled.button`
  width: 50%;
  border-radius: 0;
  margin: 1px 0;
  padding: 0.5rem 0;
  text-align: start;
  color: #fff;
  background-color: #FE778C;
`;

// const LinksList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   text-align: start;
// `;

const ListItem = styled.li`
  margin-bottom: 5px;
  color: black;
`;

const ContactList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: start;
`;

const SocialMediaList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SocialMediaIcon = styled.a`
  color: black;
  margin-right: 10px;

`;

const Links = styled.a`
    color: inherit;
`
const Copyright = styled.span`
    text-align: center;
    color: black;
`
const FooterComponent = () => {
  return (
    <FooterContainer>
      <Container className="container-fluid">
        <Wrapper className="row mx-md-5">
          <div className="col-md-6 col-lg-3 col-sm-12">
            <SectionHeading>BE Connected.</SectionHeading>
            <SectionText>sign up for mails</SectionText>
            <div className="form-group d-flex align-items-right flex-column justify-content-evenly">
              <FormInput
                type="email"
                className="form-control w-75 form-control-lg rounded-0 my-2"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
              <SignUpButton className="btn btn-lg rounded-0 w-50  my-1 py-2 text-start text-light primary-bg-color">
                Sign up
              </SignUpButton>
            </div>
            <div className="row"></div>
          </div>

          <div className="col-md-6 col-lg-3 col-sm-12">
            <div
              className="d-flex justify-content-between align-items-center"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#contact-collapse"
              aria-expanded="true"
              aria-controls="contact-collapse"
            >
              <SectionHeading className="btn btn-link btn-block d-md-none py-sm-3">
                Contact us.
              </SectionHeading>
              <p className="text-right d-sm-inline d-md-none">
                <i className="fa-solid fa-caret-down"></i>
              </p>
            </div>
            <div className="collapse d-md-block" id="contact-collapse">
              <ContactList>
              <SectionHeading>
                    CONTACT US.
                </SectionHeading>
                <ListItem>
                  <Links href="#" className="footer-li-style ">
                    Customer Services
                  </Links>
                </ListItem>
                <br />
                <ListItem>
                  <Links href="#" className="footer-li-style">
                    help@ecommerce.com
                  </Links>
                </ListItem>
                <br />
                <ListItem>
                  <Links href="#" className="footer-li-style">
                    +91-880xxxxxxx1
                  </Links>
                </ListItem>
              </ContactList>
            </div>
            <hr
              className="d-sm-block d-md-none"
              style={{ border: "2px solid gray" }}
            />
          </div>

          <div className="col-md-6 col-lg-3 col-sm-12 py-2">
            <SectionHeading>Social Medias.</SectionHeading>
            <SocialMediaList>
              <SocialMediaIcon href="#">
                <FaFacebook className="footer-li-style fs-2" />
              </SocialMediaIcon>
              <SocialMediaIcon href="#">
                <FaTwitter className="footer-li-style fs-2" />
              </SocialMediaIcon>
              <SocialMediaIcon href="#">
                <FaInstagram className="footer-li-style fs-2" />
              </SocialMediaIcon>
              <SocialMediaIcon href="#">
                <FaLinkedin className="footer-li-style fs-2" />
              </SocialMediaIcon>
              <SocialMediaIcon href="#">
                <FaReddit className="footer-li-style fs-2" />
              </SocialMediaIcon>
            </SocialMediaList>
          </div>

          <hr />
          <Copyright>
            &copy; 2023 My Website. All Rights Reserved.
          </Copyright>
        </Wrapper>
      </Container>
    </FooterContainer>
  );
};

export default FooterComponent;
