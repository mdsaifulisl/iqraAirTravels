/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { getAllMessages, deleteMessage, updateMessageStatus } from '../api/contactService';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ১. সব মেসেজ লোড করা
  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      const res = await getAllMessages();
      if (res.success) {
        setMessages(res.data);
        const count = res.data.filter(m => m.status === 'unread').length;
        setUnreadCount(count);
      }
    } catch (err) {
      console.error("Failed to load messages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ২. মেসেজ ডিলিট করা
  const removeMessage = async (id) => {
    try {
      const res = await deleteMessage(id);
      if (res.success) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        toast.success("Message deleted");
        
        updateUnreadCount();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ৩. মেসেজ পড়া হিসেবে মার্ক করা (Status Update)
  const markAsRead = async (id) => {
    try {
      const res = await updateMessageStatus(id, 'read');
      if (res.success) {
        setMessages(prev => 
          prev.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg)
        );
        updateUnreadCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // আনরিড কাউন্ট আপডেট করার হেল্পার ফাংশন
  const updateUnreadCount = () => {
    setMessages(prev => {
      const count = prev.filter(m => m.status === 'unread').length;
      setUnreadCount(count);
      return prev;
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ContactContext.Provider value={{ 
      messages, 
      loading, 
      unreadCount, 
      fetchMessages, 
      removeMessage, 
      markAsRead 
    }}>
      {children}
    </ContactContext.Provider>
  );
};


