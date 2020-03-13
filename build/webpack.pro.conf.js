const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin');
const proConfig= {
    mode: 'production', // 模式 development | production
    devtool: "cheap-module-source-map",//pro环境
    plugins: [
        new OptimizeCSSAssetsPlugin(), //压缩css
        new uglifyjs(), //压缩js
        new webpack.DefinePlugin({
           'process.env': {
               'http_env': JSON.stringify(process.env.http_env)
           }
        })
    ]
}
module.exports = proConfig