export const enum NodeTypes {
  ROOT,
  ElEMENT,
  TEXT,
  SIMPLE_EXPRESSION = 4,
  INTERPOLATION = 5,
  ATTRIBUTE = 6,
  DIRECTIVE = 7,
  COMPOUND_EXPRESSION = 8,
  TEXT_CALL = 12,
  VNODE_CALL = 13,
  JS_OBJECT_EXPRESSION = 15,
  JS_PROPERTY = 16
}

export function getCursor(context) {
  let { line, column, offset } = context;
  return { line, column, offset };
}

export function advancePositionWithMutation(context, s, endIndex) { // 根据内容，和结束索引修改上下文的信息
  let linesCount = 0;
  let linePos = -1
  // 计算行位置
  for (let i = 0; i < endIndex; i++) {
    if (s.charCodeAt(i) === 10) {
      linesCount++;
      linePos = i;
    }
  }
  context.offset += endIndex;
  context.line += linesCount;
  context.column = linePos === -1 ? context.column + endIndex : endIndex - linePos;
}

export function advanceBy(context, endIndex) { // 前进，文本截取
  let s = context.source;
  // 计算新的结束的位置
  advancePositionWithMutation(context, s, endIndex);
  context.source = s.slice(endIndex);
}

export function parseTextData(context, endIndex) { // 文本截取内容
  const rawText = context.source.slice(0, endIndex);
  advanceBy(context, endIndex);
  return rawText;
}

export function getSelection(context, start, end?) { // 获取信息对应的开始，结束，内容
  end = end || getCursor(context);
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}
