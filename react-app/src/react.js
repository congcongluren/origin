import { wrapToVdom } from './utils';
import { Component } from './component';
function createElement(type, config, children) {
  if (config) {
    delete config.__sourse;
    delete config.__self;
  }
  let props = {...config};

  if (arguments.length > 3) {// 有多个儿子
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children); // 字符串，数字，null，数组
  }
  return {
    type,
    props
  }
}

const React = {
  createElement,
  Component
}

export default React;