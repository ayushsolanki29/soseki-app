import axios from 'axios';
import { toast } from 'sonner';

// Create an Axios instance
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    // You can add headers here if needed, but cookies are handled automatically
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle Rate Limiting (429 Too Many Requests)
    if (error.response?.status === 429) {
      if (typeof window !== 'undefined') {
        const message = error.response?.data?.message || "Too many requests. Please try again later.";
        toast.error("Rate Limit Exceeded", {
          description: message,
          duration: 5000,
        });
      }
      return Promise.reject(error);
    }

    // Handle Blocked Organization
    if (error.response?.status === 403 && error.response?.data?.code === 'ORG_BLOCKED') {
      if (typeof window !== 'undefined' && window.location.pathname !== '/blocked') {
        window.location.href = '/blocked';
      }
      return Promise.reject(error);
    }

    // Check if the error is 401 Unauthorized and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // DO NOT intercept 401s from login or refresh endpoints!
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true; // Mark to avoid infinite loops

      const isSuperAdminRequest = originalRequest.url?.includes('/super-admin/');

      try {
        if (isSuperAdminRequest) {
          throw new Error("Super admin session expired");
        }
        
        // Attempt to refresh the token for normal users
        await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });

        // If successful, the new cookies are set. Retry the original request.
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, it means the session is completely dead.
        // Redirect to login or handle logout state
        if (typeof window !== 'undefined') {
          // Only redirect if they are not already on the login page to avoid refresh loops
          if (window.location.pathname !== '/login' && window.location.pathname !== '/super-admin/login') {
             window.location.href = isSuperAdminRequest ? '/super-admin/login' : '/login';
          }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
