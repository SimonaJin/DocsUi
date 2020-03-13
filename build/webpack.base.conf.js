const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')

const devConfig = require('./webpack.dev.conf')
const proConfig = require('./webpack.pro.conf')

let devMode = process.env.http_env !== 'development'
console.log(devMode)
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// 创建多个实例
const cssExtractPlugin = new miniCssExtractPlugin({
    filename: devMode? '[name].[chunkhash:8].css':'[name].css',
    chunkFilename: '[id].css'
})
const htmlweb = new htmlWebpackPlugin({
    title: "我是首页", //用来生成页面的title元素 必须在模版页面中使用模版引擎的语法 <%= htmlWebpackPlugin.options.title %>
    filename: "index.html",// 输出html文件名，默认是index.html，也可以是直接配置带有子目录 不支持[name][.ext]
    template: path.resolve(__dirname, '../index.html'), // 模版文件路径，支持加载器
    hash:true,// 为true将添加一个唯一的webpack编译hash到所有包含脚本和css文件，对于解除cache很有用
})

const baseConfig = {
    entry:{
        index: "./src/main.js" //main 打包后的名称
    },
     // 出口配置, 必须是绝对路径
    output:{
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js", //[]占位符
        // publicPath: "http://www/cdn.com" //打包后的文件已publicPath做前缀
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'common': resolve('src/common'),
          'components': resolve('src/components')
        }
    },
    optimization: {
        splitChunks:{ // 代码拆分
            chunks: "all", //对同步 initial 异步 async 所有的模块有效 all
            // minSize: 30000, //最小尺寸
            // maxSize:0,//对模块进行二次分割时使用，不推荐使用
            // minChunks:1,//打包生产的chunk文件最少有几个chunk引用了这个模块 如果值为2了，就会被分割
            // maxAsyncRequests: 3,//最大初始化请求书，入口文件同步请求，默认3
            // automaticNameDelimiter: '-',//打包分割符号
            // name:true,//打包后的名称，除了布尔值，还可以接收一个函数function 
            // cacheGroup:{
            //     vendors:{
            //         test:/[\\/]node_modules[\\/]/,
            //         name: 'vendor',//要缓存的 分割出来 chunk名字
            //         priority: -10 //缓存组优先级 数字越大优先级越高
            //     },
            //     other:{ //只支持同步的引用
            //         chunks:'initial',//必须三选一：initial | all | async默认值
            //         test: /vue|loadsh/, //正则规则验证，如果符合就提取chunk
            //         name:"other",
            //         minSize: 30000,
            //         minChunks: 1,
            //     },
            //     default:{
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true //可设置是否重用chunk
            //     }
            // }
        },
        usedExports: true,
    },
    module:{//  处理模块
        rules:[
            {
                // 识别.vue文件
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, '../src'),   // 限制打包范围，提高打包速度
                //exclude: /node_modules/,                     // 排除node_modules文件夹            
                use: [
                    devMode ? miniCssExtractPlugin.loader:'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options:{
                            indent:"postcss",
                            plugins:[require('autoprefixer')],
                            browser:['last 10 versions']
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap: true
                        }
                    }
                    
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                include: path.resolve(__dirname, '../src'),
                loader: "babel-loader",
            },
            {
                test:/\.(png|gif|jpe?g)/, // ?e可有可无
                use: {
                    loader: "url-loader", 
                    options:{
                        name:"[name]_[hash].[ext]", //[hash]解决缓存，[ext]保留旧文件的文件后缀
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:"image/" //图片放到image/目录下
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 文件大小小于limit参数，url-loader将会把文件转为DataUR
                    limit: 10000,
                    name: '[name]-[hash:5].[ext]',
                    output: 'fonts/'
                }
            }       
        ]
    },
    plugins: [
        cssExtractPlugin,
        htmlweb,
        // 将定义过的其它规则复制并应用到 .vue 文件里相应语言的块
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
}
// 基于环境变量，通过注入变量自动组合
module.exports = (env) => {
    if(env && env.production){
        return merge(baseConfig, proConfig)
    }else{
        return merge(baseConfig, devConfig)
    }
}