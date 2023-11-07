const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");

const mode = process.env.NODE_ENV;
// const dev = mode === "development";

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 4,
      features: {
        "nesting-rules": false,
      },
    }),
    require("postcss-nested"),
  ],
};

module.exports = config;
