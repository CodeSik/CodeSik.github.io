---
date: 2021-04-02 03:20:45 +0900
layout: post
title: "[OS] 운영체제 프로세스 동기화 기법(Semaphore, Mutex)"
description: "운영체제에서 프로세스를 동기화하기 위한 Semaphore, Mutex의 개념"
image: "/assets/img/uploads/2021-04-02-synchronization/synchronization_img.jpg"
optimized_image: "/assets/img/uploads/2021-04-02-synchronization/synchronization_img.jpg"
category: OS
tags: OS, Synchronization
---

<p class="callout"> 💡[OS] 운영체제 프로세스 동기화 기법(Semaphore, Mutex)</p>

## 동기화란?
다수의 프로세스, 혹은 쓰레드에서 같은 공유 자원에 동시에 접근해야 하는 경우가 생깁니다.

해당 경우에, 프로세스들이 같은 공유자원에 접근할 때 일관된 순서가 정해지지 않으면 데이터의 일관성이 깨지게 됩니다.

그래서 프로세스가 동시에 같은 공유자원에 접근할 때 접근 순서를 보장해주는 과정이 `동기화`입니다.

---

### Race Condition
다수의 프로세스들이 공유 자원에 동시에 접근하고 있는 상황을 의미합니다.

### Critical section
Race Condition에 놓인 프로세스들의 `Code` 영역, 즉 공유자원이 여러 프로세스들에 의해 동시 다발적으로 Access될 수 있는 영역입니다.

```C
do{
  Entry section
    Critical section
  Exit section
    Remainder section
} while(1);
```

### Critical Section Problem의 해결법
공유 자원의 접근 순서를 제어하기 위해서 만족해야할 `3가지의 조건`은 다음과 같습니다.
* __Mutual Exclusion(상호배제)__<br>
  하나의 프로세스, 혹은 쓰레드가 Critical Section에서 실행 중이면 다른 프로세스, 혹은 쓰레드가 접근하면 안된다.
* __Progress__<br>
  어떠한 경우에도 각 프로세스, 쓰레드가 자신이 실행해야할 작업을 만들어야 한다.
* __Bounded Waiting__<br>
  프로세스, 쓰레드가 Critical Section에 진입할 때, 기다리는 시간의 제한이 있어야한다.(무한정 X)

그리고 <span class="ud-red">Critical Section 부분은 최대한 줄이는 것</span>이 성능에 중요한 영향을 미칩니다.

---

## 동기화 기법의 종류
동기화 기법에는 많은 종류가 있습니다.

하드웨어(레지스터)에서 제공하는 동기화 기법도 있고, 알고리즘을 작성하여 동기화를 할 수도 있으며, OS에서 제공하는 동기화 기법도 있습니다.
* Software Algorithm
  * Peterson's Algorithm
  * Dekker's Algorithm
  * Lamport's Bakery Algorithm
<br>
* Hardware Support(Register)
  * Interrupt Disabling
  * Test-and-Set (Intel)
  * Swap
<br>
* OS Support
  * Semaphores
  * Mutex

본 포스팅에서는 OS가 제공하는 동기화 기법인 Semaphores, Mutex에 대해서 기술합니다.

---

## 세마포어 (Semaphore)

세마포어는 먼저 구현 측면에 따라, 그리고 사용 측면에 따라서 다음과 같이 분류할 수 있습니다.

* 구현 관점
  * Busy Waiting Semaphore(SpinLock)
  * Blocking Semaphore
* 사용 관점
  * Binary
  * Counting

### Busy Waiting Semaphore(SpinLock)
  세마포어는 `정수` 변수이며, 임의로 접근할 수 없고 2가지의 Operation(API)으로 접근할 수 있습니다. 각 함수에 대한 수도코드는 다음과 같습니다.
  * __P (Wait)__
    ```C
    wait(Semaphore S):
      while S<=0
        do No-op;
      S --;
    ```
    S가 음수면 아무것도 진행하지 않고 기다리며, S가 양수면 S를 감소시킵니다.
  * __S (Signal)__
    ```
    signal(Semaphore S):
      S++;
    ```
  두 API는 Atomic하게 작동합니다.

예제를 한번 보겠습니다.

* 공유 자원: Semaphore S; (Initially S = 1)
* Process Pi
  ```C
  do{
    wait(S);
      Critical Section
    signal(S);
      Remainder Section
  } while(1);
  ```
프로세스들이 해당 코드를 가지고 있다고 합시다.

