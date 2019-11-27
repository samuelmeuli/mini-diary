import { Configuration } from "webpack";
import merge from "webpack-merge";

import base from "./webpack.base";

export default (_: any, argv: Record<string, string>): Configuration =>
	merge(base(_, argv), {
		entry: "./src/main/main.ts",
		output: {
			filename: "main.js",
		},
		target: "electron-main",
		node: {
			__dirname: false,
			__filename: false,
		},
	});
