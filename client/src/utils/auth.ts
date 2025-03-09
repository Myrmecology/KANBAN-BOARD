import { JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  id?: string;
  username?: string;
}

class AuthService {
  /**
   * Get the decoded token with user information
   * @returns User profile information from token
   */
  getProfile(): DecodedToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is logged in
   * @returns Whether the user is logged in
   */
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  /**
   * Check if token is expired
   * @param token JWT token
   * @returns Whether the token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      
      // Check if token has expiration
      if (!decoded.exp) {
        return true;
      }
      
      // Compare expiration time with current time
      // exp is in seconds, Date.now() is in milliseconds
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  /**
   * Get token from localStorage
   * @returns JWT token
   */
  getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }

  /**
   * Set token in localStorage and redirect to home
   * @param idToken JWT token
   */
  login(idToken: string): void {
    // Save token to localStorage
    localStorage.setItem('auth_token', idToken);
    
    // Redirect to board page
    window.location.assign('/board');
  }

  /**
   * Remove token from localStorage and redirect to login
   */
  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    // Redirect to login page
    window.location.assign('/login');
  }
}

export default new AuthService();