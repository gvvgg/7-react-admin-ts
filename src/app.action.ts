import actionType from './app.constant'

// 系统选择
// admin
// bigScreen
export const changeSystemType = (payload: any) => {
  return {
    type: actionType.SYSTEM_TYPE,
    payload,
  }
}

// 获取登陆信息
export const getLoginMessage = (loginMessage: { token: string; roles: string }) => {
  return {
    type: actionType.GET_LOGIN_MESSAGE,
    payload: loginMessage,
  }
}

// 强制更新
export const getForceUpdate = (updateCount: number) => {
  return {
    type: actionType.GET_LOGIN_MESSAGE,
    payload: updateCount,
  }
}

// 如果最后一级的面包屑是动态路由 :id 的页面，通过useParams获取 params
// 注意：useParams 只在动态路由页面可以获取，父级页面和其他页面都不能获取到
export const getLastBreadCrumbUseParams = (params: string) => {
  return {
    type: actionType.GETLASTBREADCRUMBUSEPARAMS,
    payload: params,
  }
}

// 获取menu的selectkeys
export const getSelectKeys = (params: any[]) => {
  return {
    type: actionType.SELECT_KEYS,
    payload: params,
  }
}
