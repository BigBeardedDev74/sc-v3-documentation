export const prerender = true;

export const load = ({ url, data }) => {
  const { pathname } = url;
  console.log("pathname", data);
  return {
    pathname,
    ...data,
  };
};
