import { toBootstrapPromise } from "../../lifecycles/bootstrap";
import { toLoadPromise } from "../../lifecycles/load";
import { toMountPromise } from "../../lifecycles/mount";
import { toUnmountPromise } from "../../lifecycles/unmount";
import { getAppChanges } from "../app";
import { started } from "../start";

import './navigator-events'

// 核心应用处理方法
export function reroute() {
  /**
   * 需要获取要加载的应用
   * 需要获取要被挂载的应用
   * 哪些应用需要被卸载
  */

  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();
  if(started){
    // app装载
    return performAppChanges(); // 根据路径来装载应用
  }else{
    // 注册应用时，需要预先加载
    return loadApps(); // 预加载应用
  }

  async function loadApps() { // 预加载应用
    let apps = await Promise.all(appsToLoad.map(toLoadPromise)); // 获取到bootstrap，mount和unmount 方法放到app上
    
  }

  async function performAppChanges() { // 根据路径来装载应用
    // 先卸载不需要的应用
    let unmountPromise = appsToUnmount.map(toUnmountPromise); // 需要卸载的app

    // 加载需要的应用
    appsToLoad.map(async (app)=>{ // 将需要加载的应用拿到 =》 加载 =》 启动 =》 挂载
      app = await toLoadPromise(app);

      app = await toBootstrapPromise(app);

      app = toMountPromise(app);

      return app;
    })

    appsToMount.map(async (app)=>{

      app = await toBootstrapPromise(app);
      
      app = toMountPromise(app);
      
      return app
    })
  }
}

// 这个流程是用来初始化操作的，我们还需要 当路径切换时重新加载应用
// 路由拦截 核心：重写路由切换方法