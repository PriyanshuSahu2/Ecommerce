import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Filter from "./Filter";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  width: 100%;
  flex: 1;
`;

const HeaderContainer = styled.div`
  position: relative;
  border-right: none !important;
  padding-top: 0;
  padding-bottom: 15px;
  padding-left: 25px;
  border-bottom: 1px solid #e9e9ed;
  background-color: #f8f8f8;
`;

const HeaderTitle = styled.span`
  line-height: normal;
  font-weight: 700;
  font-size: 16px;
  color: #333;
`;

// const ClearAllBtn = styled.span`
//   position: absolute;
//   top: 0;
//   right: 0;
//   font-weight: 700;
//   color: #ff3f6c;
//   font-size: 13px;
//   cursor: pointer;
// `;

const CategoryContainer = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 25px;
  border-bottom: 1px solid #e9e9ed;
  border-right: 1px solid #edebef;
`;

const FilterHeader = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
`;
const FilterSection = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
}) => {
  // const [selectedFilters, setSelectedFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await publicRequest("/categories/");
        setCategories(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(`ALl Categories ${err}`);
      }
    };
    const getBrands = async () => {
      try {
        const response = await publicRequest("/brands/");
        setBrands(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(`ALl Categories ${err}`);
      }
    };
    getCategories();
    getBrands();
  }, []);
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>FILTERS</HeaderTitle>
      </HeaderContainer>
      <CategoryContainer>
        <FilterHeader>CATEGORIES</FilterHeader>
        <CategoriesList>
          {categories?.map((item, idx) => (
            <Filter
              key={idx}
              Label={item}
              parentLabel={"Categories"}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
            />
          ))}
        </CategoriesList>
      </CategoryContainer>
      <CategoryContainer>
        <FilterHeader>BRAND</FilterHeader>
        <CategoriesList>
          {brands?.map((item, idx) => (
            <Filter
              key={idx}
              Label={item}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              parentLabel={"Brand"}
            />
          ))}
        </CategoriesList>
      </CategoryContainer>
    </Container>
  );
};

export default FilterSection;
