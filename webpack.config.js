const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "main.js",
	},
	devServer: {
		port: 9000,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			minify: false,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			linkType: "text/css",
			filename: "style.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: "" },
					},
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				loader: "file-loader",
				options: {
					outputPath: "css",
					name: "[name].[ext]",
				},
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loader: "file-loader",
				options: {
					outputPath: "img",
					name: "[name].[ext]",
				},
			},
			{
				test: /\.(woff|woff2)$/i,
				loader: "file-loader",
				options: {
					outputPath: "fonts",
					name: "[name].[ext]",
				},
			},
		],
	},
};
