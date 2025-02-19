import compose from "./compose";

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 * 1. 很明显 applyMiddleware 是一个高阶函数
 */


// @function applyMiddleware
// @description 函数签名 (...middlewares) => (createStore) => (...args) => ({...store, dispath})
// @description 使用 applyMiddleware(thunk, logger) => (createStore) => (...args) => ({...store, dispath})
// @description createStore(combineReducers(totalReducers), applyMiddleware(thunk, logger))

export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args); // 生成store, args是rest参数 => args是一个数组
    // 定义 dispatch 函数
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      );
    };

    const middlewareAPI = {
      getState: store.getState, // 从store实例上获取 getState 方法
      dispatch: (...args) => dispatch(...args), //
    };

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    // chain
    // 1. 向每个传入的 ( 中间件 ) 中传入 ( middlewareAPI ) 参数
    // 2. 并且将中间件执行的结果返回，组成一个数组
    // 3. chain = [next => action => next(action), next => action => next(action)]

    // 中间件
    // 1. 中间件必须满足 (dispatch, getState) => (next) => (action) => dispatch(action) 这样的格式
    // 2. middleware(middlewareAPI) 返回的是 (next) => (action) => dispatch(action) || ...

    dispatch = compose(...chain)(store.dispatch);
    // 1. compose() 方法
    // 2. 当参数是多个时的函数签名： (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)))
    // 3. compose函数的作用：从右往左，将 ( 右边函数的返回值 ) 作为 ( 左边函数的参数传入 )
    // 4. 比如类似这样的结果：compose(a,b,c)(arg) => a(b(c(args)))

    // 现在假设有三个中间件
    // const M1 = (store) => (next) => (action) => { console.log('A开始');  next(action); console.log('A结束')}
    // const M2 = (store) => (next) => (action) => { console.log('B开始');  next(action); console.log('B结束')}
    // const M3 = (store) => (next) => (action) => { console.log('C开始');  next(action); console.log('C结束')}
    // 注意上面三个中间件的第一个参数 store 中只有getState, dispacth两个函数
    // 1. chain = [next => action => {M1}, next => action => {M2}, next => action => {M3}]
    // 2. 在chain数组中的
    //    M1 = next => action => {console.log('A开始');  next(action); console.log('A结束')}
    //    M2 = next => action => {console.log('B开始');  next(action); console.log('B结束')}
    //    M3 = next => action => {console.log('C开始');  next(action); console.log('C结束')}
    // 2. compose(...chain) = chain.reduce((a, b) => (...args) => a(b(...args)))
    //                      = 第一次: (...args) => M1(M2(...args)) ---- 中执行 M2(...args) = action => { console.log('B开始');  (...args)(action); console.log('B结束') }
    //                             : (...args) => M1(action => { console.log('B开始');  (...args)(action); console.log('B结束') })
    //                             : (...args) => action => {console.log('A开始');  next(action); console.log('A结束')}
    //                         M1M2: (...args) => action => {console.log('A开始');  console.log('B开始');  (...args)(action); console.log('B结束') console.log('A结束')}
    //                      = 第二次: (...args) => M1M2(M3(..args))
    //                             : (...args) => M1M2(action => {console.log('C开始');  (...args)(action); console.log('C结束')})
    //                         最终: (...args) => action => {console.log('A开始');  console.log('B开始');  console.log('C开始');  (...args)(action); console.log('C结束'); console.log('B结束') console.log('A结束') }
    // 3. dispatch = compose(...chain)(store.dispatch)
    //             = (最终)(store.dispatch)
    //             = action => {console.log('A开始');  console.log('B开始');  console.log('C开始');  store.dispatch(action); console.log('C结束'); console.log('B结束') console.log('A结束') }
    //
    // 4. dispatch = action => {
    //      console.log('A开始');
    //      console.log('B开始');
    //      console.log('B开始');
    //      store.dispatch(action)
    //      console.log('C结束');
    //      console.log('B结束');
    //      console.log('A结束');
    //    }


    /**
      ----
      compose()
      ----
      export default function compose(...funcs) {
        // 没传参数，就返回一个函数，这个函数直接将参数返回
        if (funcs.length === 0) {
          return arg => arg
        }
        // 参数个数为1，直接返回参数
        if (funcs.length === 1) {
          return funcs[0]
        }
        // 多个参数
        return funcs.reduce((a, b) => (...args) => a(b(...args)))
      }
    *
    */


    return {
      ...store,
      dispatch,
    };
    // 返回
    // 1. store
    // 2. 覆盖store中的 dispatch 方法

    // dispatch就是一个函数，经过redux中间件执行各种副作用后，调用store对象上的 dispatch()方法
    // 而store对象又是通过 createStore()方法生成的，里面有dispatch()方法的实现
    
    // store上的dispatch方法，主要干了两件事情
    // 1. 传递action给reducer，更新state
    // 2. state更新后，执行监听数组中的所有监听函数listener
  };
}
