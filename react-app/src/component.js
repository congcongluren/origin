import { findDOM, compareTwoVdom } from "./react-dom";

// 更新器
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 更新的队列
    this.callbacks = []; // 队列的回调
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState);
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
    

    // 触发更新逻辑
    this.emitUpdate();
  }

  // 不管状态属性变化 都会执行此方法
  emitUpdate() {
    this.updateComponent(); // 让组件更新
  }

  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) { // 有等待的更新
      shouldUpdate(classInstance, this.getState());
    }
  }

  // 根据老状态和更新队列，计算新状态
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;

    pendingStates.forEach(nextState=> {
      if(typeof nextState === 'function') {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState }
    })
    pendingStates.length = 0; // 清空更新的队列
    
    // this.callbacks.forEach(callback =>  callback());
    // this.callbacks.length = 0;
    return state;
  }
}

function shouldUpdate (classInstance, nextState ) {
  classInstance.state = nextState; // 真正修改实例的状态
  classInstance.forceUpdate();
} 
export class Component{
  static isReactComponent = true;
  constructor (props) {
    this.props = props;
    this.state = {};

    // 更新器
    this.updater = new Updater(this);
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }

  /**
   * 1 获取老的虚拟DOM
   * 2 根据新的属性和状态计算新的虚拟dom
  */
  forceUpdate() {
    let oldRenderVdom = this.oldRenderVdom;
    // 根据老的虚拟dom，查找到老的真实dom
    let oldDOM = findDOM(oldRenderVdom);
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}