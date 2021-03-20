const { parseModule } = require("esprima");
const LeftParentheses = 'LeftParentheses';
const RightParentheses = 'RightParentheses';
const Equator = "Equator";
const Punctuator = "Punctuator";
const JSXIdentifier = "JSXIdentifier";
const JSXText = "JSXText";



const LETTERS = /a-z/;
const currentToken = { type: '', value :'' }

let tokens = [];


function start(char) {
  if (char === '<') {
    emit({type: 'LeftParentheses', value:'<'})
    return foundLeftParentheses
  }
  throw new Error('第一个字符必须是<')
}

function foundLeftParentheses(char) {
  if (LETTERS.test(char)) {
    currentToken
  }
}


function tokenizer(input) {
  let state = start;
  for(let char of input) {
    state = state(char);
  }
  return tokens;
}

parseModule.exports = {
  tokenizer
}

let sourceCode = `<h1 id="title"><span>hello</span>world</h1>`;
console.log(tokenizer(sourceCode));