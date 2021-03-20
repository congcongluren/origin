import { toDisplayString as _toDisplayString, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock, createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createTextVNode(_toDisplayString(_ctx.a) + " ", 1 /* TEXT */),
    (_openBlock(true), _createBlock(_Fragment, null, _renderList(_ctx.count, (item) => {
      return (_openBlock(), _createBlock("span", null, _toDisplayString(item), 1 /* TEXT */))
    }), 256 /* UNKEYED_FRAGMENT */))
  ]))
}

console.log(render({name:'zf', age:11, flag: true}));