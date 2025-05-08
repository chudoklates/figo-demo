export const clearToken = () => {
  localStorage.removeItem("randevu-session-token");
};

export const setToken = (token: string) => {
  localStorage.setItem("randevu-session-token", token);
};
