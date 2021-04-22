const http = require('http');
const chalk = require('chalk');
const mime = require('mime');
const ejs = require('ejs');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream, readFileSync } = require('fs');


const { getIPAdress } = require('./util');
const myHost = getIPAdress();
const template = readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');


class Server {
  constructor(serverOptions) {
    this.port = serverOptions.port;
    this.directory = serverOptions.directory;
    this.cache = serverOptions.cache;
    this.gzip = serverOptions.gzip;
    this.template = template;
  }
  async handleRequest(req, res) {
    let {
      pathname
    } = url.parse(req.url);

    pathname = decodeURIComponent(pathname); // 传过来的路径解码

    let requestFile = path.join(this.directory, pathname);
    try { // 判断路径正确
      let statObj = await fs.stat(requestFile);
      if (statObj.isDirectory()) {
        // 发送文件目录
        const dirs = await fs.readdir(requestFile);
        let fileContent = await ejs.render(this.template, {dirs:dirs.map(dir=>({
          name:dir,
          url:path.join(pathname,dir)
        }))});
        res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8');
        res.end(fileContent);
      } else {
        // 发送文件内容
        this.sendFile(req,res,requestFile);
      }
    } catch (e) {
      console.log(e);
      this.sendError(req, res, e);
    }
  }
  sendFile(req,res,requestFile) {
    // 返回文件时，配置请求头
    res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8');
    createReadStream(requestFile).pipe(res);
  }
  sendError(req, res, e) {
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  start() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, (err) => {
      console.log(chalk.yellow('Starting up http-server, serving ./'));
      console.log(chalk.yellow('Available on: /n'));
      console.log(`  http://127.0.0.1:${chalk.green(this.port)}`);
      console.log(`  http://${myHost}:${chalk.green(this.port)}`);
      console.log(`Hit CTRL-C to stop the server`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        server.listen(++this.port);
      }
    })
  }
}

module.exports = Server;