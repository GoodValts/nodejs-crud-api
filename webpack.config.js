import path from 'path';

module.exports = {
  entry: "./src/server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
}