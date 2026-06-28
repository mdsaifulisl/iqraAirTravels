import React, { createContext, useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../api/settingService';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // ডাটা লোড করা
    const refreshSettings = async () => {
        try {
            const res = await getSettings();
            if (res && res.success) {
                setSettings(res.data);
            }
        } catch (error) {
            console.error("Settings load failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // ডাটা আপডেট করা (নতুন যুক্ত করা হয়েছে)
    const saveSettings = async (formData) => {
        setIsUpdating(true);
        try {
            const res = await updateSettings(formData);
            if (res && res.success) {
                setSettings(res.data); 
                toast.success(res.message || "Settings updated successfully!");
                return res;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Update failed!";
            toast.error(errorMsg);
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        refreshSettings();
    }, []);

    return (
        <SettingContext.Provider value={{ 
            settings, 
            setSettings, 
            loading, 
            refreshSettings, 
            saveSettings, 
            isUpdating 
        }}>
            {children}
        </SettingContext.Provider>
    );
};

