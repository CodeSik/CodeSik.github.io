---
emoji: 🧢
title: JVM의 Garbage Collection
date: '2021-04-04 03:20:45'
author: CodeSik
tags: GC Garbage_Collection Java JVM
categories: CS
---

<p class="callout"> 💡[JAVA] JVM의 Garbage Collection </p>

# Garbage Collection
C/C++ 에서는 메모리를 개발자가 명시적으로 해제하지만 JVM 기반 어플리케이션에서는 명시적으로 해제를 하지 않습니다. JVM의 Garbage Collector가 더이상 사용되지 않는 인스턴스를 찾아내서 메모리를 삭제하는 행위를 합니다.

---

## 동작 방식
### Stop The World

앞서 말씀드렸듯 `Garbage Collector`는 자동으로 JVM이 판단하여 사용되지 않는 인스턴스의 할당을 해제하는 역할을 합니다. 다만 메모리를 해제하기 위해서는 자바 어플리케이션의 GC를 실행하기 위한 쓰레드를 제외하고 모두 멈추게 되고, GC가 완료된 후에야 다른 쓰레드가 작동하게 됩니다. 이러한 상태를 `Stop The World`라고 합니다.

### Mark and Sweep

`Stop The World`  상태에서 GC는 스택의 모든 변수나 Reachable 객체를 스캔한다. 여기서 사용되고 있는 메모리를 찾아내는 과정이 `Mark` , 식별되지 않은 객체를 메모리에서 제거하는 과정이 `Sweep` 이다.

### GC 튜닝

GC 튜닝이란 이러한 Stop The World 상태의 시간을 최소한으로 하는 작업이라고 보시면 됩니다.

## Sun JVM의 Young Generation / Old Generation

`Young Generation(Minor GC)`: 생명 주기가 짧은 객체를 GC의 대상으로 하는 영역

`Old Generation(Major GC)`: 생명 주기가 긴 객체를 GC의 대상으로 하는 영역

일반적인 JVM Application은 생명주기가 짧은 객체가 훨씬 많습니다. 그래서 Sun JVM의 `Generation Heap` 은 Young Generation에 속한 객체의 빠른 생성과 제거를 보장하는 성격을 지니고 있습니다.

### Young Generation 동작 방식

`Young Generation(Minor GC)` 는 3개의 영역으로 나뉘어 집니다.

- Eden 영역
- 2개의 Survivor 영역

객체가 처음 생성되면  `Eden` 영역에 할당이 됩니다. 계속 할당이 되다가  `Eden` 영역이 꽉차게 되면 Minor GC 가 활성화 됩니다. 이 때 Stop The wolrd 상태가 되는거죠. 사용되지 않은 객체의 메모리를 해제하고 남아있는 `Eden` 영역의 객체들을 `Survivor` 영역으로 옮깁니다.

`Survivor` 영역마저 꽉차게 된다면 `Survivor` 영역에서 살아남은 객체를 다른 `Survivor` 영역으로 옮깁니다. `Survivor` 영역 중 하나는 반드시 빈 상태를 유지해야 합니다.

이 과정들을 반복하여 계속 살아남은 객체는 `Old Generation` 으로 Promotion(이동) 됩니다.

### Old Generation 동작 방식

`Old Generation(Major GC)` 에서 `Major GC` 가 활성화 되기 위해선 해당 영역에 객체가 꽉 차야합니다. 다만 Major GC는 굉장히 오래걸리는 작업입니다. Young 영역보다 크기가 클 뿐더러, Young 영역의 객체를 참조하고 있을 수도 있기 때문입니다.

```toc
```
