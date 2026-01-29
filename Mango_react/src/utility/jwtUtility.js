import {jwtDecode} from 'jwt-decode';

const decodeJWT = (token) => {
  try {
    return jwtDecode(token);
    } catch (error) {
        console.error("Invalid JWT token", error);
        return null;
    }
}
export const isTokenExpired = (token) => {
    const decoded = decodeJWT(token);   
    return !decodedToken || decoded.exp * 1000 < Date.now();
}

export const getUserInfoFromToken = (token) => {
    const decodedToken = decodeJWT(token);
    if (!decodedToken) return null; 
    return {
        id: decodedToken.id,
        name: decodedToken.email,
        role: decodedToken.role ,
        email: decodedToken.email,
        exp : decodedToken.exp,
    };
}