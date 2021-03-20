class Parent {
  money!: string
}

class Child extends Parent {
  house!: string
}

class Grandson extends Child {
  eat!: string
}

function getFn(cb: (person: Child) => Child) {

}

getFn((person: Parent) => new Grandson)


export { }