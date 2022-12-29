import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const formatCurrency = (value) => {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatDate = (date) => {
  dayjs.extend(customParseFormat);
  return dayjs(date, "YYYY-MM-DD HH:mm:ss ").format("MMM DD YYYY HH:mm:ss");
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

export { formatCurrency, formatDate, debounce };
