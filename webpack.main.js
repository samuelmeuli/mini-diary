const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => ({
	entry: "./src/main/main.ts",
	output: {
		path: path.resolve(__dirname, "bundle"),
		filename: "main.js",
	},
	devtool: argv.mode === "production" ? false : "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
				options: {
					configFileName: "./src/main/tsconfig.json",
				},
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
		],
	},
	plugins: [
		...(argv.mode === "production"
			? [new LicenseCheckerWebpackPlugin({ outputFilename: "licenses-main.txt" })]
			: []),
	],
	target: "electron-main",
	node: {
		__dirname: false,
		__filename: false,
	},
});
