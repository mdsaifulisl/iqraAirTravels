import React, { createContext, useState, useCallback, useEffect } from "react";
import {
  getAllUsers as fetchAllUsersApi,
  updateUser as updateUserApi,
  createUser as createUserApi,
  deleteUser as deleteUserApi, 
  getUserById as getUserByIdApi,
} from "../api/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetchAllUsersApi();
      if (response.success) setUsers(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("Unauthorized access. Token might be expired.");
      } else {
        console.error("Fetch Error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserById = async (id) => {
    setLoading(true);
    try {
      const response = await getUserByIdApi(id);
      if (response.success) {
        setSelectedUser(response.data);

        return response.data;
      }
    } catch (err) {
      console.error("Fetch User Error:", err);

      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id, formData) => {
    try {
      const response = await updateUserApi(id, formData);
      if (response.success) {
        // UI স্টেট আপডেট (সরাসরি ম্যাপ করে নতুন ডাটা বসিয়ে দেওয়া)
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === Number(id) ? response.data : user,
          ),
        );
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleAddUser = async (formData) => {
    try {
      const response = await createUserApi(formData);
      if (response.success) {
        // নতুন মেম্বারকে লিস্টের সবার উপরে যোগ করা
        setUsers((prevUsers) => [response.data, ...prevUsers]);
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await deleteUserApi(id);
      if (response.success) {
        // স্টেট থেকে ওই আইডি বাদ দিয়ে দেওয়া
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return { success: true };
      }
    } catch (err) {
      console.error("Delete Error:", err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUsers();
    }
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        selectedUser,
        message,
        fetchUsers,
        fetchUserById,
        handleUpdateUser,
        handleAddUser,
        handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
