import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api', 
     baseURL: '/api', 
    timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        
        return response;
    },
    (error) => {
        
        return Promise.reject(error);
    }
);

export default axiosInstance;