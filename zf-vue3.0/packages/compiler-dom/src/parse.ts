// ------------------------------通用-------------------------------
export const enum NodeTypes {
  ROOT,  // 根元素
  ElEMENT, // 标签
  TEXT, // 文本
  SIMPLE_EXPRESSION = 4, // 表达式中间部分
  INTERPOLATION = 5, // 表达式
  ATTRIBUTE = 6,
  DIRECTIVE = 7, 
  COMPOUND_EXPRESSION = 8, // 组合表达式
  TEXT_CALL = 12, // 文本调用
  VNODE_CALL = 13, // 
  JS_OBJECT_EXPRESSION = 15, 
  JS_PROPERTY = 16,
  JS_CALL_EXPRESSION = 17
}

function getCursor(context) { // 获取位置信息
  let { line, column, offset } = context;
  return { line, column, offset };
}

function advancePositionWithMutation(context, s, endIndex) { // 根据内容，和结束索引修改上下文的信息
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

function advanceBy(context, endIndex) { // 前进，文本截取
  let s = context.source;
  // 计算新的结束的位置
  advancePositionWithMutation(context, s, endIndex);
  context.source = s.slice(endIndex);
}

function parseTextData(context, endIndex) { // 文本截取内容
  const rawText = context.source.slice(0, endIndex);
  advanceBy(context, endIndex);
  return rawText;
}

function getSelection(context, start, end?) { // 获取信息对应的开始，结束，内容
  end = end || getCursor(context);
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}


// ---------------------------解析标签-------------------------------
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

function parseElement(context) {
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
// --------------------------解析表达式---------------------------
function parseInterpolation(context) {
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
      loc:getSelection(context, innerStart, innerEnd),
      content: content
    },
    loc: getSelection(context, start)
  }
  
}
// -------------------------解析文本----------------------------

function parseText(context) { // 文本解析
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

// ------------------------主程序-----------------------------
function isEnd(context) { // 是不是解析完成， context。source === ‘’
  const source = context.source;
  
  if (source.startsWith('</')) {
    return true
  }
  
  return !source;
}

function parseChildren(context) { // 根据内容分发解析方法
  const nodes = [];
  let n = 0;     
  
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
        nodes[index] = null;
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
export function baseParse(content) {
  // 标识节点信息
  // 解析一部分，移除一部分
  const context = createParseContext(content);
  const start = getCursor(context);
  return createRoot(parseChildren(context), getSelection(context, start));
}
