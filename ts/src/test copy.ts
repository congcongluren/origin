// function eat(target: Function) {
//   target.prototype.eat = function () {
//     console.log('eat');
    
//   }
// }
// function toUpperCase(target: any, key:string) {
//   console.log(target, key);
//   let val: string = ''
//   Object.defineProperty(target, key, {
//     get() {
//       return val;
//     },
//     set(newValue: string) {
//       console.log(newValue);
//       val = newValue + '666';
//     }
//   })
// }

// function doubleAge(target: any, key: string) {
//   console.log(target, key);
  
// }

// function Enum(bool: boolean) {

//   return function (target: any, key: string, descriptor: PropertyDescriptor) {
//     console.log(target, key, descriptor);
    
//   }
// }

// // @eat
// class Person {
//   // eat!:()=>void
//   @toUpperCase
//   public name:string = 'zhang san'

//   @doubleAge
//   static age: number = 18 

//   @Enum(false)
//   drink() {

//   }
// }


// let p = new Person()
// // console.log(p.name = 'lisi');
// console.log(p);







// // function addSay1(a: any) {
// //   console.log(a);
// //   return (val: any) => {
// //     console.log(1);

// //   }
// // }
// // function addSay2(a: any) {
// //   console.log(a);
// //   return (val: any) => {
// //     console.log(2);

// //   }
// // }
// // function addSay3(a: any) {
// //   console.log(a);
// //   return (val: any) => {
// //     console.log(3);

// //   }
// // }
// // @addSay1(11)
// // @addSay2(22)
// // @addSay3(33)
// // class Person {
// // }