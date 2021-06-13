import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  let [number, useNumber] = useState(0)

  let handleClick = () => {
    useNumber(number++);
  }

  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>click</button>
    </div>
  )
}


ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
