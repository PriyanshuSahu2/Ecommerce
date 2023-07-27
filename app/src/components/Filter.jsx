import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
`;

const CheckBox = styled.input`
  margin: 0 16px 0 0;
  padding: 10px;
  height: 16px;
  width: 16px;
`;

const Labels = styled.span`
  font-size: 14px;
  display: inline-block;
`;

const Filter = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  Label,
  parentLabel,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [filters, setFilters] = useState("");
  useEffect(() => {
    console.log(filters);
  },[]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriesFromUrl = urlParams.get("Categories");
    const brandsFromUrl = urlParams.get("Brand");

    if (categoriesFromUrl) {
      const filtersArray = categoriesFromUrl.split(",");
      setSelectedCategories(filtersArray);
    } else {
      setSelectedCategories([]);
    }

    if (brandsFromUrl) {
      const filtersArray = brandsFromUrl.split(",");
      setSelectedBrands(filtersArray);
    } else {
      setSelectedBrands([]);
    }
  }, [isChecked]);

  useEffect(() => {
    if (Label === "Categories") {
      setIsChecked(selectedCategories.includes(Label));
    }
  }, [selectedCategories, Label]);

  useEffect(() => {
    if (Label === "Brand") {
      setIsChecked(selectedBrands.includes(Label));
    }
  }, [selectedBrands, Label]);

  const applyFilter = (event) => {
    const currentURL = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentURL.search);
    setIsChecked(event.target.checked);
    const filterValue = Label;
    const existingFilters = searchParams.get(parentLabel) || "";
    const filtersArray = existingFilters.split(",").filter(Boolean);

    if (event.target.checked) {
      filtersArray.push(filterValue);
    } else {
      const index = filtersArray.indexOf(filterValue);
      if (index !== -1) {
        filtersArray.splice(index, 1);
      }
    }

    searchParams.set(parentLabel, filtersArray.join(","));
    // Remove the parent label if all filters for that label are deselected
    if (filtersArray.length === 0) {
      searchParams.delete(parentLabel);
    }

    currentURL.search = searchParams.toString();
    window.history.pushState({ path: currentURL.href }, "", currentURL.href);
  };

  return (
    <Container>
      <CheckBox type="checkbox" checked={isChecked} onChange={applyFilter} />
      <Labels>{Label}</Labels>
    </Container>
  );
};

export default Filter;
