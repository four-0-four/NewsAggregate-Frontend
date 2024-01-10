import { JwtPayload, jwtDecode } from 'jwt-decode';

/**
 * Checks if a JWT token is valid.
 * 
 * @param token The JWT token to validate.
 * @returns True if the token is valid, false otherwise.
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    // Check if token has expired
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default isTokenValid;
