// 读取路由
const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();
// gzip
const CompressionPlugin = require('compression-webpack-plugin');
// 代码体积分析
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: (config) => {
    // webpack自定义配置
    let plugins = [
      new webpack.DefinePlugin({
        // 为uniapp增加vue-router能力
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath', 'meta', 'style'] // 读取page中的path/name/aliasPath/meta/style到路由表里面
          });
          return JSON.stringify(tfPages.routes);
        }, true)
      })
    ];
    // 正式版
    if (process.env.NODE_ENV === 'production') {
      // gzip
      plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240, // 10kb
          minRatio: 0.8,
          deleteOriginalAssets: false // 是否删除源文件
        })
      );

      // 代码体积分析
      plugins.push(new BundleAnalyzerPlugin());
    }
    return {
      plugins
    };
  },
  transpileDependencies: ['z-paging'],

  devServer: {
    // disableHostCheck: true, // 开发环境禁用host检查
    proxy: {
      '/stage-api/': {
        target: 'http://sit.xingrongkj.com:40040/stage-api',
        // target: 'http://192.168.1.113:20000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/stage-api/': ''
        }
      },
      '/fres_file_war_exploded': {
        target: 'http://192.168.1.5:8080',
        changeOrigin: true,
        ws: false
      },
      '/stage-file-api': {
        target: 'http://192.168.1.113:10000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/stage-file-api': ''
        }
      }
    }
  }
};
