export const LocalData = {
  get: (key) => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : [];
  },
  set: (key, nextData) => {
    localStorage.setItem(key, JSON.stringify(nextData));
  },
};
