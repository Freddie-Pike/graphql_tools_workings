const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
  "@babel/preset-react",
];

const plugins = ["@babel/plugin-transform-spread"]

module.exports = { presets, plugins };
