import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  margin-right: 30px;
  border: ${(props) =>
    props.isFocused ? "1px solid #9595a081" : "none"};
  border-radius: 5px;
  max-width: 300px;
  width: 300px;
  background-color: ${(props) =>
    props.isFocused ? "#FFFFF" : "#f5f5f6"};
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  border: none;
  font-size: 14px;
  font-family: inherit;
  font-weight: 100;
  height: 10px;
  background-color: inherit;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: inherit;
  width: 30px;
`;

const Icons = styled(FontAwesomeIcon)`
  height: 15px;
  width: 15px;
  color: #717288;
  text-align: center;
  margin-left: 10px;
`;

const SearchComponent = () => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Perform search action or navigate to another page with the search value
    const url = `/allProducts?search=${searchValue}`;
    window.location.href = url;
  };

  return (
    <Container className="d-md-flex" isFocused={isInputFocused}>
      <Button onClick={handleSearch}>
        <Icons icon={faSearch} />
      </Button>
      <InputField
        placeholder="Search for product"
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
        value={searchValue}
        onChange={handleInputChange}
      />
    </Container>
  );
};

export default SearchComponent;