맨 처음 프로세스 P0가 접근했을 때 S의 값은 1이므로 wait(S) 함수에 접근했을 때 While문 조건에 걸리지 않고, S를 0으로 만든 후 `Critical Section`에 진입하게 됩니다.

P0가 진입한 이후 P1이 임계영역에 진입하려고 할 때 wait(S)에서 S가 0이기 때문에 P0가 임계영역에서 작업을 마치고 signal(S) 함수에 들어가 S=1로 변경해야만 반복문을 빠져나올 수 있습니다. 그렇게 되면 P1이 임계영역에 진입할 수 있겠죠.

정리하자면 S=0일때는 한 프로세스가 자원을 점유하고 있으므로 다른 프로세스의 접근을 막는 것이며, 자원 점유가 끝나면 Signal(S) 연산을 실행하여 자원을 반납했다는 신호를 보내는 것입니다.

### Blocking Semaphore
위에서 봤던 P,S 연산의 수도코드는 기다리는 동안 무한루프를 돌기 때문에, CPU를 낭비한다는 단점이 있습니다. 위에서 사용한 Semaphore는 `Busy Waiting Semaphore(SpinLock)`입니다. 해당 방법은 짧은 시간동안만 사용할 때는 유용하게 쓰일 수 있습니다.

이 단점을 해결하기 위한 방법은 `Blocking`입니다. 강제로 프로세스의 상태를 변경시키는 것으로 구현하여 <span class="ud-red">While Loop을 없애주는 것</span> 입니다.

Semaphore를 다음과 같이 정의해봅시다.

```C
typedef struct{
  int value;
  struct process *L; // Critical Section에 들어가길 원하는 프로세스들의 모음을 Linked List로 저장
}semaphore;
```

* __P - Blocking(Wait)__
  프로세스 상태: Running --> Waiting
  ```C
  wait(Semaphore S):
    S.value --;
    if (S.value <0){
      프로세스를 S.L에 추가
      block; // Running -> Waiting
    }
  ```
  S는 음수가 될 수 있으며, S의 절댓값은 기다리고 있는 프로세스를 의미합니다.
* __S - Wake Up(Signal)__
  프로세스 상태: Waiting --> (Ready) --> Running
  ```C
  signal(Semaphore S):
    S.value ++;
    if (S.value <= 0){
      S.L에서 process P 하나를 제거(제일 앞)
      wakeup(P) // Wating -> (Ready) -> Running
    }
  ```

기다리고 있는 프로세스의 목록은 `FIFO`로 구현하여 먼저 들어온 프로세스가 먼저 접근하도록 순서를 정해줍니다.

위에서 볼 수 있듯 세마포어는 음수의 값을 가질 수 있고, 이에 대한 절댓값은 기다리고 있는 프로세스의 갯수라고 생각하면 됩니다.

---

### Binary Semaphore

세마포어가 <span class="ud-red">오직 __0__ 또는 __1__ 의 값만 가질 수 있으며</span>, 초기에는 1로 초기화 되어있습니다.
Blocking Semaphore는 음수의 값을 가지지만 Binary Semaphore라고 부르긴 합니다. 1을 넘지 않기 때문입니다.

### Counting Semaphore

세마포어의 값이 <span class="ud-red">1을 초과할 수 있습니다.</span>
만약 S의 값이 4라면, Critical Section에 최대 4개가 접근 가능한 것입니다.


## 뮤텍스 (Mutex)
뮤텍스는 세마포어와 같이 OS에서 제공하는 동기화 기법 중 하나입니다. Binary Semaphore와 같이 1과, 0의 값을 가집니다.

Semaphore와 비슷하게, 임계영역에 들어갈 때는 `Lock`을 걸어서 다른 프로세스, 쓰레드가 접근하지 못하도록 하고 임계영역에서 나올 때 `Unlock`합니다.

## 뮤텍스와 세마포어의 차이
* 세마포어는 Counting Semaphore등을 사용하면 Semaphore의 변수 크기 만큼 프로세스, 쓰레드가 접근할 수 있으나 뮤텍스는 오직 1개의 프로세스, 쓰레드만 접근할 수 있습니다.

* 세마포어는 수행중인 프로세스가 아닌 <span class="ud-red">다른 프로세스에서 세마포어 해제가 가능합니다.</span> 하지만 뮤텍스는 직접 `Lock`을 건 프로세스만 `UnLock`을 할 수 있습니다.
