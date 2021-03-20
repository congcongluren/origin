(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

  // 描述应用整个状态
  const NOT_LOADED = 'NOT_LOADED'; // 应用初始状态
  const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'; // 加载资源
  const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'; // 还没有调用bootstrap方法
  const BOOTSTRAPPING = 'BOOTSTRAPPING'; // 启动中
  const NOT_MOUNTED = 'NOT_MOUNTED'; // 没有调用mount方法
  const MOUNTING = 'MOUNTING'; // 正在挂载中
  const MOUNTED = 'MOUNTED'; // 挂载完毕
  const UNMOUNTING = 'UNMOUNTING'; // 解除挂载

  // 当前应用是否需要被激活
  function shouldBeActive(app) {
    // 返回true，应用开始初始化一系列操作
    return app.activeWen(window.location)
  }

  async function toBootstrapPromise(app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
      return app;
    }
    app.status = BOOTSTRAPPING;
    await app.bootstrap(app.customProps);
    app.status = NOT_MOUNTED;

    return app;
  }

  function flattenFnArray(fns) {
    // 函数数组转换成函数
    fns = Array.isArray(fns) ? fns : [fns];
    // 通过promise链来链式调用  多个方法组合成一个方法
    return (props) => fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
  }

  async function toLoadPromise(app) {
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

  async function toMountPromise(app) {
    if (app.status !== NOT_MOUNTED) {
      return app;
    }
    app.status = MOUNTING;
    await app.mount(app.customProps);
    app.status = MOUNTED;

    return app;
  }

  async function toUnmountPromise(app) {
    // 当前应用没有被挂载直接跳过
    if (app.status !== MOUNTED){
      return app;
    }

    app.status = UNMOUNTING;
    await app.unmount(app.customProps);
    app.status = NOT_MOUNTED;
    return app;
  }

  let started = false;
  function start () {
    // 需要挂载应用  
    started = true;
    reroute(); // 除了加载应用，还需要挂载应用
  }

  // hashchange popstate

  const routingEventsListeningTo = ['hashchange', 'popstate'];

  function urlReroute() {
    reroute(); // 会根据路径来重新加载不同的应用
  }

  const captureEventListeners = { // 后续挂载的事件先暂停
    hashchange: [],
    popstate: [] // 当应用切换完成后可以调用
  };

  // 处理应用加载的逻辑在最前面
  window.addEventListener('hashchange', urlReroute);
  window.addEventListener('popstate', urlReroute);

  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  window.addEventListener = function (eventName, fn) {

    if (
      routingEventsListeningTo.indexOf(eventName) >= 0 &&
      !captureEventListeners[eventName].some(listener => listener == fn)
    ) {
      captureEventListeners[eventName].push(fn);
      return
    }

    return originalAddEventListener.apply(this, arguments)
  };

  window.removeEventListener = function (eventName, fn) {
    if ( routingEventsListeningTo.indexOf(eventName) >= 0 ) {
      captureEventListeners[eventName] = captureEventListeners[eventName].filter(l => l !== fn);
      return
    }
    return originalRemoveEventListener.apply(this, arguments)
  };

  // 如果hash变化时可以切换
  // 浏览器路由，浏览器路由是h5api的时候不会触发popstate
  function patchedUpdateState(updateState,methodName) {
    return function() {
      const urlBefore = window.location.href;
      updateState.apply(this,arguments);
      const urlAfter = window.location.href;
      if(urlBefore !== urlAfter) {
        // 重新加载应用，加载事件源
        urlReroute(new PopStateEvent('popstate'));
      }
    }
  } 

  window.history.pushState = patchedUpdateState(window.history.pushState);
  window.history.replaceState = patchedUpdateState(window.history.replaceState);

  // 用户可能还会绑定自己的路由事件 vue
  // 当我们应用切换后，还需要处理原来的方法，需要在应用切换后再执行

  // 核心应用处理方法
  function reroute() {
    /**
     * 需要获取要加载的应用
     * 需要获取要被挂载的应用
     * 哪些应用需要被卸载
    */

    const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();
    if(started){
      // app装载
      return performAppChanges(); // 根据路径来装载应用
    }else {
      // 注册应用时，需要预先加载
      return loadApps(); // 预加载应用
    }

    async function loadApps() { // 预加载应用
      await Promise.all(appsToLoad.map(toLoadPromise)); // 获取到bootstrap，mount和unmount 方法放到app上
      
    }

    async function performAppChanges() { // 根据路径来装载应用
      // 先卸载不需要的应用
      appsToUnmount.map(toUnmountPromise); // 需要卸载的app

      // 加载需要的应用
      appsToLoad.map(async (app)=>{ // 将需要加载的应用拿到 =》 加载 =》 启动 =》 挂载
        app = await toLoadPromise(app);

        app = await toBootstrapPromise(app);

        app = toMountPromise(app);

        return app;
      });

      appsToMount.map(async (app)=>{

        app = await toBootstrapPromise(app);
        
        app = toMountPromise(app);
        
        return app
      });
    }
  }

  // 这个流程是用来初始化操作的，我们还需要 当路径切换时重新加载应用
  // 路由拦截 核心：重写路由切换方法

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
  function registerApplication(appName, loadApp, activeWen, customProps) {
    apps.push({
      name: appName,
      loadApp,
      activeWen,
      customProps,
      status: NOT_LOADED
    });

    reroute(); // 加载应用

  }

  function getAppChanges() {
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

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
