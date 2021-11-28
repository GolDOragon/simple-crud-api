// const DotenvWebpackPlugin = require('dotenv-webpack');
import DotenvWebpackPlugin from 'dotenv-webpack';
import path from 'path';

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(path.resolve(), '../build'),
  },
  plugins: [new DotenvWebpackPlugin({ systemvars: true, silent: true })],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};

export default config;
