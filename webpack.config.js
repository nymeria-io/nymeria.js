const path = require("path");

const browser = {
  target: "web",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    library: "nymeria",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [],
  resolve: {
    extensions: [".js"]
  },
};

module.exports = [browser];
