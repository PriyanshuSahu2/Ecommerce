import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Data = styled.div`
  font-size: 24px;
  color: #007bff;
`;

const LabelData = ({ label, value, to }) => {
  return (
    <Container to={to}>
      <Label>{label}</Label>
      <Data>{value}</Data>
    </Container>
  );
};

export default LabelData;
