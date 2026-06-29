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
            const res = await axiosInstance.get("/users/verify-me");
            if (res.data.success) {
                setUser(res.data.user);
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
        setMessage(""); 
        try {
            const res = await axiosInstance.post("/users/login", { email, password });
            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
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

    // Change Password (Logged in User)
    const updatePassword = async (oldPassword, newPassword) => {
        setPmessage(""); 
        try {
            const res = await axiosInstance.put("/users/change-password", { 
                oldPassword, 
                newPassword 
            });
            
            if (res.data.success) {
                setPmessage(res.data.message); 
            }
            
            return { success: true, message: res.data.message };
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Password change failed";
            setPmessage(errorMsg); 
            return { success: false, message: errorMsg };
        }
    };

    // ========================================================
    // FORGOT PASSWORD FLOW FUNCTIONS (NEW)
    // ========================================================

    // ১. ওটিপি কোড ইমেইলে পাঠানোর ফাংশন
    const sendOtp = async (email) => {
        try {
            const res = await axiosInstance.post("/users/forgot-password/send-otp", { email });
            return { success: true, message: res.data.message };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Failed to send OTP. Please try again." 
            };
        }
    };

    // ২. ওটিপি কোড ভেরিফাই করার ফাংশন
    const verifyOtp = async (email, otp) => {
        try {
            const res = await axiosInstance.post("/users/forgot-password/verify-otp", { email, otp });
            return { success: true, message: res.data.message };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Invalid or expired OTP." 
            };
        }
    };

    // ৩. নতুন পাসওয়ার্ড সেভ করার ফাংশন
    const resetPassword = async (email, otp, newPassword) => {
        try {
            const res = await axiosInstance.post("/users/forgot-password/reset-password", { 
                email, 
                otp, 
                newPassword 
            });
            return { success: true, message: res.data.message };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Failed to reset password. Please try again." 
            };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            updatePassword, 
            sendOtp, 
            verifyOtp, 
            resetPassword, 
            loading, 
            message, 
            psmessage, 
            setPmessage 
        }}>
            {children}
        </AuthContext.Provider>
    );
};