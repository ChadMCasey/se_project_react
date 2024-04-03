const JWT_KEY = "jwt";

export const setToken = (token) => {
  localStorage.setItem(JWT_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(JWT_KEY);
};

export const removeToken = () => {
  return localStorage.removeItem(JWT_KEY);
};
