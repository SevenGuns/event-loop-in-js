// 基于class
class Animal {
  constructor() {
    console.warn('Animal');
  }
  // 类的属性
  foo = 'foo';
  eat = function() {
    console.log('animal eat');
  };
  // 原型方法 Animal.prototype.bar
  bar() {
    console.log('bar');
  }
}
Animal.prototype._foo = '_foo';

class Dog extends Animal {
  constructor() {
    super();
    console.warn('Dog');
  }
  bark = function() {
    console.log('dog bark');
  };
}

// Dog {foo: "foo"}
const dog = new Dog();
// _foo
dog._foo;

// 基于function
function Animal() {
  console.warn('Animal');
  this.eat = function() {
    console.log('animal eat');
  };
  this.foo = 'foo';
}
Animal.prototype._foo = '_foo';

function Dog() {
  // 执行父类的构造函数
  Animal.call(this);
  console.warn('Dog');
  this.bark = function() {
    console.log('dog bark');
  };
}
// 将Dog的原型对象的原型指向父类的原型对象
Dog.prototype = Object.create(Animal.prototype);
// 再给原型对象添加自身属性
Dog.prototype.myFunc = function() {};
