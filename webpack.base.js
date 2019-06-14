const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
	const configName = argv.config.split[2];
	return {
		output: {
			path: path.resolve(__dirname, "bundle"),
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
			],
		},
		plugins: [
			...(argv.mode === "production"
				? [new LicenseCheckerWebpackPlugin({ outputFilename: `licenses-${configName}.txt` })]
				: []),
		],
	};
};
