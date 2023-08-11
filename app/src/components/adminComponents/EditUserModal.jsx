import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const EditUserModal = ({
  user,
  showEditModal,
  handleCloseModal,
  handleEdit,
}) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [editEmail, setEmail] = useState(user.email || "");
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || "");
  const [password, setPassword] = useState("");
  const [editIsAdmin, setIsAdmin] = useState(user.isAdmin || false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the updated user data
    const updatedUser = {
      fullName:fullName,
      email: editEmail,
      mobileNumber:mobileNumber,
      isAdmin: editIsAdmin,
    };

    if (password) {
      updatedUser.password = password;
    }

    // Call the handleEdit function with the updated user data
    handleEdit(updatedUser);
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Mobile Number"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
            />
          </Form.Group>

          <Form.Group controlId="isAdmin" style={{ marginTop: "10px" }}>
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={editIsAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
