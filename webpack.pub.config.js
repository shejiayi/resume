const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HTMLWebpackPlugin =require('html-webpack-plugin')

module.exports = {
  mode:'production',
  entry:{
    main:path.resolve(__dirname,'./src/main.js'),
    vendors:['vue','vue-router']
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].js',
    chunkFilename:'js/[name].[chunkhash:8].js',
  },
  plugins:[
    new VueLoaderPlugin,  
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({
      filename:'css/style.css'
    }),
    new HTMLWebpackPlugin({
      template:'index.html',
      filename:'index.html',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      // cssProcessorOptions: cssnanoOptions,
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeUnicode: false
        }]
      },
      canPrint: true
    })
  ], 
  module:{
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.js$/,
        use:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              plugins:[
                require('postcss-import')(),
                require('autoprefixer')({
                  browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                })
              ]
            }
          },
          'less-loader'
      ]
      },
      {
        test:/\.(jpg|jpeg|png|svg|gif)$/i,
        use:'url-loader?limit=10000&name=[name].[ext]'
      },
      {
        test:/\.(ttf|eot|woff|woff2)$/,
        use:'url-loader'
      }
    ]
  },
  optimization:{
    splitChunks: {
              chunks: 'all',
              minSize: 30000,
              minChunks: 1,
              maxAsyncRequests: 5,
              maxInitialRequests: 3,
              name: true,
              cacheGroups: {
                  styles: {
                      name: 'style',
                      test: /\.less$/,
                      chunks: 'all',
                      enforce: true
                  }
              }
          }
  }
  
}
