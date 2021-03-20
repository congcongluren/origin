interface IVegetables {
  color: string
  taste: string
  size?: string
  id?: number
  [key: string]: any
}

const tomato: IVegetables = {
  color: 'red',
  taste: ''
}

interface ILikeArray {
  [key:number] : any
}

let arr1: ILikeArray = [1,2,3]

type My = IVegetables['b']

interface ISpeakable {
  readonly name: string
  speak: ()=>void
}

interface IChineseSpeakable {
  speakChinese():void
}

class Speak implements ISpeakable, IChineseSpeakable {
  name!: string;
  speakChinese(){

  }
  speak(): string {
    return 'xxx'
  }
}


abstract class Animal {
  abstract name: string
  eat () {
    console.log('eat');
  }
}

class Cat extends Animal {
  name!: string
}

