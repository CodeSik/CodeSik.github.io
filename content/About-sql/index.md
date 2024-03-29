---
emoji: 🧢
title: SQL 기본적인 문법 정리
date: '2021-03-29 19:20:45'
author: CodeSik
tags: Database SQL
categories: Database
---

![썸네일](./database_sql.jpg)

<p class="callout"> 💡[Database] SQL 기본적인 문법 정리</p>

----

## SQL
`SQL`은 __Structured Query Language__ 의 줄임말로, 관계형 데이터베이스 시스템(__RDBMS__)에서 저장된 데이터베이스의 자료를 검색하고 관리하기 위한 언어입니다.

---

## SQL의 종류

* DDL (Date Definition Language)<br>
  **릴레이션**을 정의하기 위한 언어를 의미하며, 테이블을 생성, 수정, 삭제할 수 있는 CREATE,ALTER,DROP 등의 명령어가 있습니다.

* DML (Data Manipulation Language)<br>
  **데이터의 추가, 수정, 검색, 삭제**를 위한 언어를 의미하며, SELECT, INSERT, UPDATE 등의 명령어가 있습니다.

* DCL (Data Control Language)<br>
  **사용자의 접근 권한을 제어**하는 언어를 의미하며, GRANT, REVOKE 등이 있습니다.

---

### DDL 명령어

#### CREATE
* 데이터베이스 생성
```SQL
CREATE DATEBASE [데이터베이스 이름];
CREATE SCHEMA [데이터베이스 이름];
```

* 데이터베이스 사용
```SQL
USE [데이터베이스 이름];
```

* 테이블(릴레이션)의 생성
```SQL
CREATE TABLE [테이블 이름](
  [column 이름][형식][Null 여부][초기화 여부]
  ...
  primary key([primary key로 지정할 Column])
  foreign key([자식 Column]) references [부모 테이블명]([부모 Column])
);
```

* View 생성
```SQL
CREATE VIEW [뷰 이름](속성 List) AS SELECT [CHECK OPTION];
```
#### SHOW
* 데이터베이스 확인
```SQL
SHOW databases;
```

* 테이블 확인
```SQL
SHOW tables;
```

#### DESC
* 테이블 정보 확인
```SQL
DESC [테이블 이름];
```

#### ALTER - Table 변경
* Attribute 삽입
```SQL
Alter table [테이블 명] add column
[column 이름] [형식] ...; (column 정보를 적으면 동작);
```

* Foreign Key 설정
```SQL
Alter table [테이블 명] add foreign key
([자식 column]) references [부모 테이블 명]([부모 column]);
```
```SQL
예제:
alter table EMPLOYEE add foreign key (Dno)
references DEPARTMENT (DNUMBER);
```

#### DROP
* 테이블 삭제
```SQL
DROP table [테이블 명];
```

* 뷰 삭제
```SQL
DROP VIEW 이름 [CASCADE | RESTRICT];
```

### DML 명령어
* 데이터 조회
```SQL
SELECT [Column 이름] FROM [테이블 이름]
WHERE [조건]
ORDER BY 속성 리스트 ASC or DESC
GROUP BY 속성 리스트 HAVING [조건];
```

* 속성 삽입
```SQL
INSERT INTO 테이블이름 [(속성 목록)]  VALUES (속성 값 목록);
```

* 속성 업데이트
```SQL
UPDATE 테이블이름 SET 속성이름 = 값 [WHERE 조건];
```

* 속성 삭제
```SQL
DELETE FROM 테이블이름 [WHERE 조건];
```

---

이번 포스팅에서는 데이터베이스를 다룰 때 가장 많이 사용하는 DDL,DML에 대해서 알아봤습니다.
다음 포스팅에서 자주 쓰이는 SQL의 함수, JOIN등에 대해서 배워보도록 하겠습니다.

```toc
```
