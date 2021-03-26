import { parseChildren } from ".";
import { advanceBy, getCursor, getSelection, NodeTypes } from "../util"

function advanceSpaces(context) {
  const match = /^[ \t\r\n]+/.exec(context.source);
  if (match) {
    advanceBy(context, match[0].length);
  }
}

function parseTag(context) {
  const start = getCursor(context);

  const match = /^<\/?([a-z][^ \t\r\n/>]*)/.exec(context.source);
  const tag = match[1];
  // 解析前进
  advanceBy(context, match[0].length);
  // 解析遇到空格前进
  advanceSpaces(context);

  const isSelfClosing = context.source.startsWith('/>');
  advanceBy(context, isSelfClosing? 2: 1);
  
  return {
    type: NodeTypes.ElEMENT,
    tag,
    isSelfClosing,
    loc: getSelection(context, start)
  }

}

export function parseElement(context) {
  // 1.解析标签名
  let ele: any = parseTag(context);

  // 2.判断子元素
  const children = parseChildren(context); // 遇到结束标签直接跳出就可以

  if (context.source.startsWith('</')) {
    parseTag(context); // 解析关闭标签， 同时关闭信息并且更新偏移量
  }

  ele.loc = getSelection(context, ele.loc.start);
  ele.children = children;
  return ele;  
}
