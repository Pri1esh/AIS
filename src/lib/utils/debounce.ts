const debounce = (method: any, delay: number) => {
  clearTimeout(method._tId);
  method._tId = setTimeout(() => {
    method();
  }, delay);
};

export default debounce;
