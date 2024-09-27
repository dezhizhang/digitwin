/*
 * :file description: 
 * :name: /digital/config/routes.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-26 16:04:17
 * :last editor: 张德志
 * :date last edited: 2024-09-27 21:50:24
 */
export default [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        path: '/',
        redirect: '/smart-city/guangzhou',
      },
      {
        path: '/home',
        name: '主页',
        component: '@/pages/home',
      },
      {
        path: '/smart-city',
        name: '智慧城市',
        routes: [
          {
            path: '/smart-city/guangzhou',
            name: '广州智慧城市',
            component: '@/pages/smart-city/guangzhou',
          },
          {
            path: '/smart-city/guizhou',
            name: '贵阳智慧城市',
            component: '@/pages/smart-city/guizhou',
          },
          {
            path: '/smart-city/shanghai',
            name: '上海智慧城市',
            component: '@/pages/smart-city/shanghai',
          },
          {
            path: '/smart-city/shenzhen',
            name: '深圳智慧城市',
            component: '@/pages/smart-city/shenzhen',
          },
          {
            path: '/smart-city/beijing',
            name: '北京智慧城市',
            component: '@/pages/smart-city/beijing',
          },
          {
            path: '/smart-city/hangzhou',
            name: '杭州智慧城市',
            component: '@/pages/smart-city/hangzhou',
          },
          {
            path: '/smart-city/xian',
            name: '西安智慧城市',
            component: '@/pages/smart-city/xian',
          },
          {
            path: '/smart-city/chongqing',
            name: '重庆智慧城市',
            component: '@/pages/smart-city/chongqing',
          },
        ],
      },
      {
        path: '/smart-finance',
        name: '智慧金融',
        routes: [
          {
            path: '/smart-finance/shanghai',
            name: '上海智慧金融',
            component: '@/pages/smart-finance/shanghai',
          },
        ],
      },
      {
        path: '/smart-park',
        name: '智慧园区',
        routes: [
          {
            path: '/smart-park/suzhou',
            name: '江苏智慧园区',
            component: '@/pages/smart-park/suzhou',
          },
        ],
      },
      {
        path: '/smart-traffic',
        name: '智慧交通',
        routes: [
          {
            path: '/smart-traffic/beijing',
            name: '北京智慧公交',
            component: '@/pages/smart-traffic/beijing',
          },
        ],
      },
      {
        path: '/smart-school',
        name: '智慧校园',
        routes: [
          {
            path: '/smart-school',
            name: '北京智慧校园',
            component: '@/pages/smart-school/shanghai',
          },
        ],
      },
      {
        path:'/smart-factory',
        name:'智慧工厂',
        routes:[
          {
            path:'/smart-factory/guangzhou',
            name:'广州智慧工厂',
            component:'@/pages/smart-factory/guangzhou'
          }
        ],
      },
      // {
      //   path:'/smart-health',
      //   name:'智慧医疗',
      //   routes:[
      //     {
            
      //     }
      //   ]
      // }
    ],
  },
];
