const formatCurrency = (value) => {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export { formatCurrency, debounce };
