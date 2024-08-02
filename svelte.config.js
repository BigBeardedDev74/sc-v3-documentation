import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
      $components: "./src/components",
      $css: "./src/css",
      $data: "./src/data",
      $img: "./src/images",
    },
  },
};

export default config;
