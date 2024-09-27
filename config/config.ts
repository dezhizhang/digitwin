/*
 * :file description:
 * :name: /digital/config/config.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-23 16:35:30
 * :last editor: 张德志
 * :date last edited: 2024-09-27 21:49:26
 */
// https://umijs.org/config/
import fs from 'fs';
import path from 'path';

import { defineConfig } from 'umi';
import { OSS_CONFIG } from './oss';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
const isProduction = process.env.NODE_ENV === 'production';
//获取package.json中的version变量,需要根据项目目录结构确认
const PKG = require(path.resolve(process.cwd(), 'package.json'));
const WebpackAliyunOssPlugin = require('webpack-aliyun-oss-plugin');

const cdnBaseUrl = 'https://cdn.xiaozhi.shop';

const lessToJs = require('less-vars-to-js');
const themer = lessToJs(
  fs.readFileSync(path.join(__dirname, `../src/theme/theme.less`), 'utf8'),
);

// 版本号
const VERSION = `v${PKG.version}`;

// 静态文件路径前缀
const VER_PATH = REACT_APP_ENV === 'prod' ? `${cdnBaseUrl}/${PKG.name}/` : `/`; // 获取编译环境配置

const publicPath = isProduction ? VER_PATH : '/';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  antd: {
    // config: {
    //   prefixCls: 'xiaozhi-ant', // 修改HTML里面的类名前缀
    // },
  },
  favicon: `${cdnBaseUrl}/${PKG.name}/favicon.ico`,
  dva: {
    hmr: true,
    immer: true,
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  // lessLoader: {
  //   modifyVars: {
  //     '@ant-prefix': 'xiaozhi-ant',
  //   },
  //   javascriptEnabled: true,
  // },
  layout: false,

  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  chainWebpack(memo: any) {
    memo.output
      .filename(`${VERSION}/js/[name].[hash:8].js`)
      .chunkFilename(`${VERSION}/js/[name].[contenthash:8].chunk.js`);

    // 修改css输出目录
    memo.plugin('extract-css').tap(() => [
      {
        filename: `${VERSION}/css/[name].[contenthash:8].css`,
        chunkFilename: `${VERSION}/css/[name].[contenthash:8].chunk.css`,
        ignoreOrder: true,
      },
    ]);
    
    if (REACT_APP_ENV === 'prod') {
      memo.plugin('WebpackAliyunOssPlugin').use(WebpackAliyunOssPlugin, [
        {
          ...OSS_CONFIG,
          filter: function (build: any) {
            return !/\.html$/.test(build);
          },
        },
      ]);
    }

    memo.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .tap((options: { fallback: any }) => {
        const newOptions = {
          ...options,
          limit: 1000,
          publicPath,
          name: `${VERSION}/img/[name].[hash:8].[ext]`,
          fallback: {
            ...options.fallback,
            options: {
              name: `${VERSION}/img/[name].[hash:8].[ext]`,
              esModule: false,
            },
          },
        };
        return newOptions;
      });

    // 修改svg输出目录
    memo.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .tap((options: any) => ({
        ...options,
        limit: 100000,
        name: `${VERSION}/img/[name].[hash:8].[ext]`,
      }));

    // 修改fonts输出目录
    memo.module
      .rule('fonts')
      .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .tap((options: { fallback: any }) => ({
        ...options,
        name: `${VERSION}/fonts/[name].[hash:8].[ext]`,
        fallback: {
          ...options.fallback,
          options: {
            name: `${VERSION}/fonts/[name].[hash:8].[ext]`,
            esModule: false,
          },
        },
      }));

    memo.module.rule('less').exclude.add(/(@ui)/);
    memo.module
      .rule('lessInUi')
      .test(/\.less$/)
      .include.add(/(@ui)/)
      .end()
      .use('style-loader')
      .loader('style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({ modules: true })
      .end()
      .use('less-loader')
      .loader('less-loader')
      .options({
        lessOptions: {
          javascriptEnabled: true,
          math: 'always',
          strictMath: false,
          modifyVars: { ...themer },
        },
      })
      .end();

    memo.module
      .rule('antdImportInUi')
      .test(/\.(js)$/)
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            'import',
            { libraryName: 'antd', libraryDirectory: 'es', style: true },
          ],
        ],
      });
  },
  theme: {
    'root-entry-name': 'variable',
    '@border-radius-base': '4px',
    ...themer,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  title: '数擎科技',
  ignoreMomentLocale: true,
  proxy: (proxy as any)[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  outputPath: 'build',
  define: {
    PROJECT_VERSION: VERSION,
    REACT_APP_ENV,
  },
  publicPath: publicPath,
  // Fast Refresh 热更新
  fastRefresh: {},
  webpack5: {},
});
