import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethod";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { toast } from "react-toastify";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileField = styled.div`
  margin-bottom: 1rem;

  label {
    font-weight: bold;
  }

  input,
  span {
    display: block;
    width: 100%;
    padding: 0.5rem 0.7rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  min-width: 400px;
  margin: 0 auto;
`;

const UserProfile = () => {
  const userId = useParams("id").id;
  const [userData, setUserData] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await publicRequest(`/user/${userId}`);
        console.log(res);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditMode(false);
    const { fullName, mobileNumber, email, password, confirmPassword } =
      userData;
    const data = {
      fullName,
      mobileNumber,
      email,
    };
    // Add the password field to the data object if it's present
    if (password) {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match.");
        return;
      }
      data.password = password;
    }
    try {
      const response = await userRequest.put(`/user/${userId}`, data);
      toast.success("Profile Updated!");
      setUserData(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <>
      <HeaderComponent />

      <UserProfileContainer>
        <ProfileContainer>
          <h2 className=" text-center text-decoration-underline mt-5">
            Profile Details
          </h2>
          <div className="mt-4">
            <ProfileField>
              <label>Full Name</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={userData?.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
              ) : (
                <span>{userData?.fullName}</span>
              )}
            </ProfileField>
            <ProfileField>
              <label>Mobile Number</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={userData?.mobileNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, mobileNumber: e.target.value })
                  }
                />
              ) : (
                <span>{userData?.mobileNumber}</span>
              )}
            </ProfileField>
            <ProfileField>
              <label>Email ID</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              ) : (
                <span>{userData?.email}</span>
              )}
            </ProfileField>
            <ProfileField>
              <label>Password</label>
              {isEditMode ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              ) : (
                <span>Enter New Password</span>
              )}
            </ProfileField>
            <ProfileField>
              <label>Confirm Password</label>
              {isEditMode ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              ) : (
                <span>Confirm New Password</span>
              )}
            </ProfileField>
            <ProfileField>
              <div className="d-flex align-items-center">
                <input
                  style={{ width: "fit-content" }}
                  className="m-0 "
                  type="checkbox"
                  checked={userData?.isAdmin}
                />
                <label className="m-0 ms-2">Is Admin</label>
              </div>
            </ProfileField>

            {isEditMode ? (
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Save
              </Button>
            ) : (
              <Button onClick={handleEdit}>Edit</Button>
            )}
          </div>
        </ProfileContainer>{" "}
      </UserProfileContainer>
    </>
  );
};

export default UserProfile;
