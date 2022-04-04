---
emoji: 🧢
title: 프로그래머스 - Level 2 위장 | Python
date: '2021-04-09 22:20:45'
author: CodeSik
tags: 알고리즘 프로그래머스 파이썬
categories: Algorithm
---

<p class="callout"> 💡[프로그래머스] Level 2 위장 | Python</p>


[문제 링크 및 출처](https://programmers.co.kr/learn/courses/30/lessons/42576)

![스크린샷 2021-04-09 오후 9.18.14](https://i.imgur.com/gO0Teg4.png)

## 풀이과정
---

```python
def solution(clothes):
    dic = {i[1]:1 for i in clothes}
    for i in clothes:
        dic[i[1]] += 1
    ans = 1
    for i in dic.values():
        ans*=i
    return ans-1
```
Dictionary에 각 종류별 옷의 갯수를 저장합니다.
1부터 시작한건 아무것도 안입을 수도 있어서 입니다.문제에서 한개의 의상은 입는다고 되어있다고 하니 하의만 입고 상의는 안입을 수도 있습니다.

그 다음 각 갯수를 모두 곱하고, 마지막에 1을 빼고 리턴해줍니다. 안입은 경우를 위에서 더해줬으니 모두 안입은 경우가 생길 것이므로, 그것은 답에서 제외합니다.

```toc
```
