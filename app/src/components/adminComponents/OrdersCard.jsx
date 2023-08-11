import React from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import { toast } from "react-toastify";

const CardWrapper = styled.div`
  border: 1px solid #eaeaec;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  text-align: center;
  max-height: 70px;
`;

const OrderID = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const PaymentMethod = styled.div`
  font-size: 16px;
`;

const UserEmail = styled.div`
  font-size: 16px;
`;

const TotalAmount = styled.div`
  font-size: 16px;
`;

const OrderDate = styled.div`
  font-size: 16px;
`;
const PaymentStatus = styled.div`
  font-size: 16px;
  background-color: ${(props) => (props.isPaid ? "#2ECC71" : "#e9c00a")};
  color: white;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 20px;
  margin-left: 10px;
`;

const DeliveryStatus = styled.div`
  font-size: 16px;
  background-color: ${(props) => (props.isDelivered ? "#2ECC71" : "#e9c00a")};
  color: white;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 20px;
  margin-left: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const EditButton = styled.button`
  background-color: #ff3e6c;
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: #ff3e6c;
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const OrdersCard = ({ order, setUpdate, admin = false }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleDelete = async () => {
    try {
      const res = await userRequest.delete(`/orders/${order._id}`);
      setUpdate(res.data);
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const redirectToOrderPage = () => {
    navigate("/order/" + order._id);
  };
  return (
    <CardWrapper>
      <OrderID>{order._id}</OrderID>
      <OrderDate>{formatDate(order.createdAt)}</OrderDate>
      <UserEmail> {order.userId.email}</UserEmail>
      <PaymentMethod>{order.payment_method}</PaymentMethod>
      <TotalAmount> {order.total_amount}</TotalAmount>
      <PaymentStatus isPaid={order.payment_status === "Paid"}>
        {order.payment_status === "Paid" ? `Paid` : "Pending"}
      </PaymentStatus>
      <DeliveryStatus isDelivered={order.status === "Delivered"}>
        {" "}
        {order.status}
      </DeliveryStatus>
      <ActionButtons>
        <EditButton onClick={redirectToOrderPage}>Details</EditButton>
        {admin && (
          <DeleteButton onClick={handleDelete}>
            <BsTrash /> Delete
          </DeleteButton>
        )}
      </ActionButtons>
    </CardWrapper>
  );
};
export default OrdersCard;
