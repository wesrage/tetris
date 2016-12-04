import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
   entry: [
      './src/index',
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: [
                  ['es2015', { modules: false }],
                  'react',
                  'stage-0',
               ],
               env: {
                  development: {
                     presets: ['react-hmre'],
                  },
               },
            },
         }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
               fallbackLoader: 'style-loader',
               loader: ['css-loader'],
            }),
         }, {
            test: /\.(html|wav)$/,
            loader: 'file-loader',
            query: {
               name: '[name].[ext]',
            },
         }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
         }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
         },
      ],
   },
   plugins: [
      new ExtractTextPlugin('bundle.css'),
   ],
   resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
         'styled-components$': 'styled-components/lib/index.js',
      },
   },
};
