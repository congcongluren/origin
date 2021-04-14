const EventEmitter = require('events');
const fs = require('fs');

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || 'utf8';
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 64 * 1024;

    this.len = 0;
    this.needDrain = false;
    this.cache = [];
    this.writing = false; // first

    this.open();

  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd;
      this.emit('open', fd);
    })
  }

  write(chunk, encoding = this.encoding, cb = () => {}) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length; // 字节空间的大小
    let returnValue = this.len < this.highWaterMark;

    this.needDrain = !returnValue;

    if (!this.writing) {
      // 第一次写入
      this.writing = true

    } else {
      this.cache.push({
        chunk,
        encoding,
        cb
      })
    }

    return returnValue;
  }

}
module.exports = WriteStream;