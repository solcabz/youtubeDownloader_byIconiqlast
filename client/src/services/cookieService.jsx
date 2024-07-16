// cookieService.js
import Cookies from "js-cookie";

// Set a cookie
export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, value, options, { expires: 1 });
};

// Get a cookie
export const getCookie = (name, value) => {
  return Cookies.get(name, value);
};

// Remove a cookie
export const removeCookie = (name) => {
  Cookies.remove(name);
};
