export const couponSort = data => {
  return [...data].sort((a, b) => {
    const at = new Date(a["expires_at"]).getTime();
    const bt = new Date(b["expires_at"]).getTime();
    const aa = a["is_active"] ? 1 : 0;
    const ba = b["is_active"] ? 1 : 0;
    return ba - aa || (a["expires_at"] === null) - (b["expires_at"] === null) || at - bt;
  });
};
export const formatDate = (date, isText = false) => isText ? `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, "0")}월 ${date.getDate().toString().padStart(2, "0")}일 ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}` : `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;