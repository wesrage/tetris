import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract({
               fallbackLoader: 'style-loader',
               loader: ['css-loader', 'sass-loader'],
            }),
         }, {
            test: /\.html$/,
            loader: 'file',
            query: {
               name: '[name].html',
            },
         }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            query: {
               limit: 10000,
               mimeType: 'application/font-woff',
            },
         }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
         },
      ],
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('bundle.css'),
   ],
   // progress: true,
   resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
   },
   watch: true,
};
