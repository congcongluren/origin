#! /usr/bin/env node

// 命令行 帮助文档
const program = require('commander');
const options = require('./config');
program.name('fs');
program.usage('[Options]');

const examples = new Set();
const defaultMapping = {};
Object.entries(options).forEach(([key, value]) => {
  examples.add(value.usage);
  defaultMapping[key] = value.default;
  program.option(value.option, value.description)
});
program.on('--help',function () {
  console.log('\nExamples:');
  examples.forEach((item) => {
    console.log(`  ${item}`);
  })
})


program.parse(process.argv);



// 合并最终的参数
let userArgs = program.opts();
let serverOptions =  Object.assign(defaultMapping, userArgs);

//  启动一个服务
const Server = require('../src/index');
let server = new Server(serverOptions);
server.start();