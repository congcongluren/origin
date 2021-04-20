// const fs = require('fs').promises;
const {
  dir
} = require('console');
const fs = require('fs');
const path = require('path');
const {
  existsSync
} = require('fs');

// fs.rmdir('a',function(err) {
//   console.log(err);
// })
// fs.readdir('a', function (err,dirs) {
//   console.log(dirs);
// })
// fs.stat('a', function (err,statObj) {
//   console.log(statObj.isDirectory());
// })

// function rmdir(dir, cb) {
//   fs.stat(dir, function (err, statObj) {
//     if (statObj.isDirectory()) {
//       // 文件夹
//       fs.readdir(dir, function (err, dirs){
//         dirs = dirs.map(item=> path.join(dir, item));
//         //  把目录里面的拿出来， 1个删除完成后删除第二个
//         let index = 0;
//         function step() {
//           // 子目录都删除，删除自己
//           if (index === dirs.length) return fs.rmdir(dir, cb)
//           rmdir(dirs[index++],step);
//         }
//         step();
//       });
//     } else {
//       // 文件
//       fs.unlink(dir,cb);
//     }
//   })
 
function rmdir(dir, cb) {
  fs.stat(dir, function (err, statObj) {
    if (!statObj) return;
    if (statObj.isDirectory()) {
      // 文件夹
      fs.readdir(dir, function (err, dirs) {
        dirs = dirs.map(item => path.join(dir, item));

        if (!dirs.length) {
          return fs.rmdir(dir, cb)
        }

        let i = 0;
        function done() {
          if (++i === dirs.length) {
            return fs.rmdir(dir, cb)
          }
        }

        for (let i = 0; i < dirs.length; i++) {
          rmdir(dirs[i], done);
        }

      });
    } else {
      // 文件
      fs.unlink(dir, cb);
    }
  })
}

rmdir('a', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('删除成功');
  }
})









// async function mkdir(pathStr) {
//   let pathList = pathStr.split('/');

//   for(let i = 1; i <= pathList.length; i++) {
//     let currentPath = pathList.slice(0, i).join('/');
//     if (!existsSync(currentPath)) {
//       await fs.mkdir(currentPath);
//     }
//   }
// }

// mkdir('a/b/c/d').then(() => {
//   console.log('sucess');
// }).catch(err=>{
//   console.log(err);
// })



// function mkdir(pathStr, cb) {
//   let pathList = pathStr.split('/');
//   let index = 1;

//   function make(err) {
//     if (err) return cb(err);
//     if (index === pathList.length + 1) return cb();
//     let currentPath = pathList.slice(0, index++).join('/');
//     fs.stat(currentPath, function (err) {
//       if (err) {
//         fs.mkdir(currentPath, make);
//       } else {
//         make();
//       }
//     })
//   };
//   make();
// }

// mkdir('a/b/c/d', function(err) {
//   if (err) return console.log(err);
//   console.log('sucess');
// })