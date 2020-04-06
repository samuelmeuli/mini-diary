import path from "path";

import LicenseCheckerWebpackPlugin from "license-checker-webpack-plugin";
import { CliConfigOptions, Configuration } from "webpack";

export default (
	_: string | Record<string, boolean | number | string>,
	args: CliConfigOptions,
): Configuration => {
	const configName = args.config?.split(".")[2];
	return {
		output: {
			path: path.resolve(__dirname, "bundle"),
		},
		devtool: args.mode === "production" ? false : "source-map",
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
		// @ts-ignore
		plugins: [
			...(args.mode === "production"
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
