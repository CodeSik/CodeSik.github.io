---
title: spawn bundle.bat ENOENT 에러 
subtitle: ENOTENT 에러 해결법
description: spawn중 일어난 에러를 고치는 방법
tags:
  - spawn
  - error
  - jekyll
  - gem
---

<p class="callout"> 🛠 spawn bundle.bat ENOENT 에러를 고치는 방법</p>


gulp로 jekyll bundling중에 <span class="ud">span bundle error</span>가 났다.

**에러문구:**

```bash
[11:40:33] 'jekyll' errored after 2.79 ms
[11:40:33] Error: spawn bundle.bat ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:268:19)
    at onErrorNT (internal/child_process.js:468:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
```

에러를 해결하려고 삽질 끝에, 세 가지를 바꿔서 에러를 해결했다.<br>
추후 문제가 재 발생할시 해결하기 쉽도록 기록해본다.


## 1. gulpfile 내 파라미터 이름 수정

Windows에서 node가 실행파일을 찾아내는 방식때문에 나는 에러라고 한다.

- 파라미터로 npm을 전달하면 => 실행파일이 아니라고 에러난다
- 하지만 npm.cmd를 전달하면 => 실행파일로 인식하고 잘 동작한다.

해결 링크: [https://stackoverflow.com/questions/21856861/running-jekyll-as-a-child-process-in-gulp-node](https://stackoverflow.com/questions/21856861/running-jekyll-as-a-child-process-in-gulp-node)



## 2. System32를 환경변수에 추가

***윈도우 기준***으로, 
시스템 환경변수에 `C:\Windows\System32`를 추가한다.

혹은 `%SystemRoot%\system32` 를 추가해도 된다. 나는 이 방법을 썼다.

참고링크 : [https://stackoverflow.com/questions/57054403/problem-with-npm-start-error-spawn-cmd-enoent](https://stackoverflow.com/questions/57054403/problem-with-npm-start-error-spawn-cmd-enoent)


## 3. gem 업데이트

위 두 방법으로도 안 되면 *gem*을 업데이트한다.

```bash
$gem update --system #gem update
```

이렇게 하고 gulp를 실행했더니 *bundler*를 설치하라는 문구가 나와서, 그 문구대로 설치했다.

```bash
$gem install bundler:1.17.2
```

나는 이 방법까지 진행했더니 문제가 해결됐다. 
(Window 10, jetflix theme, gem 3.1.4 version 기준)