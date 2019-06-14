const merge = require("webpack-merge");

const base = require("./webpack.base");

module.exports = (env, argv) =>
	merge(base(env, argv), {
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
