const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    // 这里是一个配置的是一个产品环境
    mode: "production"
})