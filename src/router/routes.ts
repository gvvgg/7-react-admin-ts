import { lazy } from 'react';
import { IRouteModule } from '../global/interface'
import adminRoutes from './admin-routes'
import bigScreenRoutes from './big-screen-routes'

const Login = lazy(() => import(/* webpackChunkName: 'Login' */'../pages/login'))
const Layout = lazy(() => import(/* webpackChunkName: 'Layout' */'../pages/layout'))
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'../pages/404'))

const totalRoutes: IRouteModule[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/',
    component: Layout,
    routes: [ 
      // routes：用于嵌套路由，注意不是嵌套菜单
      // subs：用于注册路由，并且用于menu树形菜单，在不同系统的路由中定义了subs
      // 嵌套路由通过 renderRoutes函数 做处理
      ...adminRoutes,
      ...bigScreenRoutes,
    ]
  }
]


export default totalRoutes