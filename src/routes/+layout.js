export const load = ({ url, data }) => {
  console.log("layout load", url, data);
  const { pathname } = url;
  return {
    pathname,
    ...data,
  };
};
