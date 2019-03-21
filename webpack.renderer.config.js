const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

module.exports = {
	entry: "./src/renderer/renderer.tsx",
	output: {
		path: path.resolve(__dirname, "bundle"),
		filename: "renderer.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"], // JS extension needed for node_modules
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				options: {
					configFileName: "./src/renderer/tsconfig.json",
				},
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
		new HtmlWebpackPlugin({
			title: "Mini Diary",
		}),
		new LicenseCheckerWebpackPlugin({ outputFilename: "licenses-renderer.txt" }),
	],
	target: "electron-renderer",
};
