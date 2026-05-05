export const getToken = () => localStorage.getItem("token") || localStorage.getItem("jwt");

export const clearAuthTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("jwt");
};
