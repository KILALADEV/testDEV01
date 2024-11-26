const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const devMode = false;

module.exports = {
  mode: devMode ? 'development' : 'production',
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
  },
  stats: {
    warnings: false, // Tắt cảnh báo
  },
  entry: {
    base: './src/scss/base.scss', // Entry cho base.scss
    home: './src/scss/pages/_home.scss', // Entry cho _home.scss
    js: './src/js/base.js', // Entry cho JS
  },
  output: {
    filename: './assets/js/[name].min.js', // JS sẽ được xuất theo tên entry (e.g., js.min.js)
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: './assets/img/[hash][ext][query]',
    clean: true, // Dọn dẹp thư mục dist trước mỗi lần build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Tách CSS ra file
          'css-loader', // Xử lý file CSS
          'sass-loader', // Biên dịch SCSS thành CSS
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // Không xuất file comments
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].min.css', // Xuất CSS theo tên entry (base.min.css, home.min.css)
    }),
  ],
};
