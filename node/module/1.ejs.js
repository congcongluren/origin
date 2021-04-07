// const ejs = require('ejs');
const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);

let ejs = {
  async renderFile(filename, options) {
    let content = await read(filename, 'utf8')

    content = content.replace(/<%=(.+?)%>/g, function() {
      return '${' + arguments[1] + '}'
    })

    let head = 'let str =  "";\n with(obj){ \n str += `';

    let body = content.replace(/<%(.+?)%>/g, function () {
      return '`\n' + arguments[1] + '\nstr += `';
      
    });

    let tail = '`} return str';


    let fn = new Function ('obj', head + body + tail)
    return fn(options);
  }
};


(async function () {
  let r = await ejs.renderFile('./template.html', {
    arr: [1, 2, 3]
  });
  console.log(r);

})()