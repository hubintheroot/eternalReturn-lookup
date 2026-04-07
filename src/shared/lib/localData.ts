export const LocalData = {
  get: <T>(key: string): T | [] => {
    const item = localStorage.getItem(key);
    return item
      ? JSON.parse(item) as T
      : [];
  },
  set: <T>(key: string, nextData: T): void => {
    localStorage.setItem(key, JSON.stringify(nextData));
  },
};
