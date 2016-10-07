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
         { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
         { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
         { test: /\.html$/, loader: 'file?name=[name].html' },
         { test: /\.ttf$/, loader: 'url?limit=100000' },
      ],
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
   ],
   progress: true,
   resolve: {
      modulesDirectories: [
         'node_modules',
      ],
      extensions: ['', '.js', '.jsx'],
   },
   watch: true,
};
