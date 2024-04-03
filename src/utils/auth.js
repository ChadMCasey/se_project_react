import API from "./api";

const api = new API();

export const signup = (data) => {
  console.log(JSON.stringify(data));
  return api.signUp(data);
};

export const signin = (email, password) => {
  return api.signIn({ email, password });
};

export const getUserData = (token) => {
  return api.getUserData(token);
};
