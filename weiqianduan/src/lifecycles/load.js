import {
  LOADING_SOURCE_CODE,
  NOT_BOOTSTRAPPED
} from "../applications/app.helpers";

function flattenFnArray(fns) {
  // 函数数组转换成函数
  fns = Array.isArray(fns) ? fns : [fns];
  // 通过promise链来链式调用  多个方法组合成一个方法
  return (props) => fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
}

export async function toLoadPromise(app) {
  if (app.loadPromise) {
    return app.loadPromise; // 缓存机制
  }

  return (
    app.loadPromise = Promise.resolve().then(async () => {
      app.status = LOADING_SOURCE_CODE;
      let {
        bootstrap,
        mount,
        unmount
      } = await app.loadApp(app.customProps);
      app.status = NOT_BOOTSTRAPPED; // 没有调用bootstrap方法
    
      // 将多个promise组合到一起
      app.bootstrap = flattenFnArray(bootstrap);
      app.mount = flattenFnArray(mount);
      app.unmount = flattenFnArray(unmount);
      
      delete app.loadPromise;
      return app
    })
  )
}