import path from 'path';
import webpack from 'webpack';

export default {
   devtool: 'cheap-module-eval-source-map',
   entry: [
      'webpack-hot-middleware/client',
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
            loader: 'babel',
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
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
         }, {
            test: /\.html$/,
            loader: 'file',
            query: {
               name: '[name].html',
            },
         },
         {
            test: /\.ttf$/,
            loader: 'url-loader',
            query: {
               limit: 100000,
            },
         },
      ],
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
   ],
   // progress: true,
   resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
   },
   watch: true,
};
