// 引入插件
const webpack = require('webpack')
const path = require('path')
const devConfig= {
    mode: 'development', // 模式 development | production
    //入口配置 string | Array | Object
    devtool: "cheap-module-evel-source-map",//dev环境
    devServer:{
        contentBase: path.resolve(__dirname,"../dist"), //资源文件目录
        open:true,//自动打开游览器
        port: 8081,//服务器端口号
        hot: true,//开启热更新
        host:'192.168.1.4',
        hotOnly:true,
        // proxy:{
        //     '/api': {
        //         target: "http://localhost:9092/"
        //     }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      ]
}
module.exports = devConfig