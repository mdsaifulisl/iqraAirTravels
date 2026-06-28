import React, { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(""); 
    const [psmessage, setPmessage] = useState("");

    // ১. ইউজার ভেরিফাই করার ফাংশন
    const verifyUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // ব্যাকএন্ডে টোকেন পাঠিয়ে আসল ডাটা আনা
            const res = await axiosInstance.get("/users/verify-me");
            if (res.data.success) {
                setUser(res.data.user);
                // লোকাল স্টোরেজের ডাটাও আপডেট করে রাখা ভালো যাতে সিঙ্ক থাকে
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }
        } catch (err) {
            console.error("Verification error:", err);
            logout(); 
        } finally {
            setLoading(false);
        }
    }, []);

    // page load user verify
    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    // Login function
    const login = async (email, password) => {
        setMessage(""); // পুরানো মেসেজ ক্লিয়ার করা
        try {
            const res = await axiosInstance.post("/users/login", { email, password });
            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
                // এক্সিওস হেডারে টোকেন সেট করা
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
                return { success: true };
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Login failed!";
            setMessage(errorMsg);
            return { success: false, message: errorMsg };
        }
    };

    // logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosInstance.defaults.headers.common["Authorization"];
    };



    // AuthContext.jsx এর ভেতরে
const updatePassword = async (oldPassword, newPassword) => {
    setPmessage(""); 
    try {
        const res = await axiosInstance.put("/users/change-password", { 
            oldPassword, 
            newPassword 
        });
        
        // যদি সাকসেসফুল হয়, মেসেজ স্টেটে সাকসেস মেসেজটি সেট করে দিতে পারেন
        if (res.data.success) {
            setPmessage(res.data.message); 
        }
        
        return { success: true, message: res.data.message };
    } catch (err) {
        const errorMsg = err.response?.data?.message || "Password change failed";
        setPmessage(errorMsg); 
        return { 
            success: false, 
            message: errorMsg 
        };
    }
};





    return (
        <AuthContext.Provider value={{ user, login, logout, updatePassword, loading, message, psmessage, setPmessage }}>
            {children}
        </AuthContext.Provider>
    );
};