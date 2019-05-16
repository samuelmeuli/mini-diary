const HtmlWebpackPlugin = require("html-webpack-plugin");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const path = require("path");

const pkg = require("./package.json");

module.exports = (env, argv) => ({
	entry: "./src/renderer/renderer.tsx",
	output: {
		path: path.resolve(__dirname, "bundle"),
		filename: "renderer.js",
	},
	devtool: argv.mode === "production" ? false : "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: [/\.jsx?$/, /\.tsx?$/],
				use: "babel-loader",
				exclude: /node_modules/,
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
			title: pkg.productName,
		}),
		...(argv.mode === "production"
			? [new LicenseCheckerWebpackPlugin({ outputFilename: "licenses-renderer.txt" })]
			: []),
	],
	target: "electron-renderer",
});
