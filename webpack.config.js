const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const firebase = require("firebase");
require("firebase/firestore");
let devmode = false;

// let FB_API_KEY             = 'AIzaSyBX8T88R46v7yU5Q9KEh6YGUtl0qU4NYEs';
// let FB_AUTH_DOMAIN         = 'douraku-b37a6.firebaseapp.com';
// let FB_DATABASE_URL        = 'https://douraku-b37a6.firebaseio.com';
// let FB_PROJECT_ID          = 'douraku-b37a6';
// let FB_STORAGE_BUCKET      = 'douraku-b37a6.appspot.com';
// let FB_MESSAGING_SENDER_ID = '715806485661';
// let FB_ID = "1:715806485661:web:d45c4b17f0da3e80ba7874";

module.exports = (env,argv ) => {
  let devmode;
  let isDevelopment = argv.mode === 'development';
  if(isDevelopment === true){
    devmode = 'inline-source-map';
    console.log('[OK] development build');
  }else{
    devmode = 'none';
    console.log('[OK] production build');
  }
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './js/main.js'//,
      // login: './js/login.js',
      // loading: './js/loading.js'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: './',
      filename: '[name]-[hash].bundle.js'
    },
    module: {
      rules: [
        { //sass-loader,node-sassに関する設定
          test: /\.(sc|c)ss$/, //正規表現で拡張子が.scssのファイルを指定
          use: [ //*** use内の記述はRevarseOrder *** 下から上に実行される
            MiniCssExtractPlugin.loader, //mini-css-extract-pluginの設定
            {
              loader: 'css-loader', //2.CSSファイルの取り込み
              options: {
                importLoaders: 2,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                sourceMap: true,
                plugins: () => [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader', //1.scssファイルを取り込みCSSファイルに変換
              options:{ sourceMap: true }
            },
          ]
        },
        {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env']
              ]
          }
        }]
        },
        {
          test: /\.html$/, //対象拡張子はhtml
          loader: 'html-loader'
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      openPage: './index.html',
      open: true,
      port: 9090,
      publicPath: '/',
      watchContentBase: true,
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   __FB_API_KEY__:             JSON.stringify(FB_API_KEY),
      //   __FB_AUTH_DOMAIN__:         JSON.stringify(FB_AUTH_DOMAIN),
      //   __FB_DATABASE_URL__:        JSON.stringify(FB_DATABASE_URL),
      //   __FB_PROJECT_ID__:          JSON.stringify(FB_PROJECT_ID),
      //   __FB_STORAGE_BUCKET__:      JSON.stringify(FB_STORAGE_BUCKET),
      //   __FB_MESSAGING_SENDER_ID__: JSON.stringify(FB_MESSAGING_SENDER_ID),
      //   __FB_ID__:JSON.stringify(FB_ID)
      //   }),
        new HtmlWebPackPlugin({ //インスタンスを作成
          template:'../src/index.ejs', //使用するhtmlの雛形ファイルのパス
          filename:'index.html', //publicに出力されるhtmlファイルの名称
          chunks:['main'],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          chunksSortMode: 'dependency'
        }),
        new MiniCssExtractPlugin({ //mini-css-extract-pluginの設定
          filename: 'style.[hash].css' //importしたcssファイルをすべてバンドルしてこの名称で出力する
          // filename: 'style.css'
        }),
        new CleanWebpackPlugin({
          dry: false,
          cleanOnceBeforeBuildPatterns: ['**/*','!video/**','!.vscode/**','!img/**', '!index.html*']
        })
    ],
    optimization: { //uglifyjs-webpack-plugin
      minimizer:[new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: false //console.log()を消去する
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
    },
    cache: true,
    devtool: devmode
  }
};
