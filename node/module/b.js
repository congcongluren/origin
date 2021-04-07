const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._cache = [];

Module._extensions = {
  '.js'(module) {
    let script = fs.readFileSync(module.id, 'utf-8');
    let templateFn = `(function(exports, module, require, __dirname, __filename){${script}})`

    let fn = vm.runInThisContext(templateFn);

    let exports = module.exports
    let thisValue = exports;
    let filename = module.id;

    let dirname = path.dirname(filename);
    fn.call(thisValue, exports, module, raq, dirname, filename );
  },
  '.json'(module) {
    let script = fs.readFileSync(module.id, 'utf-8');
    module.exports = JSON.parse(script);
  }
}

Module._resolveFilename = function (id) {
  let filePath = path.resolve(__dirname, id);
  let isExists = fs.existsSync(filePath);
  if (isExists) return filePath;

  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    const newPath = filePath + keys[i];
    if (fs.existsSync(newPath)) return newPath

    throw new Error('module not found')
  }
}


Module.prototype.load = function() {
  let ext = path.extname(this.id);
  Module._extensions[ext](this);
}

function raq(filename) {
  filename = Module._resolveFilename(filename);
  const cacheModule = Module._cache[filename];
  if (cacheModule) return cacheModule.exports;
  const module = new Module(filename);
  Module._cache[filename] = module;
  module.load();
  
  return module.exports
}


let a = raq('./a.js');
a = raq('./a.js');
a = raq('./a.js');
a = raq('./a.js');
let json = raq('./a.json');
console.log(a);
console.log(json);