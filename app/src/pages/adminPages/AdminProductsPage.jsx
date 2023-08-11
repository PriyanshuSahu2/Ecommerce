import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/adminComponents/ProductCard";
import HeaderComponent from "../../components/HeaderComponent";
import { MdLibraryAdd } from "react-icons/md";
import { publicRequest, userRequest } from "../../requestMethod";
import AddProductModal from "../../components/adminComponents/AddProductModal";
import SidebarComponents from "../../components/adminComponents/SidebarComponents";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 960px;
  display: flex;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddProductButton = styled.button`
  font-weight: 600;
  cursor: pointer;
  background-color: #ff3e6c;
  border: none;
  color: #fff;
  display: flex;
  font-size: 18px;
  align-items: center;
  padding: 8px 15px;
`;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState("");
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await publicRequest("/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };
    getAllProducts();
  }, [updateItem]);

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
      return res.data.fileNames;
      // Handle the response from the server here
    } catch (error) {
      console.error("Error uploading images:", error);
      // Handle the error here
    }
  };

  const addProduct = async (data) => {
    const images = await uploadProductImages(data.images);
    const newProduct = {
      ...data,
      img: images,
    };
    try {
      const res = await userRequest.post("/products", newProduct);
      setUpdateItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addModalOpenClose = () => {
    setAddModalOpen(!addModalOpen);
  };
  return (
    <Container>
      <HeaderComponent />
      <Wrapper>
        <Left>
          <SidebarComponents />
        </Left>
        <Right>
          <Heading>
            All Products
            <AddProductButton onClick={addModalOpenClose}>
              <MdLibraryAdd />
              Add a Product
            </AddProductButton>
          </Heading>
          <AddProductModal
            isOpen={addModalOpen}
            onRequestClose={addModalOpenClose}
            onAddProduct={addProduct}
          />

          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              setUpdateItem={setUpdateItem}
            />
          ))}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default AdminProductsPage;
