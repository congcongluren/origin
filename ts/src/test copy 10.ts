let data = {
  name: 'zf',
  age: 12
}

type Proxy<T> = {
  get(): T
  set(value: any): void
}
type Proxify<T extends object> = {
  [K in keyof T]: Proxy<T[K]>
}

function proxify<T extends object>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>;

  for (let key in obj) {
    let value = obj[key];
    result[key] = {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
      }
    }

  }

  return result;
}

let proxyDatas = proxify(data);
console.log(proxyDatas.name.get());
proxyDatas.name.set('xxx');
console.log(proxyDatas.name.get());

function unProxify<T extends object>(obj: Proxify<T>): T {
  let result = {} as T;

  for (let key in obj) {
    let value = obj[key];
    result[key] = value.get();
  }

  return result;
}

let data2 = unProxify(proxyDatas)



let person1 = {
  name: 'li',
  age: 12,
  address: 'didi'
}

let person2 = {
  address: 'sisi'
}

type Diff<T, K> = Omit<T, keyof K>;
type myDiff = Diff<typeof person1, typeof person2>

type Inter<T extends object, K extends object> = Pick<K, Extract<keyof T, keyof K>>;
type myInter = Inter<typeof person1, typeof person2>






type Person1 = {
  name: string,
  age: number
}

type Person2 = {
  age: number,
  address: string,
  a: string,
  b: number
}

// type Merge<T extends object, K extends object> = Diff<T, K> & Diff<K, T> & Inter<T, K>;
type Compute<T> = {[K in keyof T]: T[K]}
type Merge<T extends object, K extends object> = Omit<T, keyof K> & K;
type myMerge = Compute<Merge<Person1, Person2>>




export { }