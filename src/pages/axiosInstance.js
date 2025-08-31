import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json',   
    },
});
// Add an interceptor to set the authorization token for each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
