import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { publicRequest } from "../../requestMethod";

const AddProductModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const ModalHeading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ModalInput = styled.input`
  padding: 6px;
  margin-bottom: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  font-weight: 700;
  cursor: pointer;
  background-color: #03a685;
  border: 1px solid #03a685;
  color: #fff;
  padding: 6px 12px;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
`;

const CancelButton = styled.button`
  font-weight: 700;
  cursor: pointer;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;
  padding: 6px 12px;
  border-radius: 5px;
  outline: none;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ImageAddButton = styled.label`
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;

const BrandDropdown = styled.select`
  padding: 6px;
  margin-bottom: 10px;
`;

const BrandOption = styled.option``;

const InStockLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const InStockCheckbox = styled.input`
  margin-right: 5px;
`;

const customModalStyles = {
  content: {
    top: "50%",
    left: "60%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "500px", // Adjust the width as needed
    
  },
};

const AddProductModal = ({ isOpen, onRequestClose, onAddProduct }) => {
  const [productData, setProductData] = useState({
    brand: "",
    productName: "",
    price: "",
    images: [],
    sizes: [],
    categories: [],
    desc: "",
    inStock: true,
    zIndex: 100,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For the availableSizes field, we convert the input string to an array
    if (name === "sizes") {
      const sizesArray = value.split(",").map((size) => size.trim());
      setProductData({ ...productData, [name]: sizesArray });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesToAdd = files.slice(0, 4 - productData.images.length);

    imagesToAdd.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, reader.result],
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAddProduct = () => {
    onAddProduct(productData);
    setProductData({
      brand: "",
      productName: "",
      price: "",
      images: [],
      categories: [],
      sizes: [],
      desc: "",
      inStock: true,
    });
    onRequestClose();
  };
  const handleInStockChange = (e) => {
    const { checked } = e.target;
    setProductData({ ...productData, inStock: checked });
  };
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getBrands = async () => {
      const res = await publicRequest("/brands");
      setBrands(res.data);
    };
    const getCategories = async () => {
      const res = await publicRequest("/categories");
      setCategories(res.data);
    };
    getBrands();
    getCategories();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Product Modal"
      style={customModalStyles}
      
    >
      <AddProductModalContainer>
        <ModalHeading>Add Product</ModalHeading>
        <ImageContainer>
          {productData.images.map((image, index) => (
            <ImagePreview
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
            />
          ))}
          {productData.images.length < 4 && (
            <ImageAddButton>
              <ImageInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
              +
            </ImageAddButton>
          )}
        </ImageContainer>
        <BrandDropdown
          name="brand"
          value={productData.brand}
          onChange={handleInputChange}
          placeholder="Brand"
        >
          <BrandOption value="">Select a Brand</BrandOption>
          {brands?.map((brand, index) => (
            <BrandOption value={brand} key={brand + index}>
              {brand}
            </BrandOption>
          ))}
          {/* Add more brand options as needed */}
        </BrandDropdown>

        <BrandDropdown
          name="categories"
          value={productData.categories}
          onChange={handleInputChange}
          placeholder="Category"
        >
          <BrandOption value="">Select a Category</BrandOption>
          {categories?.map((category, index) => (
            <BrandOption value={category} key={category + index}>
              {category}
            </BrandOption>
          ))}
          {/* Add more brand options as needed */}
        </BrandDropdown>
        <ModalInput
          type="text"
          name="productName"
          value={productData.productName}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <ModalInput
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <ModalInput
          type="text"
          name="sizes"
          value={productData.sizes}
          onChange={handleInputChange}
          placeholder="Available Sizes (comma separated) (e.g. S,M,L)"
        />
        <ModalInput
          type="text"
          name="desc"
          value={productData.desc}
          onChange={handleInputChange}
          placeholder="Products Description"
        />
        <InStockLabel>
          <InStockCheckbox
            type="checkbox"
            name="inStock"
            checked={productData.inStock}
            onChange={handleInStockChange}
          />
          In Stock
        </InStockLabel>
        <ModalButtonContainer>
          <AddButton onClick={handleAddProduct}>Add</AddButton>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
        </ModalButtonContainer>
      </AddProductModalContainer>
    </Modal>
  );
};

export default AddProductModal;
