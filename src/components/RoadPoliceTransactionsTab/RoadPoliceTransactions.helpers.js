export const formatPrice = (value, currency) => {
  if (!value) return "N/A";
  const num = Number(value);
  if (isNaN(num)) return value.toString();
  return (
    new Intl.NumberFormat("en-US").format(num) +
    (currency ? ` ${currency}` : "")
  );
};
