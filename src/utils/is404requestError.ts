export const is404requestError = (e: Error) => {
  return e.message === 'Request failed with status code 404';
};
