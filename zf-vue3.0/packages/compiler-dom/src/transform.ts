import { NodeTypes } from "./parse"
import { PatchFlags } from "@vue/shared/src/patchFlags"

export const FRAGMENT = Symbol(`Fragment`)
export const TELEPORT = Symbol(`Teleport`)
export const SUSPENSE = Symbol(`Suspense`)
export const KEEP_ALIVE = Symbol(`KeepAlive`)
export const BASE_TRANSITION = Symbol(`BaseTransition`)
export const OPEN_BLOCK = Symbol(`openBlock`)
export const CREATE_BLOCK = Symbol(`createBlock`)
export const CREATE_VNODE = Symbol(`createVNode`)
export const CREATE_COMMENT = Symbol(`createCommentVNode`)
export const CREATE_TEXT = Symbol(`createTextVNode`)
export const CREATE_STATIC = Symbol(`createStaticVNode`)
export const RESOLVE_COMPONENT = Symbol(`resolveComponent`)
export const RESOLVE_DYNAMIC_COMPONENT = Symbol(`resolveDynamicComponent`)
export const RESOLVE_DIRECTIVE = Symbol(`resolveDirective`)
export const WITH_DIRECTIVES = Symbol(`withDirectives`)
export const RENDER_LIST = Symbol(`renderList`)
export const RENDER_SLOT = Symbol(`renderSlot`)
export const CREATE_SLOTS = Symbol(`createSlots`)
export const TO_DISPLAY_STRING = Symbol(`toDisplayString`)
export const MERGE_PROPS = Symbol(`mergeProps`)
export const TO_HANDLERS = Symbol(`toHandlers`)
export const CAMELIZE = Symbol(`camelize`)
export const CAPITALIZE = Symbol(`capitalize`)
export const TO_HANDLER_KEY = Symbol(`toHandlerKey`)
export const SET_BLOCK_TRACKING = Symbol(`setBlockTracking`)
export const PUSH_SCOPE_ID = Symbol(`pushScopeId`)
export const POP_SCOPE_ID = Symbol(`popScopeId`)
export const WITH_SCOPE_ID = Symbol(`withScopeId`)
export const WITH_CTX = Symbol(`withCtx`)
export const UNREF = Symbol(`unref`)
export const IS_REF = Symbol(`isRef`)

function createVnodeCall(context, tag, props, children, patchFlag) {
  context.helper(CREATE_VNODE);
  return {
    type: NodeTypes.VNODE_CALL,
    tag,
    props,
    children,
    patchFlag
  }
}

function transformElement(node, context) {
  if (node.type !== NodeTypes.ElEMENT) return;

  return () => {
    // 向helper里面添加一个createVnode
    let { tag, children } = node;
    let vnodeTag = `'${tag}'`;
    let vnodeProps;
    let vnodeChildren;
    let vnodePatchFlag;
    let patchFlag = 0;

    if (children.length > 0) {
      if (children.length === 1) {
        const child = children[0];
        const type = child.type;
        const hasDymanicTextChild = type === NodeTypes.INTERPOLATION || type === NodeTypes.COMPOUND_EXPRESSION;
        if (hasDymanicTextChild) {
          patchFlag |= PatchFlags.TEXT
        }
        vnodeChildren = child;
      } else {
        vnodeChildren = children;
      }
    }

    if (patchFlag !== 0) {
      vnodePatchFlag = patchFlag + ''
    }

    node.codegenNode = createVnodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag);
  }
}

function isText(node) {
  return node.type === NodeTypes.INTERPOLATION || node.type === NodeTypes.TEXT
}
function createCallExpression(callee, args) {
  return {
    type: NodeTypes.JS_CALL_EXPRESSION,
    callee,
    args
  }
}
function trnasformText(node, context) {
  if (node.type === NodeTypes.ROOT || node.type === NodeTypes.ElEMENT) {

    return () => {
      // 对元素上的文本进行合并操作
      let hasText = false;
      let children = node.children;
      let container = null;

      for (let i = 0; i < children.length; i++) { // 遍历子节点
        const child = children[i];

        if (isText(child)) { // 当前是文本
          hasText = true;

          for (let j = i + 1; j < children.length; j++) { // 遍历剩余子节点
            const next = children[j];

            if (isText(next)) { // 第二个节点是文本，就需要和上一个合并
              if (!container) { // 首个container
                container = children[i] = {
                  type: NodeTypes.COMPOUND_EXPRESSION, // 文本加表达式
                  loc: child.loc,
                  children: [child]
                }
              }
              container.children.push(`+`, next);
              children.splice(j, 1);
              j--;
            } else {
              container = null;
              break;
            }
          }
        }
      }

      // 文本需要增加 createText方法， helper里增加
      if (!hasText || children.length === 1) { // 只有一个孩子 在代码执行的时候， 可以直接处理
        return;
      }

      // createTextNode('文本', 1);

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child) || child.type === NodeTypes.COMPOUND_EXPRESSION) {

          const callArgs = [];
          callArgs.push(child);
          if (child.type !== NodeTypes.TEXT) {
            callArgs.push(PatchFlags.TEXT)
          }

          children[i] = {
            type: NodeTypes.TEXT_CALL,
            content: child,
            loc: child.loc,
            codegenNode: createCallExpression( // 用于最后生成代码
              context.helper(CREATE_TEXT),
              callArgs
            )
          }
        }

      }
    }
  }

}


export function getBaseTransformPreset() {
  // 很多转换的方法
  return [
    transformElement,
    trnasformText
  ]
}

function createTransformContext(root, nodeTransforms) {
  const context = {
    root,
    currentNode: root, // 当前节点， 会随着树的遍历而更新
    nodeTransforms, // 上下文的目的是为了传参方便
    helpers: new Set(),
    helper(name) { // 代码中用到了具体的方法，需要调用这个方法，名字加到helpers里面
      context.helpers.add(name)
      return name
    }
  }

  return context;
}

function traverseChildren(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    traverseNode(child, context);
  }
}

function traverseNode(node, context) {
  const { nodeTransforms } = context;
  const exits = [];
  context.currentNode = node;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context);
    if (onExit) exits.push(onExit);
  }

  switch (node.type) {
    case NodeTypes.ROOT:
    case NodeTypes.ElEMENT:
      traverseChildren(node, context);
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING);
  }

  let i = exits.length;

  // 为了保证推出方法对应的context.currentNode是正确的
  context.currentNode = node;
  while (i--) {
    exits[i]();
  }
}


function createRootCodegen(root, context) { // 编译前，处理根节点
  const { helper } = context;
  const children = root.children;
  if (children.length === 1) {
    const child = children[0];
    const codegen = child.codegenNode; // 获取刚才元素转化的condegen

    codegen.isBlock = true; // 只有一个子元素，作为bolck的根节点
    helper(OPEN_BLOCK);
    helper(CREATE_BLOCK);
    root.codegenNode = codegen
  } else if (children.length > 1) {
    root.codegenNode = createVnodeCall(context, helper(FRAGMENT), undefined, children, PatchFlags.STABLE_FRAGMENT)
  }
}

export function transfrom(root, nodeTransforms) {
  const context = createTransformContext(root, nodeTransforms);
  traverseNode(root, context);
  createRootCodegen(root, context);

  root.helpers = [...context.helpers]
}
