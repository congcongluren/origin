const fs = require('fs');

const ReadStream = require ('./ReadStream');
const WriteStream = require ('./WriteStream');

const rs = new ReadStream('./a.txt', {highWaterMark: 4});

const ws = new WriteStream('./b.txt', {highWaterMark: 1});

rs.pipe(ws);
