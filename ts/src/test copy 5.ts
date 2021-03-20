// class GetArrayMax<T = number> {
//   public arr:T[] = [];
//   constructor() {

//   }
//   add(val: T) {
//     this.arr.push(val)
//   }
//   getMax() {
//     let arr = this.arr;

//     let max = arr[0];

//     for(let i = 1; i < arr.length; i++) {
//       arr[i] > max ? (max = arr[i]) : null
//     }

//     return max
//   }
// }

// let arr = new GetArrayMax();

// arr.add(3)
// let a = arr.getMax()




interface IButton1 {
  color: 'blue'
  class: number
}
interface IButton2 {
  color: 'yellow'
  class: string
}

function getButton(button: IButton1 | IButton2) {
  if (button.color === 'blue') {
    let a = button.class
  }
}

let oObj: IButton1 = {
  color: 'blue',
  class: 1
}



// function isString(val: any): val is string {
//   return 789
// }