var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: __dirname + '/server',	//输出地址
		filename: 'app.js',		//与webpack-dev-server输出名字也是这个
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			},
			{
				test:/\.css$/,
				loader:'style!css!sass'
			},
			{
				test: /\.(png|jpeg|gif|jpg)$/,
				loader: 'url?limit=25000'
			}
		]
	},
	devServer:{
		contentBase: './server',  //本地址为webpack-dev-server输出的内存文件地址，html引入js应该相对于这个地址引入
		colors: true,
		historyApiFallback: false,
		port: 8080, // defaults to "8080"
		hot: true, // Hot Module Replacement
		inline: true, // Livereload
		host: '0.0.0.0',
	},
	plugins: [
		new CleanPlugin(['dist/*']),
		new webpack.DefinePlugin({
			//去掉react中的警告，react会自己判断
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
/*		new HtmlWebpackPlugin({
			template: './public/template.html',
			htmlWebpackPlugin: {
				"files": {
					"css": ["style.css"],
					"js": ["vendors.js","bundle.js"]
				}
			},
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),*/
	  	new webpack.HotModuleReplacementPlugin()
		//new OpenBrowserPlugin({url: 'http://localhost:8080/'})
	]
};
