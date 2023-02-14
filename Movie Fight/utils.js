const debounce = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      //   fetchData(e.target.value);
      func.apply(null, args);
    }, delay);
  };
};
