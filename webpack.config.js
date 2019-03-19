const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/renderer/renderer.tsx",
	output: {
		path: path.resolve(__dirname, "bundle"),
		filename: "bundle.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
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
		new CopyWebpackPlugin([
			"src/main.js",
			{
				from: "src/main",
				to: "main",
			},
		]),
		new HtmlWebpackPlugin({
			title: "Mini Diary",
		}),
	],
	target: "electron-renderer",
};
