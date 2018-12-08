const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/renderer/renderer.js',
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			'src/main.js',
			{
				from: 'src/main/**/*',
				to: 'main/',
				flatten: true
			}
		]),
		new HtmlWebpackPlugin({
			title: 'Mini Diary'
		})
	],
	target: 'node'
};
