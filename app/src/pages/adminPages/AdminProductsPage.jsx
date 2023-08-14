import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/adminComponents/ProductCard";
import HeaderComponent from "../../components/HeaderComponent";
import { MdLibraryAdd } from "react-icons/md";
import { publicRequest, userRequest } from "../../requestMethod";
import AddProductModal from "../../components/adminComponents/AddProductModal";
import SidebarComponents from "../../components/adminComponents/SidebarComponents";
import AdminProductCard from "../../components/SkeletonsComponents/AdminProductCard";
import { toast } from "react-toastify";

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
const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.isActive ? "#ff3e6c" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  cursor: pointer;
`;
const PageNumber = styled.span`
  color: #666;
`;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState("");
  const itemsPerPage = 3;
  const [loading, setLoading] = useState(false);
  //pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await publicRequest("/products");
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
    setLoading(true);

    try {
      const images = await uploadProductImages(data.images);
      const newProduct = {
        ...data,
        img: images,
      };
      const res = await userRequest.post("/products", newProduct);
      setUpdateItem(res.data);
      setLoading(false);
      toast.success("Product added Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
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
            <AddProductButton onClick={() => setAddModalOpen(true)}>
              <MdLibraryAdd />
              Add a Product
            </AddProductButton>
          </Heading>
          <AddProductModal
            isOpen={addModalOpen}
            onRequestClose={() => setAddModalOpen(false)}
            onAddProduct={addProduct}
            setLoading={setLoading}
          />
          {loading && <AdminProductCard />}
          {currentProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              setUpdateItem={setUpdateItem}
            />
          ))}
          <PaginationControls>
            <PaginationButtons>
              <PaginationButton
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              {pageNumbers.map((number) => (
                <PaginationButton
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  isActive={number === currentPage}
                >
                  {number}
                </PaginationButton>
              ))}
              <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </PaginationButtons>
            <PageNumber>
              Page {currentPage} of {totalPages}
            </PageNumber>
          </PaginationControls>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default AdminProductsPage;
