import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { IMAGE_BASE_URL, publicRequest } from "../../requestMethod";

const AddProductModalContainer = styled.div`
  display: flex;
  flex-direction: column;
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
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  outline: none;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "500px", // Adjust the width as needed
  },
};

const EditProductModal = ({
  isOpen,
  onRequestClose,
  onEditProduct,
  product,
}) => {
  const [productData, setProductData] = useState({
    brand: product.brand,
    productName: product.productName,
    price: product.price,
    images: product.img,
    sizes: product.sizes,
    categories: product.categories,
    inStock: product.inStock,
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

    // Check if the total number of images exceeds 4
    if (productData.images.length + files.length > 4) {
      // Display an error message or handle the case appropriately
      return;
    }

    const newImages = [...productData.images];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages.push(reader.result);
        setProductData((prevData) => ({
          ...prevData,
          images: newImages,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAddProduct = () => {
    onEditProduct(productData);
    console.log(productData);

    onRequestClose();
  };
  const handleInStockChange = (e) => {
    const { checked } = e.target;
    setProductData({ ...productData, inStock: checked });
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDeleteImage = (index) => {
    const updatedImages = [...productData.images];
    updatedImages.splice(index, 1);
    setProductData({ ...productData, images: updatedImages });
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
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: "relative" }}
            >
              {image?.toString().includes("data") ? (
                <ImagePreview src={image} alt={`Product ${index + 1}`} />
              ) : (
                <ImagePreview
                  src={`${IMAGE_BASE_URL}/products/${image}`}
                  alt={`Product ${index + 1}`}
                />
              )}
              <DeleteButton
                visible={hoveredIndex === index}
                onClick={() => handleDeleteImage(index)}
              >
                Delete
              </DeleteButton>
            </div>
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
          {brands.map((brand) => (
            <BrandOption value={brand}>{brand}</BrandOption>
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
          {categories.map((category) => (
            <BrandOption value={category}>{category}</BrandOption>
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

export default EditProductModal;
