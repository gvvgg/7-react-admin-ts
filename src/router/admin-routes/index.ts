import { IRouteModule } from '@/global/interface'
import { lazyLoad } from '@/utils'

// const AdminHome = lazyLoad('@/pages/admin-system/home')
const UiAntdForm = lazyLoad('@/pages/admin-system/ui-antd-form')
const UiAntdTable = lazyLoad('@/pages/admin-system/ui-antd-table/index.tsx')
const UiAntdProTable = lazyLoad('@/pages/admin-system/ui-antd-protable/index.tsx')
const UiVant = lazyLoad('@/pages/admin-system/ui-vant')
const ReactHooks = lazyLoad('@/pages/admin-system/react-hooks')
const ReactReduxHooks = lazyLoad('@/pages/admin-system/react-redux-hooks')
const ReactRouterHooks = lazyLoad('@/pages/admin-system/react-router-hooks')
const ReactRouterHooksDetail = lazyLoad('@/pages/admin-system/react-router-hooks/detail')
const InterviewReact = lazyLoad('@/pages/admin-system/interview-react')
const JsEs5 = lazyLoad('@/pages/admin-system/js-es5')
const JsEs6 = lazyLoad('@/pages/admin-system/js-es6')
const JsEs6Detail = lazyLoad('@/pages/admin-system/js-es6-detail')
const JsEs5Detail = lazyLoad('@/pages/admin-system/js-es5-detail')
const Material = lazyLoad('@/pages/admin-system/material-bigscreen')
const ServerEgg = lazyLoad('@/pages/admin-system/server-egg')

