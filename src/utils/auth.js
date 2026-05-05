export const getToken = () => localStorage.getItem("token") || localStorage.getItem("jwt");

export const setAuthSession = () => {
  localStorage.setItem("authSession", "true");
};

export const hasAuthSession = () => Boolean(getToken() || localStorage.getItem("authSession"));

export const clearAuthTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("jwt");
  localStorage.removeItem("authSession");
};
