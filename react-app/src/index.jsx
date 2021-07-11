import React from './react';
import ReactDOM from './react-dom';


// import React from 'react';
// import ReactDOM from 'react-dom';

// let element = (
//   <div className="title" style = {{color: 'red'}}>
//     <span>hello</span>world
//   </div>
// )


// let element = React.createElement("div", {
//   className: "title",
//   style: {
//     color: 'red'
//   }
// }, React.createElement("span", null, "hello"), "world");
class ClassComponent extends React.Component {
  render() {
    return (
      <h1 style={{ color: 'red' }} className="title"> <span>hello</span>{this.props.name}</h1>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new Date()
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }
  componentWillUmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    this.setState({ data: new Date() })
  }
  render() {
    return (
      <div>
        <h1> <span>hello</span> , {this.props.name}</h1>
        <h2>现在时间是{this.state.data.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

class Counter extends React.Component {
  state = { number: 0 };
  handleClick = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      console.log('callback', this.state.number);
      
    })
    // this.setState({ number: this.state.number + 1 }, () => {
    //   console.log('callback', this.state.number);
      
    // })
    console.log(this.state.number);

    // this.setState({
    //   number: this.state.number + 1
    // })
    // console.log(this.state.number);


    // setTimeout(() => {
    //   this.setState({
    //     number: this.state.number + 1
    //   })
    //   console.log(this.state.number);
  
    //   this.setState({
    //     number: this.state.number + 1
    //   })
    //   console.log(this.state.number);
    // })
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

function FunctionComponent(props) {
  let ele = <h1> <span>hello</span> , {props.name}</h1>
  console.log(ele);
  return ele;
  // return React.createElement('h1', null, 'hello', props.name);
}


let element = <Counter name="zhang" />
let element4 = <Clock name="zhang" />
let element3 = <ClassComponent name="zhang" />
let element2 = <FunctionComponent name="zhang" />







console.log(element);


ReactDOM.render(element, document.getElementById('root'))