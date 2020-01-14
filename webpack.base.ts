import path from "path";

import LicenseCheckerWebpackPlugin from "license-checker-webpack-plugin";
import { Configuration } from "webpack";

export default (_: any, argv: Record<string, string>): Configuration => {
	const configName = argv.config.split(".")[2];
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
				? [
						new LicenseCheckerWebpackPlugin({
							allow: "(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR ISC OR MIT OR Zlib)",
							outputFilename: `licenses-${configName}.txt`,
						}),
				  ]
				: []),
		],
	};
};
