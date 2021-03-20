import Component from './Component';
/**
 * 
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children 子元素
 */
function createElement(type, config, children) {
  console.log(type);
  if (config) {
    delete config.source;
    delete config.__self;
  }
  let props = {
    ...config
  }
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  
  console.log(type);
  return {
    type,
    props
  }
}


const React = {
  createElement, Component
}

export default React