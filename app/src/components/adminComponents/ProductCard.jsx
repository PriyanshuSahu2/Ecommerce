import React, { useState } from "react";
import styled from "styled-components";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBack2Line } from "react-icons/ri";
import {

  publicRequest,
  userRequest,
} from "../../requestMethod";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EditProductModal from "./EditProductModal";
import { toast } from "react-toastify";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
  min-width: 960px;
  border-bottom: 1px solid gray;
`;

const ProductImageContainer = styled.div`
  flex: 1;
  max-width: 350px;
  width: 350px;
  padding: 10px;
  margin-right: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductDescriptionContainer = styled.div`
  flex: 2;
`;

const ProductBrandTitle = styled.h1`
  color: #282c3f;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const ProductTitle = styled.h2`
  color: #535665;
  font-size: 18px;
  opacity: 0.8;
  font-weight: 400;
  margin: 0;
  margin-bottom: 5px;
`;

const ProductCategory = styled.h4`
  color: #03a685;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const ProductID = styled.p`
  color: #7e818c;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const ProductSizeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Header = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const AllSizeButtonsContainer = styled.div`
  display: flex;
`;

const SizeBtn = styled.button`
  border: 1px solid #ff3f6c;
  background-color: ${(props) => (props.isselected ? "#ff3f6c" : "white")};
  color: ${(props) => (props.isselected ? "white" : "#ff3f6c")};
  font-weight: 700;
  border-radius: 50px;
  padding: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 0 5px;
`;

const ProductActionsContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ActionBtn = styled.button`
  font-weight: 700;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#ff3e6c" : "white")};
  border: 1px solid #ff3e6c;
  color: ${(props) => (props.primary ? "#fff" : "#ff3e6c")};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-right: 3%;
  outline: none;
  width: 200px;
  &:hover {
    border: 1px solid #ff3e6c;
  }
`;

const AddToBagIcon = styled(TbEdit)`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const DeleteIcon = styled(RiDeleteBack2Line)`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const BtnLabel = styled.span`
  font-weight: 700;
`;
const ProductCard = ({ product, setUpdateItem }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const uploadProductImages = async (images) => {
    const formData = new FormData();

    try {
      // Convert each image URL to a Blob using async/await
      for (const image of images) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("images", blob, "image.png");
      }

      const res = await publicRequest.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the correct Content-Type header
        },
      });

      console.log(res.data);
      setUpdateItem(res.data);
      return res.data.fileNames;
      // Handle the response from the server here
    } catch (error) {
      console.error("Error uploading images:", error);
      // Handle the error here
    }
  };

  const getImages = async (data) => {
    const images = data.images.filter((image) => image.includes("data"));
    const filteredImages = data.images.filter(
      (image) => !image.includes("data")
    );
    if (images.length === 0) {
      return filteredImages;
    }
    const newImages = await uploadProductImages(images);

    const mergedImages = [...newImages, ...filteredImages];
    return mergedImages;
  };
  const editProduct = async (data) => {
    try {
      if (data.images.includes("data")) {
        console.log(data);
      }
      const images = await getImages(data);
      console.log(images);
      const res = await userRequest.put(`/products/${product._id}`, {
        ...data,
        img: images,
      });
      setUpdateItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await userRequest.delete("/products/" + product._id);
      setUpdateItem(res.data);
      toast.success(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const editModalOpenClose = () => {
    setEditModalOpen(!editModalOpen);
  };
  return (
    <Container>
      <Wrapper>
        <ProductImageContainer>
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            showIndicators={true}
            showStatus={true}
          >
            {product?.img.map((image, index) => (
              <div key={index}>
                <ProductImage src={image} alt={`Product ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </ProductImageContainer>
        <EditProductModal
          isOpen={editModalOpen}
          onRequestClose={editModalOpenClose}
          onEditProduct={editProduct}
          product={product}
        />
        <ProductDescriptionContainer>
          <ProductBrandTitle>{product?.brand}</ProductBrandTitle>
          <ProductTitle>{product?.productName}</ProductTitle>
          <ProductCategory>{`${product?.categories}`}</ProductCategory>
          <ProductID>Product ID: {product?._id}</ProductID>
          <Price>${product?.price}</Price>

          <ProductSizeSelectContainer>
            <Header>AVAILABLE SIZE</Header>
            <AllSizeButtonsContainer>
              {product?.sizes.map((size) => (
                <SizeBtn>{size}</SizeBtn>
              ))}
            </AllSizeButtonsContainer>
          </ProductSizeSelectContainer>

          {/* Add product description content here */}
        </ProductDescriptionContainer>
        <ProductActionsContainer>
          <ActionBtn primary onClick={editModalOpenClose}>
            <AddToBagIcon />
            <BtnLabel>Edit Product</BtnLabel>
          </ActionBtn>
          <ActionBtn onClick={handleDelete}>
            <DeleteIcon />
            <BtnLabel>Delete</BtnLabel>
          </ActionBtn>
        </ProductActionsContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductCard;
