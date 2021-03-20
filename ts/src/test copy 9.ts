interface ICompany {
  name?: string
  address: string
}
interface IPerson {
  name?: string
  age: number
  company: ICompany
}


// type Partial<T> = {
//   [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K]
// }
type MyPerson = Partial<IPerson>

type Required<T> = { [K in keyof T]-?: T[K] }
type MyRequired = Required<MyPerson>

type Pick<T, K extends keyof T> = { [X in K]: T[X] }
type MyPick = Pick<IPerson, 'age' | 'company'>

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type MyOmit = Omit<IPerson, 'name'>



// let obj: Record<string, any> = {}

type Record<K extends keyof any, T> = {
  [P in K]: T
}
function map<K extends keyof any, V, X>(obj: Record<K, V>, cb: (item: V, key: K) => X): Record<K, X> {
  let result = {} as Record<K, X>;

  for (let key in obj) {
    result[key] = cb(obj[key], key);
  }

  return result;
}

let r = map({ name: 'li', age: 12 }, (item, key) => {
  return '$' + item
})




export { }