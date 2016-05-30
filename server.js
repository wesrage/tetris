import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev.babel';
const HTTP_PORT = 3000;

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
   noInfo: true,
   stats: { colors: true },
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('dist'));

app.listen(HTTP_PORT, () => {
   console.log(`listening on ${HTTP_PORT}`); // eslint-disable-line
});
