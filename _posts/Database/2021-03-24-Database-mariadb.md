---
date: 2021-03-24 22:20:45 +0900
layout: post
title: "[Database] 맥북에서 mariadb 설치하기 (HomeBrew)"
description: "맥북에서 homebrew를 통해 mariadb를 설치하는 방법입니다."
image: "/assets/img/uploads/2021-03-24-Database-mariadb/database-mariadb.jpg"
optimized_image: "/assets/img/uploads/2021-03-24-Database-mariadb/database-mariadb.jpg"
category: Database
tags: Database SQL
---

<p class="callout"> 💡[Database] MariaDB 설치 방법 - 맥 OS X</p>

----

## MariaDB란?
> RDBMS(Relational DBMS)이며, 오픈소스이다. Mysql API와 정확히 일치하여 호환성이 높고, MYSQL의 Monti program AB를 설립한 Michael Monty Widenius가 개발했다. (Monty의 둘째 딸 이름을 따럿 MariaDB라고 합니다.)

---
## 설치방법

### Xcode
Xcode는 맥에 깔려있는 앱스토어에서 다운로드 받으시면 됩니다.

### HomeBrew 설치
Homebrew는 macOS 용 패키지 관리자이며, 리눅스에서 사용하는 sudo apt-get, yum 등과 같다고 생각하시면 됩니다.
Homebrew로 설치하는 것이 어렵다고 느끼실 수 있지만, 환경변수나 패키지 관리를 아주 잘해주기 때문에 매우 편합니다. 익숙해지면 한 줄의 명령어로 패키지를 설치해주는 홈브류에게 고마움을 느끼실 겁니다 ㅎㅎ

먼저 터미널에 접속해줍니다.
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
위 명령어를 터미널에 입력해주세요.
이후 나오는 것에서 엔터 입력하라면 하고, 맥북 비밀번호 입력하면 됩니다.

그리고 HomeBrew를 통해 그래픽 기반으로 동작하는 프로그램(사파리,크롬,워드 등)을 설치하게 해주는 패키지인 cask를 설치해줍니다.

```
brew install cask
```

### MariaDB 설치
홈브루를 설치했으니 MariaDB는 아주 간단하게 설치할 수 있습니다.

```
brew update
brew install mariadb
```
모두 설치했으면 설치가 잘 됐는지 확인해 봅시다.
다만 맥북에서는 쓰는 명령어가 다른데요, 보통 다른 곳에서 사용하는 명령어는 다음과 같습니다.

```
mysql.server start # 시작

mysql.server status # 상태확인

mysql.server stop # 정지
```

맥북에서는 mysql.server start를 통해 서버를 여러번 실행시키면 재부팅을 하지 않는한 프로세스가 계속 생기게 됩니다. `status` 명령어도 제대로 듣지 않구요.(삽질 엄청했네요..)

혹시 위 명령어들 때문에 프로세스 들이 늘어났다면 프로세스를 찾아서 죽여주면 됩니다.
```
ps -ef | grep mysql
sudo kill [pid] [pid]
```

대신 이 명령어들을 쓰시면 됩니다.

```
mysql.server start --> brew services start mariadb
mysql.server stop --> brew services stop mariadb
mysql.server status --> brew services list
```
![스크린샷 2021-03-25 오후 6.24.34](https://i.imgur.com/LwcntjZ.png)

### MariaDB 접속

```
mysql -uroot
```
이를 통해 접속하시면 되고, 만약 `Access Denied for user root`오류가 뜨면
```
sudo mysql -uroot
```
로 접속한 뒤에 root 계정의 비밀번호를 바꿔주면 됩니다.
root 계정의 비밀번호를 바꾸려면 기본적으로 구축되어 있는 `mysql`이라는 데이터베이스에 접속한 뒤에 root 계정의 비밀번호를 변경합니다.

```
use mysql; # mysql이라는 데이터베이스를 사용하겠다는 의미.
set password=password('root'); # MariaDB 10.4 버전 이상에서 사용가능한 명령어
```
![스크린샷 2021-03-25 오후 6.31.17](https://i.imgur.com/P0kUqU5.png)

그 다음 sql 문으로 테이블을 확인해보면 됩니다.
```
select user,host,password from user;
```
![스크린샷 2021-03-25 오후 6.33.24](https://i.imgur.com/LNVPDrC.png)

Root 계정 이외의 계정을 추가하는 방법은 다음과 같습니다.(Local)

```
계정 생성
create user 계정이름@localhost identified by '비밀번호';

권한 부여
grant select on db_name.* to `계정이름`@`localhost` identified by '비밀번호';

모든 권한 부여
grant all privileges on db_name.테이블 to '계정'@'localhost' identified by '비밀번호';
```
db_name.*은 해당 데이터베이스에 모든 테이블에 대해 권한을 부여하는 것이고, <br>db_name.테이블은 해당 데이터베이스에 선택한 테이블에만 권한을 부여하는 것입니다.

### GUI Tool 설치
[Tode 설치](https://www.quest.com/register/111545/)
개인정보를 입력하고 free trial(30일)을 설치하시면 됩니다.
![스크린샷 2021-03-25 오후 6.39.24](https://i.imgur.com/pTfAcKf.jpg)
DB가 없으면 넣지 않아도 되며, 본인이 위에서 만들었던 계정이나 root 계정의 아이디와 비밀번호를 입력해서 local DB에 접속할 수 있습니다.

Tode를 통해 각 데이터베이스와 데이터베이스에 구축된 테이블들을 GUI로 편하게 살펴볼 수 있고, sql문도 작성하여 실행시킬 수 있습니다.

앞으로 있을 SQL 포스팅은 해당 Tool을 통해 진행될 예정입니다.

감사합니다.
