type Exclude<T, K> = T extends K ? never : T;
type MyExclude = Exclude<string | number | boolean, boolean | number>

type Extract<T, K> = T extends K ? T : never;
type MyExtract = Extract<string | number | boolean, number>

type NonNullable<T> = T extends null ? never : T;
type MyNonNullable = NonNullable<string | number | null>




function getSchool(x: number, y: number) {
  return { name: 'yi', age: 18 }
}

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
type MyReturnType = ReturnType<typeof getSchool>

type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
type MyParameters = Parameters<typeof getSchool>




class  Person  {
  constructor(name: string) {
    
  }
}

type ConstructorParameters<T extends new (...args:any[])=> any > = T extends new (...args: infer CP)=> any ? CP : never 
type MyConstructorParameters = ConstructorParameters<typeof Person>

type InstanceType<T extends new (...args:any[])=> any > = T extends new (...args: any[])=> infer R ? R : never 
type My = InstanceType<typeof Person>

export { }