import React from './react';
import ReactDOM from './react-dom';
// import { jsx as _jsx111 } from 'react/jsx-runtime';
// console.log(_jsx111);


// let element1 = (
//   <div className = "title" style={{color: 'red'}}> <span>hello</span> world </div>
// )

const element1 = React.createElement('div', {
  "className": "title",
  "style": {
    "color": "red"
  },
}, React.createElement('span', null, 'hello'), 'world')

// console.log(JSON.stringify(element1, null, 2));

console.log(element1);
ReactDOM.render(element1, document.getElementById('root'))


// {
//   "type": "div",
//   "props": {
//     "className": "title",
//     "style": {
//       "color": "red"
//     },
//     "children": [
//       " ",
//       {
//         "type": "span",
//         "props": {
//           "children": "hello"
//         },
//       },
//       " world "
//     ]
//   }
// }