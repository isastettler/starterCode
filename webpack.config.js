
const webpack = require('webpack');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                 test: /\.jsx?$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader',
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
    ],
};