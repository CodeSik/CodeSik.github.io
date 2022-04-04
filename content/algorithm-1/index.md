---
emoji: 🧢
title: 프로그래머스 - Level 1 완주하지 못한 선수 | Python
date: '2021-04-09 02:20:45'
author: CodeSik
tags: 알고리즘 프로그래머스 파이썬
categories: 알고리즘
---

<p class="callout"> 💡[프로그래머스] Level 1 완주하지 못한 선수 | Python</p>


[문제 링크 및 출처](https://programmers.co.kr/learn/courses/30/lessons/42576)

![스크린샷 2021-04-09 오후 8.32.06](https://i.imgur.com/AJpyecC.png)
## 풀이과정
---

```python
def solution(participant, completion):  
    for com in completion:
        if com in participant:
            participant.remove(com)
    # print(participant)
    return participant[0]
```

처음에는 이렇게 풀었습니다. 완주한 사람의 목록에 있는 사람을 참가자에서 하나씩 빼는겁니다.

정확도는 모두 맞는데 해시를 쓰지 않으면 조회시간이 오래걸려 효율성 테스트에서 모두 문제가 생깁니다. 따라서 해시기반 자료형을 사용해야 하는데, Python 에서는 `Dictionary`를 사용하면 됩니다.

저는 근데 위 아이디어를 좀 더 살렸는데요, 파이썬 내장함수중에 `zip`이라는 함수가 있습니다.

두 리스트를 같은 인덱스 끼리 Tuple로 묶어준다고 생각하시면 됩니다.

그럼 sort를 한 뒤에 같은 인덱스 묶인 Tuple간 원소를 비교했을 때 다르다면 그게 답이 될겁니다.

만약 if문에 안걸리면 마지막 원소가 답이 됩니다.

```python
#11:30
def solution(participant, completion):  
    participant.sort()
    completion.sort()
    for a,b in zip(participant,completion):
        if a!=b:
            return a

    return participant[-1]
```

```toc
```
