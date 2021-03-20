import React from './react';
import ReactDOM from './react-dom';

// function ChildFunctionComponent() {
//   return <div>ChildFunctionComponent</div>
// }

function Welcome(props) {
  return (
    <div className='title' style={{ background: 'green', color: 'red' }}>
      {/* <ChildFunctionComponent/> */}
      <span>{props.name}</span>
      {props.children}
    </div>
  )
}
ReactDOM.render((
  <Welcome name='zhang san' >
    <span>world</span>
  </Welcome>
), document.getElementById('root'))