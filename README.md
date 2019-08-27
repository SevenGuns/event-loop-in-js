#### 这个继承的例子有误

```javascript
function Animal() {
    this.eat = function() {
        console.log('animal eat')
    }
}
function Dog() {
    this.bark = function() {
        console.log('dog bark')
    }
}
Dog.prototype = new Animal()
var hashiqi = new Dog()
```

继承和原型链是两个概念

#### 基于class的继承

> 1. 子类继承父类的属性
> 2. 子类的原型对象 的原型指向父类的原型对象 Son.prototype = Object.create(Father.prototype)

```javascript
class Animal {
  	constructor() {
      console.warn('Animal');
    }
  	// 类的属性
  	foo = 'foo';
	 	eat = function() {
       console.log('animal eat')
    }
		// 原型方法 Animal.prototype.bar
		bar() {
      console.log('bar')
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
    }
}

// Dog {foo: "foo"}
const dog = new Dog();
// _foo
dog._foo 
```

**区别在于:**

1. 上面的例子hashiqi属性中不会包含父类上声明的属性，虽然都能访问到，但一个位于自身，一个位于原型上
2. 构造函数的执行时机不同，父类的构造函数要在子类的构造函数中优先执行，并且是实例化的时候执行

#### 通过function实现的继承

```javascript
function Animal() {
	console.warn('Animal');
  this.eat = function() {
    console.log('animal eat');
  }
  this.foo = 'foo';
}
Animal.prototype._foo = '_foo';

function Dog() {
  // 执行父类的构造函数
  Animal.call(this);
 	console.warn('Dog');
  this.bark = function() {
    console.log('dog bark');
  }
}
// 将Dog的原型对象的原型指向父类的原型对象
Dog.prototype = Object.create(Animal.prototype);
// 再给原型对象添加自身属性
Dog.prototype.myFunc = function() {}
```

#### 要搞清楚JS中原型是如何创建的，其实很简单，只需要搞清楚以下过程

```javascript
function Foo() {
  this.value = 'hello world';
}
// 这里到底发生了什么？
const fooInstance = new Foo();
```

1. 在内存中创建新的实例对象
2. 将该实例对象的`[[Prototype]]`指向函数的原型对象
3. 将this指向该实例对象，并执行Foo()

#### 区分以下几个概念

**原型**：mdn上用`[[Prototype]]`表示，作用于实例someObject.[[Prototype]] === someObject.\_\_proto\_\_

**原型对象**：作用于函数（箭头函数除外），如：Array.prototype, Object.prototype

**原型链**：**实例对象**的**原型**指向**构造函数的原型对象**，构造函数的原型对象的原型又指向它自身的构造函数的原型，形成链式结构