import React, { useState } from "react";
import styled from "styled-components";
import { BsPencil, BsTrash } from "react-icons/bs";
import EditUserModal from "./EditUserModal";
import { userRequest } from "../../requestMethod";
import { toast } from "react-toastify";

const CardWrapper = styled.div`
  border: 1px solid #eaeaec;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  align-items: center;
  text-align: center;
`;

const UserId = styled.p`
  color: #535665;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const UserName = styled.h3`
  color: #282c3f;
  font-size: 18px;
  font-weight: 700;
  margin: 0 10px 0 0;
`;

const UserEmail = styled.p`
  color: #7e818c;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

const AdminBadge = styled.span`
  background-color: ${(props) => (props.isAdmin ? "#03a685" : "#ff3e6c")};
  color: white;
  font-size: 16px;
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

const UserCard = ({ user, setUpdate }) => {
  const { _id, fullName, email, isAdmin } = user;
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseModal = () => {
    setShowEditModal(false);
  };
  const handleEdit = async (data) => {
    try {
      if (isAdmin !== data.isAdmin) {
        const res = await userRequest.put(`/user/${_id}/give-admin`);
        console.log(res.data);
        setUpdate(res.data);
      }
      const res = await userRequest.put(`/user/${_id}`, data);
      console.log(res.data);
      setUpdate(res.data);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await userRequest.delete(`/user/${_id}`);
      setUpdate(res.data)
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <CardWrapper>
      <EditUserModal
        user={user}
        showEditModal={showEditModal}
        handleCloseModal={handleCloseModal}
        handleEdit={handleEdit}
      />
      <UserId> {_id}</UserId>
      <UserName>{fullName}</UserName>
      <AdminBadge isAdmin={isAdmin}>{isAdmin ? "Admin" : "User"}</AdminBadge>

      <UserEmail> {email}</UserEmail>
      <ActionButtons>
        <EditButton
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          <BsPencil /> Edit
        </EditButton>
        <DeleteButton onClick={handleDelete}>
          <BsTrash /> Delete
        </DeleteButton>
      </ActionButtons>
    </CardWrapper>
  );
};

export default UserCard;
