const formatCurrency = (value) => {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
export { formatCurrency };
