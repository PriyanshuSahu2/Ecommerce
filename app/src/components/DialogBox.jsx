import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCartItem } from "../redux/cartRedux";

const DialogContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
`;

const DialogTitle = styled.h2`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const QuantityDialogContent = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const DialogButton = styled.button`
  background-color: #ff3e6c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const PlusMinusButton = styled.button`
  background-color: #ff3e6c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
`;
const Content = styled.span`
  padding: 10px;

  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
`;
const AllSizeButtonsContainer = styled.div`
  display: flex;
`;
const SizeBtnContainer = styled.div`
  margin: 10px 10px 10px 0;
  position: relative;
`;
const SizeBtn = styled.button`
  border: 1px solid #ff3f6c;
  background-color: #fff;

  border-radius: 50px;
  padding: 0;
  min-width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
  background-color: ${(props) => (props.isselected ? "#ff3f6c" : "white")};
  color: ${(props) => (props.isselected ? "white" : "#ff3f6c")};
  &:hover {
  }
`;
const SizeLabel = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 0 8px;
  font-weight: 700;
  color: inherit;
`;
const DialogBox = ({ title, quantity, onClose, id, sizes, size }) => {
  const [count, setCount] = useState(quantity);
  const [selectedSize, setSelectedSize] = useState(size);

  const increaseContent = () => {
    setCount(count + 1);
  };

  const decreaseContent = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const dispatch = useDispatch();
  const updateItem = () => {
    console.log(selectedSize)
    dispatch(
      updateCartItem({
        quantity: count,
        selectedSize: selectedSize,
        cartId: id,
      })
    );
    onClose();
  };

  return (
    <DialogContainer>
      <DialogTitle>{title}</DialogTitle>
      <QuantityDialogContent>
        <PlusMinusButton onClick={increaseContent}>+</PlusMinusButton>
        <Content>{count}</Content>
        <PlusMinusButton onClick={decreaseContent}>-</PlusMinusButton>
      </QuantityDialogContent>
      <AllSizeButtonsContainer>
        <SizeBtnContainer>
          {sizes?.map((item, idx) => {
            const isSelected = item === selectedSize;

            return (
              <SizeBtn
                isselected={isSelected}
                key={idx}
                onClick={() => {
                  setSelectedSize(item);
                }}
              >
                <SizeLabel>{item}</SizeLabel>
              </SizeBtn>
            );
          })}
        </SizeBtnContainer>
      </AllSizeButtonsContainer>
      <DialogButton onClick={updateItem}>Done</DialogButton>
    </DialogContainer>
  );
};
export default DialogBox;
