import React from "react";
import { styled } from "styled-components";

const AddressSectionContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #eaeaec;
  margin-bottom: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const AddressTitle = styled.div`
  font-size: 14px;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const AddressName = styled.div`
  width: 100%;
  display: flex;
  white-space: pre;
  color: black;
  font-weight: 700;
`;
const AddressSubText = styled.div`
  font-size: 12px;
  line-height: 15px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  font-weight: 600;
`;
const AddressChangeBtn = styled.button`
  font-size: 12px;
  line-height: inherit;
  outline: none;
`;
const AddressStripComponent = ({
  setOpenAddressDialog,
  address,
  intrectable = true,
}) => {
  return (
    <AddressSectionContainer>
      <AddressTitle>
        <AddressName>
          Deliver To :<span>{address?.address?.Name}</span>
          <span>, {address?.address?.PinCode}</span>
        </AddressName>
        <AddressSubText>{address?.address?.FullAddress}</AddressSubText>
      </AddressTitle>
      {intrectable && (
        <AddressChangeBtn
          role="button"
          onClick={() => {
            setOpenAddressDialog(true);
          }}
        >
          <span>Change Address</span>
        </AddressChangeBtn>
      )}
      
    </AddressSectionContainer>
  );
};

export default AddressStripComponent;
