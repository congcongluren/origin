const fs = require('fs');
const EventEmitter = require('events');


class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.flowing = false;
    this.open();

    this.on('newListener', function (type) {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    })
    this.offset = this.start;

  }

  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }
  pause() {
    this.flowing = false;
  }

  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read());
    }

    const buffer = Buffer.alloc(this.highWaterMark);
    let howMutchToRead = this.end ? Math.min(this.end - this.offset + 1, this.highWaterMark) : this.highWaterMark;

    fs.read(this.fd, buffer, 0, howMutchToRead, this.offset, (err, bytesRead) => {
      if (bytesRead) {
        this.offset += bytesRead;
        this.emit('data', buffer.slice(0, bytesRead)); // 读取文件中的内容，读取指定数量
        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit('end');
        this.destroy();
      }
    })
  }

  destroy(err) {
    if (err) {
      this.emit('error', err);
    }
    if (this.autoClose) {
      fs.close(this.fd, () => this.emit('close'));
    }
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy(err)
      }
      this.fd = fd;
      this.emit('open', fd)
    })
  }
}
module.exports = ReadStream;