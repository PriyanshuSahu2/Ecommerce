import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";
import AddressStripComponent from "../components/AddressStripComponent";
import CartItem from "../components/CartItem";
import HeaderComponent from "../components/HeaderComponent";
import { useSelector } from "react-redux";
import AddressDialogBox from "../components/AddressDialogBox";
import { publicRequest, userRequest } from "../requestMethod";
import { FaPaypal } from "react-icons/fa";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Wrapper = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 0 10px 16px;
  min-height: 320px;
  color: #282c3f;
  display: flex;
`;

const ItemSectionContainer = styled.div`
  display: inline-block;
  width: 64%;
  padding-right: 20px;
  border-right: 1px solid #eaeaec;
  padding-top: 32px;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;

  input[type="radio"] {
    margin-right: 8px;
  }
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
  width: 100%;
  margin-left: 10px;
  margin-top: 30px;
`;

const PaymentSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ProductPlace = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [address, setAddress] = useState({});
  const [onAddressChange, setOnAddressChange] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      console.log(details);
    });
  }
  function onError(err) {
    console.log(err);
  }
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await userRequest("/address/");
        setAddress(response.data);
      } catch (err) {
        console.log(`AllAddress ${err}`);
      }
    };
    const loadPaypalScript = async () => {
      const { data: clientId } = await userRequest.get("/keys/paypal");
      paypalDispatch({
        type: "resetOptions",
        value: { clientId: clientId, currency: "USD" },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    getAddress();
    loadPaypalScript();
  }, [onAddressChange, paypalDispatch]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <>
      <HeaderComponent />
      <Container>
        <Wrapper>
          <ItemSectionContainer>
            <AddressStripComponent
              setOpenAddressDialog={setOpenAddressDialog}
              address={address}
            />
            {cartProducts.map((item) => {
              console.log(item);
              return <CartItem data={item} />;
            })}
          </ItemSectionContainer>
          <OrderSummaryContainer>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs. {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs. 40</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -40</SummaryItemPrice>
              </SummaryItem>
              <Hr />
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs. {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              {/* <Button>CHECKOUT NOW</Button> */}
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
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

export default ProductPlace;
