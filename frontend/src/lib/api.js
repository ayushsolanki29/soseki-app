import axios from 'axios';

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

    // Check if the error is 401 Unauthorized and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
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
          window.location.href = isSuperAdminRequest ? '/super-admin/login' : '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
