import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: space-between;
`;

const Copyright = styled.span`
  text-align: center;
  color: black;
`;
const Container = styled.div`
  padding-bottom: 1rem;
  width: 100%;
  background-color: #f6f2ee;
  margin-top: auto;
  
`;
const FooterComponent = () => {
  return (
    <Container className="container-fluid">
      <Wrapper className="row mx-md-5">
        <hr />
        <Copyright>&copy; 2023 My Website. All Rights Reserved.</Copyright>
      </Wrapper>
    </Container>
  );
};

export default FooterComponent;
