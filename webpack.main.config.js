const path = require("path");

module.exports = {
	entry: "./src/main/main.ts",
	output: {
		path: path.resolve(__dirname, "bundle"),
		filename: "main.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"], // JS extension needed for node_modules
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
	target: "electron-main",
	node: {
		__dirname: false,
		__filename: false,
	},
};
