---
emoji: 🧢
title: 프로그래머스 - Level 2 전화번호 목록 | Python
date: '2021-04-09 04:20:45'
author: CodeSik
tags: 알고리즘 프로그래머스 파이썬
categories: 알고리즘
---

<p class="callout"> 💡[프로그래머스] Level 2 전화번호 목록 | Python</p>


[문제 링크 및 출처](https://programmers.co.kr/learn/courses/30/lessons/42576)

![스크린샷 2021-04-09 오후 9.18.14](https://i.imgur.com/gO0Teg4.png)

## 풀이과정
---

```python
def solution(phone_book):
    phone_book.sort()
    for i in range(len(phone_book)-1):
        if phone_book[i+1].startswith(phone_book[i]):
            return False  
    return True
```

해시문제인데 그냥 풀려버렸네요..
전화번호부를 Sort 하게되면 문자열이기 때문에 앞 문자가 유니코드상으로 빠른 순서대로 정렬이됩니다.

따라서 바로 뒤에 있는 것만 앞의 것으로 시작하는지(접두어) 확인하면 됩니다.

```toc
```
