---
date: 2021-01-06 23:40:45 +0900
layout: post
title: Javascript 콘솔로 입력받기 (feat.제너레이터) 
description: 콘솔로 여러 줄을 입력받을때 제너레이터를 이용하여 처리하는 방법 
image: https://user-images.githubusercontent.com/26290571/103780039-d46a5200-5077-11eb-8d9b-333cc28abdd1.png
optimized_image: https://user-images.githubusercontent.com/26290571/103780039-d46a5200-5077-11eb-8d9b-333cc28abdd1.png
---

<p class="callout"> 💡JS 콘솔로 입력받는 방법</p>

파이썬이나 C++과 같은 다른 언어들은 입력받는 방법이 쉽지만 JS는 좀 까다롭다.
`readline`을 이용해야 한다.

몇몇 블로그에서 readline을 이용하여 입력받는 방법을 찾았다. 출처는 포스팅 아래에 달아두었다.

### 콘솔 입력 방법

readline을 이용하여 *이벤트* 형식으로 입력받는 방법이다. 입력값이 들어오면 그때 함수를 실행한다.

```js
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("line", (line) => { 
      // 한 줄씩 입력받은 후 실행할 코드
      rl.close(); // 필수. 없으면 입력을 무한히 받는다
  });
  rl.on('close', () => {
    // 입력이 끝난 후 실행할 코드
  })
```

### 여러 줄을 입력

여러 줄을 입력하고 싶다면 조금 복잡해진다. 이벤트형식으로 동작하기 때문에, 리스너 안에 있는 함수가 통쨰로 실행되기 때문이다. 파이썬의 경우는 `a = input() / b = input()` 하면 a따로 b따로 입력되지만 js는 이렇게 하지 못한다. 작은 트릭을 이용하여 여러 값을 입력받아야 한다.

다음은 여러 블로그에서 찾은 트릭이다. 세 숫자를 입력받는 예시다.


**방법 1. if - else로 분기 나누기**
```js
  let n, m, k;
  rl.on("line", (line) => {
    if (!n) {
      n = line;
    } else if (!m) {
      m = line;
    } else if (!k) {
      k = line;
      rl.close();
    }
  });

  rl.on("close", () => {
    console.log(`n,m,k: ${n}, ${m}, ${k}`);
  });
```

**방법 2. 입력값을 배열에 모두 넣기**
```js
  let input = [];
  rl.on("line", (line) => {
    input.push(line);
    if (input.length === 3) rl.close();
  });

  rl.on("close", () => {
    console.log(`n,m,k: ${input[0]}, ${input[1]}, ${input[2]}`);
  });
```


### 제너레이터 이용

제너레이터를 이용하여 입력받도록 방식을 바꿔봤다. 이 방식을 이용하면 다음과 같은 장점이 있다.
- 직관적임. 다른 언어들처럼 '입력-값 저장'이 1:1로 대응하여 직관적이다.
- 함수 분리. 입력값을 저장하는 함수를 따로 만드는 것이 낫다고 생각한다.

```js
  let n, m, k;
  
  // 입력 한번에 변수 하나씩 저장하는 함수
  const generatorSequence = function* () {
    n = yield;
    m = yield;
    k = yield;
    return true; //생략가능
  };

  const generator = generatorSequence();
  generator.next(); // n = yield를 실행하고 기다린다

  // 이벤트 리스너 
  rl.on("line", (line) => {
    let done = generator.next(line).done; // 더 이상 yield가 없으면 true 리턴
    if (done) rl.close();
  });

  rl.on("close", () => {
    console.log(`n,m,k: ${n}, ${m}, ${k}`);
  });
```

generatorSequence()는 yield를 만날때까지 코드를 실행하고, 그 후 yield의 값을 받을때까지 기다린다. 결과적으로, 위 코드는 값이 들어올때마다 n, m, k에 순서대로 값을 저장한다. 아래 파이썬 코드와 비슷한 구조라고 할 수 있다.

```python
n = input()
m = input()
k = input()
```



### 입력 예제

> 입력 예시 : n,m을 받아 n*m 크기의 이차원 배열을 입력받는 예제\
>  4 3  // n,m 입력 \
>  1 1 0\
>  1 1 1\
>  1 0 1\
>  1 1 1


**방법 1. if-else 이용**
```js
  let n, m;
  let board = [];
  rl.on("line", (line) => {
    if (!n && !m) {
      [n, m] = line.split(" ").map((x) => +x);
    } else {
      board.push(line.split(" ").map((x) => +x));
      if (board.length === n) rl.close();
    }
  });

  rl.on("close", () => {
    console.log(board);
  });
```
  \
**방법 2. 제너레이터 이용**
```js
  let n, m;
  let board = [];
  const generateSequence = function* () {
    [n, m] = yield;
    for (let i = 0; i < n; i++) {
      board.push(yield);
    }
  };

  const generator = generateSequence();
  generator.next();

  rl.on("line", (line) => {
    let nums = line.split(" ").map((x) => +x);
    if (generator.next(nums).done) rl.close();
  });

  rl.on("close", () => {
    console.log(board);
  });
```

### 참고

- Node.js 입력받기 <https://velog.io/@wow/Node.js-%EC%9E%85%EB%A0%A5-%EB%B0%9B%EA%B8%B0>
- js 콘솔로 값 입력받기 <https://bluehorn07.tistory.com/49>
- 모던자바스크립트:제너레이터 <https://ko.javascript.info/generators>
