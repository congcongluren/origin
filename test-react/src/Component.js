import {
  compareTwoVdom
} from "./react-dom";
export let updateQueue = {
  isBatchingUpdate: false, // 批量更新模式
  updaters: new Set(),
  batchUpdate() { // 批量更新
    for (let updater of this.updaters) {
      updater.updateComponent();
    }
    this.isBatchingUpdate = false;
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // 类组件的实例
    this.pendingStates = []; // 等待生效的状态， 也可能是函数
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState);
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
    this.emitUpdate();
  }

  // 无论属性变了，还是状态变了，都会更新
  emitUpdate(newProps) {
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    let {
      classInstance,
      pendingStates,
      // callbacks
    } = this;
    if (pendingStates.length > 0) {
      // callbacks.forEach(cb => cb());
      // callbacks.length = 0;
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState() { // 计算最新的状态
    let {
      classInstance,
      pendingStates
    } = this;
    let {
      state
    } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
        nextState = nextState.call(classInstance, state)
      }
      state = {
        ...state,
        ...nextState
      }
    });
    pendingStates.length = 0;
    return state;
  }
}

/**
 * 判断组件是否要更新
 * @param {*} classInstance 组件实例
 * @param {*} nextState 新的状态
 */
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState; //无论是否更新dom， 组件实例都会更新
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(classInstance.Props, classInstance.state)
  ) return;
  
  classInstance.forceUpdate()
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState, cb) {
    this.updater.addState(partialState, cb);
  }
  forceUpdate() {
    this.componentWillUpdate && this.componentWillUpdate();

    let newRenderVdom = this.render(); // 重新调用render方法，得到新的Vdom
    let oldRenderVdom = this.oldRenderVdom;
    
    let currentRenderVdom = compareTwoVdom(oldRenderVdom.dom.parentNode,oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = currentRenderVdom;

    this.componentDidUpdate && this.componentDidUpdate();
  }
}

export default Component;