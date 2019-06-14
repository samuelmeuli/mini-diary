const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const pkg = require("./package.json");
const base = require("./webpack.base");

module.exports = (env, argv) =>
	merge(base(env, argv), {
		entry: "./src/renderer/renderer.tsx",
		output: {
			filename: "renderer.js",
		},
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
				{
					test: /\.svg$/,
					loader: "svg-inline-loader",
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: pkg.productName,
			}),
		],
		target: "electron-renderer",
	});
