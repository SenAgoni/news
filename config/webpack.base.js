/**
 * 此文件存放的是最基础的文件
 */
const path = require('path');
// 这里引入path模块,因为下面要用到resolve这一个方法来找到一个绝对路径
//  导入提取样式的webpack插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 其他打包文件的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入vue-loader插件 用于渲染vue文件的
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        // 这里的入口文件有两个,所以相同的出口文件也会是要有两个才可以
        main: './src/main.js',
    },
    output: {
        //这里是把两个文件同样地打包到一个js文件夹下面可以写其他的文件名也是可以的
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    //添加模块解释
    resolve: {
        alias: {
            // 1.以后@符号就是src目录
            '@': path.resolve(__dirname, "../src"),
        },
        // 2.省略导入模块时的后缀名。 忽略扩展名
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules: [{
                // 这里是验证以css文件结尾的文件的正则表达式
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ // 提取css
                    fallback: "vue-style-loader",
                    use: ["css-loader"]
                })
            },
            {
                // 这里是验证以css文件结尾的文件的正则表达式
                test: /\.less$/,
                use: ExtractTextPlugin.extract({ // 提取css
                    fallback: "vue-style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            // 匹配图片路径
            {
                test: /\.(png|svg|jpg|gif)$/, // 匹配图片文件
                use: [{
                    loader: "file-loader", // 处理图片文件返回链接
                    options: {
                        publicPath: "./images/", //  引入图片时会在路径前面加上该选项
                        outputPath: "images" //  输出到dist下的images目录 在dist下面的路径的输出
                    }
                }]
            },
            // 匹配vue为结尾的文件
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('style/style.css'), // 提取到dist的style文件夹中
        // + 新增配置
        new HtmlWebpackPlugin({
            template: "public/index.html" // template指定默认html模板
        }),
        // vue加载器插件
        new VueLoaderPlugin(),
        // 这一个是复制文件
        new CopyPlugin([
            { from: 'static', to: 'static' },
        ]),
    ],
    //提取公共模块配置
    optimization: {
        splitChunks: {
            chunks: 'all' // 提取所有文件的共同模块
        }
    },
}