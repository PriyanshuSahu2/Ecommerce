import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Images = styled.img`
  margin: 10px 10px;
  &:hover{
    cursor: pointer;
  }
`;
const DealsComponent = ({ Deals }) => {
  const Redirect = (link) => {
    // window.location.replace(link);
  };

  return (
    <Container>
      {Deals.map((item, idx) => (
    
        <Images src={item.src} onClick={()=>{Redirect(item.redirect)}}/>
      ))}
    </Container>
  );
};

export default DealsComponent;