const adminRoutes: IRouteModule[] = [
  {
    title: '首页',
    icon: 'anticon-home--line',
    key: '/admin-home', // ------- title,icon,key主要用于menu中
    path: '/admin-home', // ------- path,component用于Route的注册
    component: UiAntdTable, // antd table来对接 java提供的数据
    meta: {
      // ------------------- meta 用于权限过滤，和menu,router,breadcrumb强相关
      needLoginAuth: true,
      rolesAuth: ['user', 'admin'],
    },
    // visiable -- visiable用于detail路由的显示隐藏
    // ----------- 除了通过 visiable 来判断detail菜单的显示隐藏,还可以通过动态路由参数 ( /:id ) 来做
    // ----------- 存在 ( /:id ) 的路由都不在 ( menu ) 中显示

    // 注意；存在动态路由时，需要设置 exact 精确匹配
    // 注意：( 重要 ) 每一个 detail 都要记得用 useParams 存入 localStorage
  },
  {
    title: 'Interviews',
    icon: 'anticon-custom-form',
    key: '/admin-interview',
    path: '/admin-interview',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin'],
    },
    subs: [
      {
        title: 'Hasaki',
        icon: 'anticon-react',
        key: '/admin-interview/react',
        path: '/admin-interview/react',
        component: InterviewReact,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
    ],
  },
  {
    title: 'React',
    icon: 'anticon-react1',
    key: '/admin-react',
    path: '/admin-react',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin'],
    },
    subs: [
      {
        title: 'React-Hooks',
        icon: 'anticon-react1',
        key: '/admin-react/hooks',
        path: '/admin-react/hooks',
        component: ReactHooks,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
      {
        title: 'Redux-Hooks',
        icon: 'anticon-redux',
        key: '/admin-react/admin-react-redux/hooks',
        path: '/admin-react/admin-react-redux/hooks',
        component: ReactReduxHooks,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
      {
        title: 'Router-Hooks',
        icon: 'anticon-ic24-wifi',
        key: '/admin-react/admin-react-router/hooks',
        path: '/admin-react/admin-react-router/hooks',
        exact: true, // 注意；存在动态路由时，需要设置 exact 精确匹配
        component: ReactRouterHooks,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
      {
        title: 'HooksDetail',
        icon: 'anticon-yooxi',
        key: '/admin-react/admin-react-router/hooks/:id',
        path: '/admin-react/admin-react-router/hooks/:id',
        component: ReactRouterHooksDetail,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },

      // {
      //   title: 'React-Redux',
      //   icon: 'anticon-react1',
      //   key: '/admin-react/admin-react-redux',
      //   path: '/admin-react/admin-react-redux',
      //   meta: {
      //     needLoginAuth: true,
      //     rolesAuth: ['user', 'admin']
      //   },
      //   subs: [
      //     {
      //       title: 'Hooks',
      //       icon: 'anticon-sharescreen',
      //       key: '/admin-react/admin-react-redux/hooks',
      //       path: '/admin-react/admin-react-redux/hooks',
      //       component: ReactReduxHooks,
      //       meta: {
      //         needLoginAuth: true,
      //         rolesAuth: ['user', 'admin']
      //       },
      //     }
      //   ]
      // },
      // {
      //   title: 'React-Router',
      //   icon: 'anticon-zuixinyouhui',
      //   key: '/admin-react/admin-react-router',
      //   path: '/admin-react/admin-react-router',
      //   meta: {
      //     needLoginAuth: true,
      //     rolesAuth: ['user', 'admin']
      //   },
      //   subs: [{
      //     title: 'Hooks',
      //     icon: 'anticon-yooxi',
      //     key: '/admin-react/admin-react-router/hooks',
      //     path: '/admin-react/admin-react-router/hooks',
      //     exact: true,  // 注意；存在动态路由时，需要设置 exact 精确匹配
      //     component: ReactRouterHooks,
      //     meta: {
      //       needLoginAuth: true,
      //       rolesAuth: ['user', 'admin']
      //     },
      //   },{
      //     title: 'HooksDetail',
      //     icon: 'anticon-yooxi',
      //     key: '/admin-react/admin-react-router/hooks/:id',
      //     path: '/admin-react/admin-react-router/hooks/:id',
      //     component: ReactRouterHooksDetail,
      //     meta: {
      //       needLoginAuth: true,
      //       rolesAuth: ['user', 'admin']
      //     },
      //   }]
      // },
    ],
  },
  {
    title: 'JS',
    icon: 'anticon-js',
    key: '/admin-js',
    path: '/admin-js',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['admin'],
    },
    subs: [
      {
        title: 'ES6',
        icon: 'anticon-6',
        key: '/admin-js/es6',
        path: '/admin-js/es6',
        component: JsEs6,
        exact: true, // 注意；存在动态路由时，需要设置 exact 精确匹配
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin'],
        },
      },
      {
        title: 'ES6详情',
        key: '/admin-js/es6/:id',
        path: '/admin-js/es6/:id',
        component: JsEs6Detail,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin'],
        },
      },
      {
        title: 'ES5',
        icon: 'anticon-js',
        key: '/admin-js/es5',
        path: '/admin-js/es5',
        component: JsEs5,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin'],
        },
      },
      {
        title: 'ES5详情',
        icon: 'anticon-js',
        key: '/admin-js/es5/:id',
        path: '/admin-js/es5/:id',
        component: JsEs5Detail,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin'],
        },
      },
    ],
  },
  {
    title: 'UI',
    icon: 'anticon-uikit',
    key: '/admin-ui',
    path: '/admin-ui',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin'],
    },
    subs: [
      {
        // subs用于注册路由，并且用于menu树形菜单
        title: 'Antd',
        icon: 'anticon-ant-design',
        key: '/admin-ui/antd',
        path: '/admin-ui/antd',
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin'],
        },
        subs: [
          {
            title: 'Table',
            icon: 'anticon-custom-form',
            key: '/admin-ui/antd/table',
            path: '/admin-ui/antd/table',
            component: UiAntdTable,
            meta: {
              needLoginAuth: true,
              rolesAuth: ['admin'],
            },
          },
          {
            title: 'Pro-Table',
            icon: 'anticon-custom-form',
            key: '/admin-ui/antd/proTable',
            path: '/admin-ui/antd/proTable',
            component: UiAntdProTable,
            meta: {
              needLoginAuth: true,
              rolesAuth: ['admin'],
            },
          },
          {
            title: 'Form表单',
            icon: 'anticon-zidingyibiaodan',
            key: '/admin-ui/antd/form',
            path: '/admin-ui/antd/form',
            component: UiAntdForm,
            meta: {
              needLoginAuth: true,
              rolesAuth: ['admin'],
            },
          },
        ],
      },
      {
        title: 'Vant',
        icon: 'anticon-relevant-outlined',
        key: '/admin-ui/vant',
        path: '/admin-ui/vant',
        component: UiVant,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
    ],
  },
  {
    title: '资料',
    icon: 'anticon-relevant-outlined',
    key: '/admin-material',
    path: '/admin-material',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin'],
    },
    subs: [
      {
        title: '大屏',
        icon: 'anticon-icon-test',
        key: '/admin-material/bigscreen',
        path: '/admin-material/bigscreen',
        component: Material,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
      {
        title: '服务端egg',
        icon: 'anticon-icon-test',
        key: '/admin-material/serverse-egg',
        path: '/admin-material/serverse-egg',
        component: ServerEgg,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin'],
        },
      },
    ],
  },
]

export default adminRoutes
