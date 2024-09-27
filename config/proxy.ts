
export default {
    dev: {
      // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
      '/api/v1': {
        // 要代理的地址
        target: 'http://127.0.0.1:8086',
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
    test: {
      '/api/': {
        target: 'http://m.xiaozhi.shop',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
    pre: {
      '/api/': {
        target: 'your pre url',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
  };
  