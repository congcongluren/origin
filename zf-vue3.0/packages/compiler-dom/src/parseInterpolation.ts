import { advanceBy, advancePositionWithMutation, getCursor, getSelection, NodeTypes, parseTextData } from "../util";

export function parseInterpolation(context) {
  const start = getCursor(context);
  const closeIndex = context.source.indexOf('}}', '{{')

  advanceBy(context, 2);
  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);

  const rawContentLength = closeIndex - 2; // 拿到{{ 内容 }}  包含空格
  const preTrimContent = parseTextData(context, rawContentLength);
  const content = preTrimContent.trim(); // 去掉前后空格
  const startOffset = preTrimContent.indexOf(content);


  if (startOffset > 0) {
    // 有前面空格
    advancePositionWithMutation(innerStart, preTrimContent, startOffset);
  }

  const endOffset = content.length + startOffset;
  advancePositionWithMutation(innerEnd, preTrimContent, endOffset);
  advanceBy(context, 2);
  return {
    type: NodeTypes.INTERPOLATION,
    content:{
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatice: false,
      loc:getSelection(context, innerStart, innerEnd)
    },
    loc: getSelection(context, start)
  }
  
}