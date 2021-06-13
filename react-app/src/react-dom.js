const { REACT_TEXT } = require("./constants");

/**
 * 虚拟dom转化成真实dom
 * @param {*} vdom 
 * @param {*} container 
 */
export function render(vdom, container) {
  let newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}

function createDOM(vdom) {
  let { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);
  }

  if (props) {
    // 组件属性更新
    updateProps(dom, {}, props);//根据虚拟DOM中的属性更新真实DOM属性
    // 组件儿子判断
    if (typeof props.children == 'object' && props.children.type) {//它是个对象 只有一个儿子
      render(props.children, dom);
    } else if (Array.isArray(props.children)) {//如果是一个数组
      reconcileChildren(props.children, dom);
    }
  }

  vdom.dom = dom;

  return dom;
}

function mountClassComponent(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  let renderVdom = classInstance.render();
  return createDOM(renderVdom);
}

function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  return createDOM(renderVdom);
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}

function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') { continue; }//后面会单独处理children属性，所以此处跳过去
    if (key === 'style') {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }

    } else if (key.startsWith('on')) {//onClick
      //dom[key.toLocaleLowerCase()]=newProps[key];//dom.onclick=handleClick
      // addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      if (newProps[key])
        dom[key] = newProps[key];
    }
  }
}


const ReactDOM = {
  render
}

export default ReactDOM;