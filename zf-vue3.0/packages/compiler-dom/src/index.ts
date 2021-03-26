import { getCursor, getSelection, NodeTypes } from "../util";
import { parseElement } from "./parseElement";
import { parseInterpolation } from "./parseInterpolation";
import { parseText } from "./parseText";

let n = 0;

function isEnd(context) { // 是不是解析完成， context。source === ‘’
  const source = context.source;

  if (source.startsWith('</')) {
    return true
  }

  return !source;
}

export function parseChildren(context) { // 根据内容分发解析方法
  const nodes = [];

  while (!isEnd(context)) {
    const s = context.source; // 内容
    let node;
    if (s[0] === '<') { // 标签
      node = parseElement(context);
      // break
    } else if (s.startsWith('{{')) { // 表达式
      node = parseInterpolation(context);
    } else {
      node = parseText(context);
    }
    nodes.push(node);
    if (++n > 100) {
      console.error('死循环');
      break;
    };
  }

  nodes.forEach((node, index) => {
    if (node.type === NodeTypes.TEXT) {
      if (!/[^ \t\r\n]/.test(node.content)) {
        node[index] = null;
      } else {
        node.content = node.content.replace(/[ \t\r\n]+/g, ' ')
      }
    }
  })

  return nodes.filter(Boolean);
}

function createParseContext(content) {
  return {
    line: 1,
    column: 1,
    offset: 0,
    source: content, // source会不停的移除，为空的时候解析完毕
    originalSource: content, // 传入的内容
  }
}
function createRoot(children, loc ) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc
  }
}
function baseParse(content) {
  // 标识节点信息
  // 解析一部分，移除一部分
  const context = createParseContext(content);
  const start = getCursor(context);
  return createRoot(parseChildren(context), getSelection(context, start));
}

export function baseCompile(template) {
  // 将模版转换成ast语法树
  const ast = baseParse(template);

  return ast
}