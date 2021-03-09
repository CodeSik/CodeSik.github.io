---
title: javascript의 화살표 함수와 this
description: javascript에서 화살표 함수는 무엇이고, 일반 this와 다른 점은 무엇일까?
tags:
  - web
  - javascript
---

<p class="callout">💡 JS에서 화살표함수(arrow function)이 어떻게 동작하는지 알아본다. </p>

이전 포스팅([javascript의_this](https://sunmon.github.io/js-this/))에서 중첩 함수는 this가 예상대로 동작하지 않는 문제점을 알 수 있었다.

ES6에서 추가된 화살표함수를 사용하면 중첩 함수에서도 this가 객체를 가리키도록 만들 수 있다.

## Arrow function : 화살표 함수

우선 화살표함수가 무엇인가부터 정리해보자.

```js
let sum = (a,b) => a+b;
```

위 코드처럼 `=>` 를 이용하여 표현하는 함수식이 ***화살표 함수***다.\
*function()*으로 작성하던 함수를 좀 더 간결하게 표현한 것이다.

화살표 함수를 사용하는 법은 간단하다. 함수에서 *function*이라는 글자를 빼고, *=>*를 넣으면 된다.\

```js
let doubleN = function(n){
  return n*2;
}

//화살표 함수로 표현
let doubleN = (n) => { return n*2; }
```

화살표 함수는 인자가 하나인 경우 `()`를 생략할 수 있다.\
또, 함수 본문이 한 줄인경우 `{}`와 `return` 도 생략할 수 있다.

```js
/* 위 예제의 표현식과 동일한 뜻이다. */
let doubleN = n => n*2;
```

인수가 하나도 없을때는 ()안을 비워놓는다. ()는 생략할 수 없다.
또, {}를 사용하는 경우는 return 을 붙여주어야 한다.

```js
let message = () => "hello world!";
let msg2 = () => {
  return `world!`
}
```

## 화살표 함수는 왜 쓰는가?

화살표 함수를 쓰는 이유는 세 가지라고 생각한다.

1. 코드를 간략하게 적을 수 있다.
2. 화살표 함수는 항상 익명이다.
3. this의 범위를 lexical하게 바인딩한다.


코드를 간략하게 적을 수 있다는 것은 모두가 이해할 수 있다.\
항상 익명함수라는 점이 무엇에 좋을까? 일회용으로 쓰는 함수를 보통 익명함수로 사용한다. 콜백, 클로저, 즉시실행함수 등 많은 용례가 있다. 이 때 화살표 함수로 대체할 수 있는 것이다.\

화살표 함수의 this는 바인딩되는 방법이 다르다는것도 큰 특징이다.

## 화살표함수와 this

화살표함수는 *this*가 없다. 무슨 말이냐? 화살표 함수에서 *this*를 사용하면, 외부에서 *this*를 빌려 온다는 말이다.\
화살표 함수는 가장 가까운 스코프에서 this를 빌려온다. 아래 예시를 보자. 아래에 나온 코드에서 this는 undefined 혹은 window를 가리킨다.

```js
  const kristoff = {
    name : "kristoff",
    married: true,
    printFamilly: function(){
      const pet = "sven";
      let familly = pet;
      
      function metOlaf(){
        if(this.married) familly += ", elsa, anna, olaf";  
        return familly;
      }
      return `kristoff's familly : ${metOlaf()}`;
    }
  }

  kristoff.printFamilly(); //결과는?
```

*metOlaf()*에 화살표 함수를 이용해 보자. 위 코드와 다른 실행결과가 나온다.

```js
  const kristoff = {
    name : "kristoff",
    married: true,
    printFamilly: function(){
      const pet = "sven";
      let familly = pet;

      /* 화살표 함수는 상위 스코프에서 this를 빌려온다 */
      let metOlaf = () => {
        if(this.married) familly += ", elsa, anna, olaf";  
        return familly;
      }

      return `kristoff's familly : ${metOlaf()}`;
    }
  }

  kristoff.printFamilly(); //결과는?
```

화살표 함수를 이용했기 때문에, metolaf의 this는 printFamilly의 this를 빌려온다. 따라서, this는 kristoff를 가리킨다.


<p class="callout">❔화살표 함수 안에 화살표함수를 넣으면 어떻게 될까? </p>

화살표 함수 안에 화살표 함수를 넣어보자. 어떻게 될까?

```js
  const sven = {
    food: ["carrot"],
    familly: ["kristoff"],
    married: true,
    eating() {
      let addFood = () => {
        let foods = ["ice", "banana", "apple", "maratang"];
        let addFamilly = this.married ?
          () => this.familly.concat("elsa", "anna", "olaf") : () => this.familly;
        
        for(let i=0; i<addFamilly().length; i++){
          this.food.push(foods[i]);
        }

        return `sven은 ${this.food.length}개의 음식을 먹었다
        먹은 음식 : ${this.food}`;
      }
      return addFood();
    }
  }

  sven.eating();

```

화살표함수는 this가 화살표함수가 아닌 다른 함수를 만날때까지 상위 스코프로 올라간다.

addFamilly라는 변수의 화살표함수를 보자.\
()=> this.familly.concat 부분은, 상위 스코프의 this를 가리킨다. 그런데 상위 스코프인 addFood도 this가 없기 때문에 한 번 더 올라간다. 결국 이 익명함수는 eating()의 this를 빌려오게 된다. 그리하여, this가 sven을 가리키는 것이다.

또한, 화살표함수는 생성자 함수로 사용할 수 없다. this가 없기 때문에, new를 붙여 호출하는 생성자 함수로 사용할 수 없다.


## this와 lexical binding

화살표 함수의 this는 lexical binding 된다고 말할 수 있다.\
렉시컬과 스코프에 관한 설명은 <https://ko.javascript.info/closure>를 참고하자.


## 화살표 함수에 또 없는 것

this외에도 화살표 함수에 없는 것들이 있다.

- 화살표 함수에는 'arguments'가 없다.
- 화살표 함수에는 'super'가 없다.
- new 로 호출할 수 없다.

이들에 관해선 추후 알아볼 예정이다.


## 참고

- 러닝 자바스크립트(한빛미디어)
- 모던 Javascript 튜토리얼:화살표 함수 기본 <https://ko.javascript.info/arrow-functions-basics#ref-2991>
- 모던 Javascript 튜토리얼:화살표 함수 다시 살펴보기 <https://ko.javascript.info/arrow-functions>
- 모던 Javascript 튜토리얼:메서드와 this <https://ko.javascript.info/object-methods>
- MDN arrow function <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98>
- 람다, 익명함수, 클로저 <https://hyunseob.github.io/2016/08/30/javascript-closure/>