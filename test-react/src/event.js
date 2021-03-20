import {
  updateQueue
} from './Component';
/**
 * 给真实dom添加事件处理函数
 * 合成函数
 * 1. 做兼容处理
 *      事件机制，处理浏览器的兼容
 * 2. 可以在写的事件处理函数之前和之后做一些事情
 * @param {*} dom 真实dom
 * @param {*} eventType 事件类型
 * @param {*} listener 监听函数
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener;
  if (!document[eventType]) {
    // 事件委托，不管给哪个dom元素绑定事件，都会代理到document上
    document[eventType] = dispatchEvent
  }
}

let syntheticEvent = {
  stopping: false,
  stop(){
    this.stopping = true;
    console.log('阻止冒泡');
  }
};

function dispatchEvent(event) {
  // 事件委托
  let {
    target,
    type
  } = event; // 事件源
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  createSyntheticEvent(event);

  while (target) {
    let {
      store
    } = target;
    let listener = store && store[eventType];
    listener && listener.call(target, syntheticEvent);
    target = target.parentNode

    if (syntheticEvent.stopping) break;
  }
  for (let key in syntheticEvent) {
    syntheticEvent[key] = null;
  }
  updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
  // 创建事件对象
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  // syntheticEvent.stopping = false;
  // syntheticEvent.stopPropagation = () => {
  //   syntheticEvent.stopping = true;
  //   console.log('阻止冒泡');
  // }
}