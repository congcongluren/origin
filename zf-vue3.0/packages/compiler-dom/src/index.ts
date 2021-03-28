import { baseParse } from "./parse";
import { transfrom, getBaseTransformPreset } from "./transform";

function createCodegenContext(ast) {
  const newLine = (n) => {
    context.push('\n' + '  '.repeat(n))
  }
  const context = {
    code: ``, // 拼的结果
    push(c) {
      context.code += c
    },
    indentLevel: 0,
    newLine() {
      newLine(context.indentLevel)
    },
    indent () {
      newLine(++context.indentLevel);
    },
    deindent() {
      newLine(--context.indentLevel)
    }
  }

  return context;
}

function generate(ast){
  const context = createCodegenContext(ast)
  const { push, newLine, indent, deindent } = context;
  push(`cosnt _Vue = Vue`);
  newLine();
  push(`return function render(_ctx){`);
  indent();

  deindent();
  push(`}`);


  console.log(ast);
  

  return context.code
}

export function baseCompile(template) {
  // 将模版转换成ast语法树
  const ast = baseParse(template);
  const nodeTransforms = getBaseTransformPreset(); // 每遍历一次都会调用里面的方法
  // 将ast语法进行转化
  transfrom(ast, nodeTransforms);


  return generate(ast); // 在生成的过程中，生成一个字符串拼接后生成的方法
}