const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode:"production",
  entry:{
    entry: path.join(__dirname,'./src/main.js'),
    vue:'vue',
  },
  output: {
    path:path.join(__dirname,'./dist'),
    filename:'js/[name].js',
    chunkFilename:'js/[name].js'
  },
  plugins:[
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname,'./index.html'),
      filename: 'index.html'
    }),
    new cleanWebpackPlugin('dist'),
    new ExtractTextPlugin('css/style.css'),
    new OptimizeCssAssetsPlugin()
  ],
  optimization:{
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks:{
      cacheGroups:{ // 单独提取JS文件引入html
          vue:{ // 键值可以自定义
              chunks:'initial', // 
              name:'vue', // 入口的entry的key
              enforce:true   // 强制 
          },
      }
    }
  },
  module:{
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test:/\.(jpg|jpeg|png|svg|gif)$/i,
        use:'url-loader?limit=5000&name=images/[name].[ext]'
      },
      {
        test:/\.js$/,
        use:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.(ttf|eot|woff|woff2)$/,
        use:'url-loader'
      }
    ]
  }
}