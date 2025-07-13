import { jwtDecode } from "jwt-decode";

export const isValidJwtToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    // Check if token has expired
    if (decoded.exp && decoded.exp < currentTime) return false;

    return true;
  } catch (err) {
    return false;
  }
};

export const isLoggedIn = () => {
  return isValidJwtToken();
};

export const getUserInfoFromJwtToken = () => {
  if (!isLoggedIn()) null;

  const token = localStorage.getItem("jwtToken");

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};
