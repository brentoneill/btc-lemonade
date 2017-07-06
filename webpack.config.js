const path = require('path');

module.exports = {
    entry: ['./src/index.tsx'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, './test'],
                loaders: ['ts-loader']
            },
            { test: /\.jpe?g|\.gif$|\.png|\.svg|\.woff|\.eot|\.ttf/, loader: 'url-loader' },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader' ]
            },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader', 'font?format[]=truetype&format[]=woff&format[]=embedded-opentype'] }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
    },
    devServer: {
        inline: true,
        port: 3000,
        historyApiFallback: true,
        contentBase: './'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
