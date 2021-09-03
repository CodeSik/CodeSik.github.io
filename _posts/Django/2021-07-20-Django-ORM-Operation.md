---
date: 2021-08-10 08:40:45 +0900
layout: post
title: "Django(장고) ORM 정리 - 데이터를 조작하는 방법"
description: "Django의 ORM에 대한 개념"
image: "/assets/img/default_imgs/thumb/django.png"
optimized_image: "/assets/img/default_imgs/thumb/django.png"
category: Django
tags: Django ORM
---
<p class="callout"> 💡[Django] Django의 ORM</p>

---

### Operation
처음 언급한 것 처럼 ORM의 함수를 통해서 어떻게 데이터들을 조작할 수 있는지 살펴보겠습니다.

[Django CookBook](https://django-orm-cookbook-ko.readthedocs.io/en/latest/index.html)
여기서 기본적인 CRUD 문법을 확인하실 수 있습니다.

> __Select__

특별한 설명없이 자주 쓰이는 함수들을 소개드리고, 주의할 점 몇가지를 말씀드리겠습니다.

먼저 객체를 통해 데이터를 가져오는 연산들 입니다.
```python
# Select * from person
persons = Person.objects.all()

# Select * from person where id = 1
person = Person.objects.filter(id=1)

```
여기서 기본적으로 전체를 가져오거나, filter 함수를 통해 Where Caluse를 사용해 조건을 걸어줄 수 있습니다.
중요한 점은 위 두 연산 모두 실제 객체를 가져오는 것이 아닌, `Query Set`만을 반환하기 때문에 위 변수로는 접근이 바로 안됩니다.

따라서 실제 객체에 접근하기 위해서는
```python
person = Person.objects.filter(name="Codesik").first()

person = Person.objects.get(id=1)
```
이런식으로 하게 되면 실제 객체에 접근할 수 있게 됩니다. first는 쿼리셋 내에서 가장 첫번째의 값을 참조하는 함수입니다.

제가 이렇게 쿼리셋 / 실제 객체 접근을 구분한 이유는, DB 접근 횟수를 줄임으로써 성능에 이점을 줄 수 있기 때문입니다.

예를 들어 Codesik 이라는 이름을 가진 사람의 `숫자`만을 세고싶은데, get()이나 first()로 접근하는 것 보다는

```python
person_number = Person.objects.filter(name="Codesik").count()
```
로 숫자만 반환하는 것이 성능상의 이점이 더 있습니다.

또 팁하나를 드리자면
```python
person_list = Person.objects.filter(name="Codesik")

for person in person_list:
  pass

```
이런식으로 반복문을 돌게되면 person은 쿼리셋이 아닌 객체로 참조되게 됩니다.


![1_hgO-53N6ReTT99l4IygmiA](https://i.imgur.com/7WZI4mr.png)

(작성중)
