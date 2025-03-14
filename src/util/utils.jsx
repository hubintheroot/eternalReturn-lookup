export const couponSort = (data) => {
  return [...data].sort((a, b) => {
    const at = new Date(a["expires_at"]).getTime();
    const bt = new Date(b["expires_at"]).getTime();
    const aa = a["is_active"] ? 1 : 0;
    const ba = b["is_active"] ? 1 : 0;
    // const au = a["is_used"] ? 1 : 0;
    // const bu = b["is_used"] ? 1 : 0;

    return (
      ba - aa ||
      // au - bu ||
      (a["expires_at"] === null) - (b["expires_at"] === null) ||
      at - bt
    );
  });
};
