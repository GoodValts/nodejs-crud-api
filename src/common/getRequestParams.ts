export const getRequestParams = (str: string) => {
  return /^\/[\w-]*$/.test(str) ? str.slice(1) : '';
};
