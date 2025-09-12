export const loadCartFromLocalStorage = (key = "") => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveCart = (key = "", obj = { count: 0, result: {} }) => {
  const { count, item } = obj;
  const data = loadCartFromLocalStorage(key);
  data.push({ count, item });
  localStorage.setItem(key, JSON.stringify(data));
};

export const saveToken = (token) => {
  localStorage.setItem("jwt", token);
};

export const loadToken = () => {
  return localStorage.getItem("jwt");
};

export const clearToken = () => {
  return localStorage.clear("jwt");
};
