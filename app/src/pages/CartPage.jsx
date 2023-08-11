import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";
import AddressStripComponent from "../components/AddressStripComponent";
import CartItem from "../components/CartItem";
import HeaderComponent from "../components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import AddressDialogBox from "../components/AddressDialogBox";
import { userRequest } from "../requestMethod";

import { useNavigate } from "react-router-dom";
import { deleteCart } from "../redux/cartRedux";
import CartItemSkeleton from "../components/SkeletonsComponents/CartItemSkeleton";
import AddressStripSkeleton from "../components/SkeletonsComponents/AddressStripSkeleton";

const Wrapper = styled.div`
  margin: auto;
  padding: 0 10px 16px;
  min-height: 320px;
  color: #282c3f;
  display: flex;
`;

const ItemSectionContainer = styled.div`
  display: inline-block;
  width: 60%;
  padding-right: 20px;
  border-right: 1px solid #eaeaec;
  padding-top: 32px;
`;

const Summary = styled.div`
  flex: 1;
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
`;

const PaymentContainer = styled.div`
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Hr = styled.hr`
  background-color: #080808;
  border: none;
  height: 1px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const OrderSummaryContainer = styled.div`
  width: 40%;
  margin-left: 10px;
  margin-top: 30px;
`;

const PaymentSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &.vibrate {
    animation: vibrateAnimation 0.3s infinite linear;
    background-color: black;
    color: white;
  }

  @keyframes vibrateAnimation {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [address, setAddress] = useState({});
  const [onAddressChange, setOnAddressChange] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await userRequest("/address/");
        setAddress(response.data);
        setAddressLoading(false);
        setLoading(false);
      } catch (err) {
        console.log(`AllAddress ${err}`);
      }
    };

    getAddress();
  }, [onAddressChange]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleCheckOut = async () => {
    if (selectedPayment === "paypal") {
      try {
        const products = cartProducts.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          price: item.price,
          category: item.categories,
          brand: item.brand,
        }));
        console.log(products);
        const orderBody = {
          products: products,
          total_amount: totalPrice,
          payment_method: selectedPayment,
          shipping_address: address.address,
        };
        const res = await userRequest.post("/orders", orderBody);
        dispatch(deleteCart());
        navigate(`/order/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCheckoutClicked(true);
      setTimeout(() => {
        setCheckoutClicked(false);
      }, 1000);
    }
  };
  return (
    <>
      <HeaderComponent />
      <Container>
        <Wrapper>
          <ItemSectionContainer>
            {addressLoading ? (
              <AddressStripSkeleton />
            ) : (
              <AddressStripComponent
                setOpenAddressDialog={setOpenAddressDialog}
                address={address}
              />
            )}
            {loading ? (
              <>
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
              </>
            ) : (
              cartProducts?.map((item) => {
                return <CartItem data={item} />;
              })
            )}
          </ItemSectionContainer>
          <OrderSummaryContainer>
            <PaymentContainer>
              <Title>PAYMENT OPTIONS</Title>
              <PaymentSelect
                value={selectedPayment}
                onChange={handlePaymentChange}
                className={checkoutClicked ? "vibrate" : ""}
              >
                <option value="">Select Payment Method</option>

                <option value="paypal">PayPal</option>
              </PaymentSelect>
            </PaymentContainer>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 40</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -40</SummaryItemPrice>
              </SummaryItem>
              <Hr />
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={handleCheckOut}>CHECKOUT NOW</Button>
            </Summary>
          </OrderSummaryContainer>
        </Wrapper>
        {openAddressDialog && (
          <AddressDialogBox
            setOpenAddressDialog={setOpenAddressDialog}
            setOnAddressChange={setOnAddressChange}
            onAddressChange={onAddressChange}
          />
        )}
      </Container>
    </>
  );
};

export default CartPage;
