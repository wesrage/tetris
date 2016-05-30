import path from 'path';
import webpack from 'webpack';

export default {
   entry: [
      './src/index',
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/static/',
   },
   module: {
      loaders: [
         { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
         { test: /\.html$/, loader: 'file?name=[name].html' },
      ],
   },
   plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production'),
         },
      }),
      new webpack.optimize.UglifyJsPlugin({
         compressor: {
            warnings: false,
         },
      }),
   ],
   resolve: {
      modulesDirectories: [
         'node_modules',
      ],
      extensions: ['', '.js', '.jsx'],
   },
};
