/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: "edge",
};

export const load = ({ url, data }) => {
  const { pathname } = url;
  return {
    pathname,
    ...data,
  };
};
