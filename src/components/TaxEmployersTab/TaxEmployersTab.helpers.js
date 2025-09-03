export const isNumeric = (str) => {
  if (typeof str !== "string") return false;
  return str.trim() !== "" && !isNaN(str);
};
