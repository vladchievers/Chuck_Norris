const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	mode: NODE_ENV,
	watch: isDev,
	devtool: isDev && 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
	    	},
	    	{
	    		test: /\.css$/,
	    		exclude: /node_modules/,
	    		use: [
	    			MiniCssExtractPlugin.loader,
	    			{
	    				loader: 'css-loader',
	    				options: {
	    					modules: true,
	    					localIdentName: isDev ? (
	    						'[name]__[local]__[hash:base64:5]'
	    					) : (
	    						'[hash:base64:12]'
	    					)
	    				}
	    			}
	    		]
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'svg-react-loader',
						options: {
							tag: "symbol",
							name: "MyIcon",
						}
					}
				]
			},
	    	{
        		test: /\.(png|jpg|gif|webp)$/,
        		exclude: /node_modules/,
        		use: [
						{
							loader: 'file-loader',
							options: {
								name: 'images/[hash].[ext]'
							}
						}
        		]
    		}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'__DEV__': JSON.stringify(isDev)
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve('./src/static'),
				to: path.resolve('./dist')
			}
		]),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	]
};