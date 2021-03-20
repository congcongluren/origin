// hashchange popstate

import {
  reroute
} from "./reroute";

export const routingEventsListeningTo = ['hashchange', 'popstate'];

function urlReroute() {
  reroute([], arguments); // 会根据路径来重新加载不同的应用
}

const captureEventListeners = { // 后续挂载的事件先暂停
  hashchange: [],
  popstate: [] // 当应用切换完成后可以调用
}

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
}

window.removeEventListener = function (eventName, fn) {
  if ( routingEventsListeningTo.indexOf(eventName) >= 0 ) {
    captureEventListeners[eventName] = captureEventListeners[eventName].filter(l => l !== fn);
    return
  }
  return originalRemoveEventListener.apply(this, arguments)
}

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

window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState')
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState')

// 用户可能还会绑定自己的路由事件 vue
// 当我们应用切换后，还需要处理原来的方法，需要在应用切换后再执行