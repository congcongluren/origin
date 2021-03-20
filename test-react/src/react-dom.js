import {
  addEvent
} from './event';
/**
 * 
 * @param {*} vdom 要渲染虚拟dom对象
 * @param {*} container 容器
 */
function render(vdom, container) {
  // console.log(vdom,'挂载真实dom',container);
  // let vDom = {...vdom}
  let dom = createDOM(vdom);
  container.appendChild(dom);
  dom.componentDidMount && dom.componentDidMount()
}

/**
 * @param {*} vdom 虚拟dom
 */
export function createDOM(vdom) {
  //TODO 处理dom是虚拟dom，是数字或者字符串
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  const {
    type,
    props
  } = vdom;

  let dom;
  // 判断函数组件，还是原生组件，创建真实dom
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);
  }

  // 元素挂载属性
  updateProps(dom, {},props);
  // 判断子元素  挂载元素
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children
  } else if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    document.textContent = props.children ? props.children.toString() : '';
  }

  vdom.dom = dom;
  return dom
}


/**
 * 把类型为  自定义组件  的虚拟dom转换为真实dom
 * @param {*} vdom 虚拟dom
 */
function mountFunctionComponent(vdom) {
  let {
    type,
    props
  } = vdom;
  let oldRenderVdom = type(props);
  vdom.renderVdom = oldRenderVdom;
  return createDOM(oldRenderVdom);
}

/**
 * 处理class组件
 * @param {*} vdom 虚拟dom
 */
function mountClassComponent(vdom) {
  let {
    type,
    props
  } = vdom;
  let classInstance = new type(props); // 创建实例

  // vdom.classInstance = classInstance;

  classInstance.componentWillMount && classInstance.componentWillMount();

  let renderVdom = classInstance.render(); // 运行render， 获取vdom
  classInstance.oldRenderVdom = renderVdom;

  let dom = createDOM(renderVdom); // 通过vdom，获取真实dom
  
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance)
  }
  
  classInstance.oldDOM = dom;
  // classInstance.dom = dom; // 实例上添加真实dom
  return dom;
}

/**
 * 
 * @param {*} childrenVdom 子元素的虚拟dom
 * @param {*} parentDOM 父元素的真实dom
 */
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    const childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}


/**
 * @param {*} dom 真实dom
 * @param {*} newProps 新属性对象
 */
function updateProps(dom,  oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue;
    if (key === 'style') {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    } else {
      dom[key] = newProps[key]
    }
  }
}

/**
 * 对当前的组件见进行dom-diff
 * @param {*} parentDOM 当前组件挂载的父真实dom节点
 * @param {*} oldVdom 上一次的虚拟dom
 * @param {*} newVdom 新的虚拟dom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDom) {
  if (!oldVdom && !newVdom) {
    return null
  } else if (oldVdom && !newVdom) {
    let currentDOM = findDOM(oldVdom);
    if (currentDOM) {
      parentDOM.removeChild(currentDOM);
    }
    oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount && oldVdom.classInstance.componentWillUnmount();

    return null
  } else if (!oldVdom && newVdom) {
    let newDOM = createDOM(newVdom);

    // 插入到锚点
    if (nextDom) {
      parentDOM.insertBefore(newDOM, nextDom);
    } else {
      parentDOM.appendChild(newDOM);
    }

    return newVdom
  } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
    let oldDOM = findDOM(oldVdom);
    let newDOM = createDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
  } else {
    // 新的有，老的有，并且类型一致，进行diff
    updateElement(oldVdom, newVdom);
    return newVdom
  }
}

/**
 * 深度比较相同type 的虚拟dom
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
function updateElement(oldVdom, newVdom) {
  // 先更新属性
  if(typeof oldVdom.type === 'string') {
    let currentDOM = newVdom.dom = oldVdom.dom;
    updateProps(currentDOM, oldVdom.props, newVdom.props);
  }
  // 再更新子元素
}

/**
 * 找到次虚拟dom对应的真实dom
 * @param {*} vdom 
 */
function findDOM(vdom) {
  let {
    type
  } = vdom;
  let dom;
  if (typeof type === 'function') {
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom
  }

  return dom
}

const ReactDOM = {
  render
}

export default ReactDOM;