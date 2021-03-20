interface Person1 {
  handSome: string,
  // a: 'string'
}

interface Person2 {
  height: number,
  // a: number
}

type Person3  = Person1 & Person2;

let person  = {
  handSome: 'ha',
  height: 12
}

let p: Person2 = person









export {}