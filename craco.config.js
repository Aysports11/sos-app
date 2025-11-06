// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the rule that uses source-map-loader
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        oneOfRule.oneOf.forEach((loader) => {
          if (
            loader.loader &&
            loader.loader.includes("source-map-loader")
          ) {
            // Exclude node_modules from source-map-loader
            loader.exclude = [/node_modules/];
          }
        });
      }
      return webpackConfig;
    },
  },
};