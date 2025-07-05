export const getFormatDate = (date) =>
  new Date(date).toISOString().split("T")[0];
