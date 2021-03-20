let tokens = [];

let NUMBERS = /[0-9]/;
const Numberic = 'Numberic';
const Punctuator = 'Punctuator';


let currentToken;
function emit(token) {
  currentToken = {type: '', value:''}
  tokens.push(token);
}


/**
 * 接收一个字符，返回下一个状态函数
 * @param {*} char 字符
 */
function start(char) {
  if (NUMBERS.test(char)) {
    currentToken = { type: Numberic, value: '' }
  }
  return number(char);
}


function number(char) {
  if (NUMBERS.test(char)) {
    currentToken.value += char;
    return number;
  } else if (char === '+' || char === '-') {
    emit(currentToken);
    emit({ type: Punctuator, value: char });
    currentToken = { type: Numberic, value: '' };
    return number;
  }
}

function tokenizer(input) {
  let state = start;
  for(let char of input) {
    state = state(char)
  }
  if (currentToken.value.length > 0) {
    emit(currentToken);
  }
}

tokenizer("10+20")

console.log(tokens);