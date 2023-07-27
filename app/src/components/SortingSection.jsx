import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.section`
  width: 90%;
  border-bottom: 1px solid #eaeaec;
  padding-bottom: 5px;
`;
const SortContainer = styled.div`
  float: right;

  margin-bottom: 0;
  margin-top: -7px;
  position: relative;
  top: 5px;
`;
const SortBy = styled.div`
  padding: 9px 14px;
  font-size: 14px;
  color: #282c3f;
  cursor: pointer;
  position: relative;
  width: 255px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #d4d5d9;
`;
const SortingSection = () => {
  return (
    <Container>
      <Wrapper>
        <SortContainer>
          <SortBy>
            Sort By : <span>Recommend</span>
          </SortBy>
        </SortContainer>
      </Wrapper>
    </Container>
  );
};

export default SortingSection;
