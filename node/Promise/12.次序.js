function fun(params) {
    this.q = params;
}

console.log(new fun("88"));

class fun2 {
    constructor(a) {
        this.a = a
    }   
}

console.log(new fun2("11"));