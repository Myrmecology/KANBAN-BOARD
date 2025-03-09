import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth";

/**
 * Login user with username and password
 * @param userInfo User login credentials
 * @returns Promise containing the response data
 */
const login = async (userInfo: UserLogin) => {
  try {
    // Make POST request to login route
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // Check if response is ok
    if (!response.ok) {
      // Attempt to parse error JSON, but handle case where response isn't valid JSON
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      } catch (parseError) {
        // If response isn't valid JSON, use status text
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
    }

    // Parse response data
    const data = await response.json();

    // Save token and expiration to localStorage
    if (data.token) {
      AuthService.login(data.token);
    }

    return data;
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error);
    // Re-throw the error to be handled by the component
    throw error;
  }
};

/**
 * Logout user by removing token
 */
const logout = () => {
  AuthService.logout();
};

export { login, logout };