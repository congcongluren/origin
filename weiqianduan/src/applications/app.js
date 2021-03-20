import {
  BOOTSTRAPPING,
  LOADING_SOURCE_CODE,
  MOUNTED,
  NOT_BOOTSTRAPPED,
  NOT_LOADED,
  NOT_MOUNTED,
  shouldBeActive,
  SKIP_BECAUSE_BROKEN
} from './app.helpers';
import {
  reroute
} from './navigations/reroute';
/**
 * 
 * @param {*} appName 应用名字
 * @param {*} loadApp 加载的应用
 * @param {*} activeWen 当激活时调用loadApp
 * @param {*} customProps 自定义属性
 * @param {*} status 状态
 */

const apps = []; // 用来存放所有的应用

// 维护应有所有的状态，状态机
export function registerApplication(appName, loadApp, activeWen, customProps) {
  apps.push({
    name: appName,
    loadApp,
    activeWen,
    customProps,
    status: NOT_LOADED
  })

  reroute(); // 加载应用

}

export function getAppChanges() {
  const appsToUnmount = []; // 要卸载的app
  const appsToLoad = []; // 要加载的app
  const appsToMount = []; // 需要挂载的
  apps.forEach(app => {
    // app 需不需要被加载
    const appShouldBeActive = shouldBeActive(app);
    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if (appShouldBeActive) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPPED:
      case BOOTSTRAPPING:
      case NOT_MOUNTED:
        if (appShouldBeActive) {
          appsToMount.push(app);
        }
        break;
      case MOUNTED:
        if (!appShouldBeActive) {
          appsToUnmount.push(app);
        }
    }
  });

  return { appsToLoad, appsToMount, appsToUnmount }
}