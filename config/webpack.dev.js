/**
 * 此文件用于书写配置环境的
 */
// 这里引入的是专门用于合并两个配置文件的对象中的
const merge = require('webpack-merge');
// 这里是一些基本的配置的引入
const base = require('./webpack.base.js');
// 这里是要向基本的配置中添加配置 后面的对象,与前面的不一样的会合并起来,一样的就会覆盖
module.exports = merge(base, {
    // 这里是配置一个开发环境
    mode: "development",
    
    // 生成map映射文件
    devtool: "source-map",
	
    // 开发服务器配置
    devServer: {
        port: 8000, // 默认端口是8080
        stats: 'errors-only' //这是表示只打印错误信息
   },
})