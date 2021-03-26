import { getCursor, getSelection, NodeTypes, parseTextData } from "../util";





export function parseText(context) { // 文本解析
  const endTokens = ['<', '{{'];
  let endIndex = context.source.length;
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }
  // 有了文本结束的位置，就可以更新行列信息
  let start = getCursor(context);
  const content = parseTextData(context, endIndex);

  return {
    type: NodeTypes.TEXT,
    content,
    loc: getSelection(context, start)
  }
}