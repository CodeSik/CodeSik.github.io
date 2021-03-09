---
title: markdown에서 새 줄 띄우기
description: 마크다운 개행법
tags:
  - md
---


마크다운에서 줄 띄워 쓰는 방법. *line-break*라고 한다.


## line break

### Justs new line

그냥 두줄로 입력

```md
Hello
World
```

Hello
World

### two space

라인 맨 뒤에 스페이스 두개 추가

```md
Hello(2 space)
World
```

Hello  
World

### br

html br 태그

```md
Hello<br>
World
```

Hello<br>
World

### empty line

사이에 한 줄 띄우기.\
그냥 새로운 p 태그가 만들어진다. => 새 단락생기는것!

```md
Hello

World
```

Hello

World

### 역슬래시

라인 끝에 `\` 붙이기. 새 줄을 시작했다는 것이 명확하게 보여서 좋다.

```md
Hello\
World
```

Hello\
World

### &npsp;

<p class="callout"> ❌ 내 블로그에서는 npsp 작동 안 함</p>

라인 끝에 `&nbsp;` 붙이기

```md
Hello &nbsp;
World
```

Hello&nbsp;
World

## 여러줄 빈 줄 만들기

### &npsp;

npsp를 비우려는 줄에 입력한다.

```md
&nbsp;
&nbsp;
Hello world!
```

&nbsp;
&nbsp;
Hello world!

### br

br태그를 이용한다

```md
<br>
<br>
Hello world!
```

<br>
<br>
Hello world!


### 역슬래시

역슬래시를 이용한다.
```md
\
\
Hello world!
```
\
\
Hello world

## 참고
[https://gist.github.com/shaunlebron/746476e6e7a4d698b373](https://gist.github.com/shaunlebron/746476e6e7a4d698b373)

