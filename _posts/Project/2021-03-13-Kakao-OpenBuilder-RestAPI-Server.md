---
date: 2021-03-13 22:20:45 +0900
layout: post
title: "Spring을 사용한 카카오 i Open Builder 챗봇 연동 RestAPI 서버 개발 - 1"
description: "CIT 코딩학원의 상담 프로세스를 개선하기 위해 Spring Framework를 사용해 카카오 i Open Builder와 연동한 RestAPI 서버를 개발한 프로젝트 입니다."
image: "/assets/img/uploads/2021-03-13-Kakao-OpenBuilder-RestAPI-Server/Thumbnail_1.jpg"
optimized_image: "/assets/img/uploads/2021-03-13-Kakao-OpenBuilder-RestAPI-Server/Thumbnail_1.jpg"
category: Project
tags: Spring Java Kakao Chatbot Kakao_i_Open_Builder
---

<p class="callout"> 💡Project -  Spring을 사용한 카카오 i Open Builder 챗봇 연동 RestAPI 서버 개발 </p>

----
## 프로젝트 개요

### 시작하게된 계기

저는 CIT 코딩학원의 관리자로 2019년도 6월부터 2021년도 3월말까지 근무했습니다.

처음 근무했을 당시 많은 부분이 수기로 작성되고 있었습니다. 그로 인해서 학생들의 디테일한 사항을 놓치게 되고, 컴플레인이 많이 발생했었습니다. 저는 그래서 저는 이렇게 생각했습니다.
> 반복적이면서 수작업으로 이뤄지는 일련의 과정들을 자동화함으로써 교육의 질을 높이고 학생들에게 더 신경쓸 수 있지 않을까?

자동화가 되어있지 않은 프로세스들을 자동화 시킴으로써 업무의 효율을 높이고, 학생들의 진도 현황과 관리에 더 노력을 기울일 수 있도록 하는게 중요하다고 생각했습니다.

정리하자면 백오피스(Back Office)의 상당 부분을 자동화하여 프론트오피스(Front Office)에 더 신경쓸 수 있도록 하는 것이 학원의 발전에 도움이 될 것 이라고 생각했습니다.

* 상담
* 교육의 질
* 진도 관리
* 디테일 관리
* 선생님 처우 개선

이러한 요소들에 더욱 신경쓸 수 있도록, 백오피스 개선에 힘을 썼던 것 같습니다.

----
#### 많은 프로세스의 자동화
우선 인수인계가 제대로 이뤄지지 않아 학부모님께 같은 내용이 여러번 전달되거나, 되묻는 경우를 방지하기 위해 일종의 관리자 업무 시트를 만들어 Deadline을 기반으로 자동으로 정렬되도록
<span class="ud"> GAS(Google App Script)  </span> 를 작성했습니다.
* Google App Script(GAS)란?
>앱 스크립트(Apps Script)는 구글 워크스페이스 플랫폼에서 가벼운 애플리케이션 개발을 위해 구글이 개발한 스크립팅 플랫폼이다. 구글 앱 스크립트는 처음에 마이크 함(Mike Harm)이 구글 시트의 개발자로서 일할 당시 부차적인 프로젝트로서 개발하였다. - 위키백과

OnEdit Method를 Overriding하면 특정 Cell이 수정될 때 마다 동작하는 함수를 선택해 실행시킬 수 있습니다. 그래서 Deadline을 설정하면 자동으로 급한일이 제일 위쪽으로 오도록 하고, 여러 인수인계 사항을 남김으로써 출근했을 때 다른 관리자들에게 내용을 물어보거나, 학부모님들에게 잘못된 정보를 전달하고 여러번 되묻는 경우가 현저히 줄어 더 좋은 상담을 할 수 있게 되었습니다.

밑은 제가 업무시간 틈틈히 개발한 소스코드입니다. 아주 간단합니다.

```javascript
function onEdit(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet Name")
  var editedCell = sheet.getActiveCell();


  var tableRange_calendar = "범위";
  var tableRange_etc = "범위";

  var columnToSortBy_date = Column number; // 일정 데드라인  
  var columnToSortBy_etc = Column number; // 기타 상태


if(editedCell.getColumn() == columnToSortBy_date){   
    var range = sheet.getRange(tableRange_calendar);
    range.sort( { column : columnToSortBy_date, ascending: true } );
  }

  if(editedCell.getColumn() == columnToSortBy_etc){   
    var range = sheet.getRange(tableRange_etc);
    range.sort( { column : columnToSortBy_etc, ascending: false } );
  }
}
```

이런식으로, 악 Sheet마다 필요한 Google App Script를 삽입하여 많은 부분을 자동화 할 수 있도록 했습니다.
그 외 개발한 기능은 다음과 같습니다. 관리업무를 하며 짬을내어 개발했던 부분이라서, 크게 어려운 부분은 없습니다.
* Google Drive API를 사용해 선생님들께 필요한 여러 문서들을 자동으로 공유하는 기능
* 학생들의 진도표를 자동으로 생성, 선생님들께 공유하는 기능
* 완료된 업무를 자동으로 다른 시트로 넘겨주는 기능
* 진도표가 모여있는 폴더의 모든 진도표를 가져와 마지막 수정 시간을 기반으로 정렬, 작성되지 않은 진도표와 휴강중인 학생들을 한번에 확인할 수 있는 기능

등을 개발했습니다. GAS를 사용하면 업무 효율성을 굉장히 높일 수 있는데, Reference를 참고하면 대부분 개발이 가능합니다.

[GAS Reference 링크](https://developers.google.com/apps-script)

저희 학원 원장님은 아주 훌륭하신 분입니다.👍

정해진 업무뿐만 아니라 스스로 개선할 수 있는 부분을 찾아서 자동화하는 저의 능력을 인정해주시고, 상담 부분에서 더 많은 부분을 자동화 할 수 있도록 개발을 부탁하셨습니다.

그렇게 개발하게된 프로젝트가 카카오 챗봇 프로젝트입니다.

카카오 i Open Builder의 Skill Server를 연동하기 위해 Spring 기반 Rest API 서버를 만들어 연결한 후, 엔티티와 시나리오, 블록 작업을 통해 Flow를 제작한 후 챗봇을 만들었습니다.

프로젝트의 목적은 챗봇을 통해 수작업으로 이뤄지던 학부모님들의 요청사항을 자동화하여 관리자의 업무를 효율적으로 할 수 있도록 하는 것입니다.

----
### 개발 과정
효율적인 개발을 위해 기획부터 시작해 설계, 구현, 테스트까지 프로덕트를 제작할 때 필요한 일련의 과정을 거쳤습니다.

#### 페르소나 정의 -> 요구사항의 도출
다년간의 관리 경험으로 학부모, 학생, 선생님, 관리자 들의 Requirement를 많이 알고있었습니다. 따라서 이를 정리해 구현할 기능을 만들기 위해 페르소나를 정의했습니다. End User, Customer 등으로 분류해 가장 많았던 컴플레인과 요청사항을 기준으로 Requirement를 도출했습니다.

#### SRS(Software Requirement Specification) 작성
소프트웨어 공학에서 배웠던 요구사항 작성 방법을 기반으로 SRS를 작성했습니다. 제품의 목적, 적용범위, 기능적 요구사항, 인터페이스 요구사항, 비기능적 요구사항 등을 정의했습니다.


#### 기술 스택 & 구현
원래는 SDD(Software Design Description)까지 작성 후 개발하려 했으나, 시간이 없어 빠르게 개발에 들어갔습니다. 원래는 무시하면 안됩니다 😢 오히려 작성하고 개발했다면 더 빠르게, 안정적인 서비스를 개발하지 않았을까 다 개발하고 나서야 드는 생각입니다.

자세한 구현내용은 이후 포스팅에서 다루도록 하고, 간략히 설명드리겠습니다. (Spring, AWS, Kakao i Open Builder / Skill Server 사용법 등에 대해서 포스팅할 예정이에요.)

<br>
##### Framework, Language
* Spring Boot -> Lombok, Spring Web, Tomcat(Spring Boot 내장)
* Java 11

```java
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'

    compile 'com.google.api-client:google-api-client:1.30.4'
    compile 'com.google.oauth-client:google-oauth-client-jetty:1.30.6'

    compile 'com.google.apis:google-api-services-sheets:v4-rev581-1.25.0'
    compile 'com.google.apis:google-api-services-calendar:v3-rev305-1.23.0'
    implementation 'commons-io:commons-io:2.6'

    implementation('org.apache.httpcomponents:httpclient:4.5')
    compile group: 'org.springframework.boot', name: 'spring-boot-starter-json', version: '2.1.9.RELEASE'

}
```
<br>

##### 배포
* AWS EC2 Instance에 배포
* 도메인 설정
* 서버 통합, 도메인 분리
<br>

##### 카카오 i Open Builder V2, 카카오 싱크 플러그인
<br>

##### Google API
* [Google Calendar API V3](https://developers.google.com/calendar)
* [Google Sheet API V4](https://developers.google.com/sheets/api)




----
### 프로젝트 기능 설명
 제공하는 기능은 다음과 같습니다.
 일단 전체 메뉴는 다음과 같습니다. 아무 메시지를 입력하면 폴백 블록이 작동하면서, 메뉴로 유도합니다.

 ![menu](/assets/menu.png)

----
##### 수강생 인증 - Google Spread Sheet API 연동

학원에 등록이 되어있다면, 카카오 싱크 프로필 이용 플러그인을 통해 전화번호를 1회 제공받은 뒤 이를 학원에서 사용하는 Google Spread Sheet 내에서 검색하여 학생을 찾습니다. 그 후, Developers App과 연동된 채널은 각 유저를 구분할 수 있는 appUserID라는 property가 Request Body에 제공이 되는데요, 이를 Spread Sheet에 추가하여 1회 인증 후 다양한 기능을 사용할 수 있도록 구현했습니다. 일종의 회원가입입니다.

수강생 인증을 마치고, appUserID가 등록되면 Request로 전달되는 appUserID를 기반으로 모든 기능이 작동합니다.

![register](/assets/register.png)

----
##### 진도표 확인 - Google Spread Sheet API 연동

보이는 메뉴에서 진도표 확인을 누른 후 등록된 모든 자녀의 진도표 링크가 포함된 Basic Card를 자녀의 수만큼 carousel 형태로 보여줍니다. 한번만 인증하면, 더이상 요구하는 정보는 없습니다. 매우 간편하게 사용자 입장에서 접근할 수 있도록 했습니다.
![progress](/assets/progress.png)

----
##### 온라인 수업 링크 - Google Spread Sheet API 연동

학원에는 현재 Jitsi Meet 오픈소스를 활용해 자체 서버에 구축해놓은 상태입니다. 해당 url 뒤에 선생님 이름으로 생성된 온라인 링크를 전송하여, 매번 온라인 수업 링크를 선생님에게 전달받아 학생에게 전달하는 프로세스를 획기적으로 개선합니다.
혹시 자녀가 여러명이라면, 이름을 입력해주면 됩니다.

![link](/assets/link.png)

----
##### 수업 일정 확인 - Google Spread Sheet, Calendar API 연동

Google Calendar API와 연동하여 Sheet DB에서 appUserID를 기반으로 학생을 검색하고, 여러명인 경우 학생을 선택하여 캘린더에 저장되어있는 수업 일정을 확인할 수 있습니다. carousel 형태로 제공하며, 최대 10개의 일정을 보여줍니다.

![schedule](/assets/schedule.png)

----
##### 수업 일정 변경 - Google Spread Sheet API 연동

시간을 받는 카카오 i OpenBuilder의 플러그인을 사용해 변경 전 수업의 시간과, 변경 후 수업의 시간을 받고 학생이 여러명인 경우 학생을 선택해 변경요청을 하면, 학부모님이 해당 사항을 기반으로 상담을 요청할 수 있습니다.

또한 해당 Request를 관리 업무에 자동으로 추가하도록 하여 관리자가 확인할 수 있도록 했습니다. 어떤 학생이 어떤 시간으로 변경을 요청하였는지 한번에 볼 수 있도록 기능을 지원합니다.
![IMG_0949](/assets/IMG_0949.PNG)
![schedulechange](/assets/schedulechange.png)

----
##### 자주 묻는 질문
자주 묻는 질문에서는 채널 내 포스트기능을 사용해 정리하여 학부모님들이 평소에 많이 여쭤보시는 사항을 정리해 확인하실 수 있도록 하였습니다. 해당 기능은 Skill Server와 연동된 기능이 아닌 카카오 i OpenBuilder 자체 기능입니다.
![qna](/assets/qna.png)
----
## CIT 코딩학원 관리자를 마치면서 ..

햇수로 3년동안 일했던 학원을 끝마치면서, 좋은 서비스를 제공하고 나가는 것 같아 마음이 뿌듯합니다. 또한 개발자로서 단독 개발한 실제 서비스를 운영해보는 경험을 가지고, 사용자들에게 피드백을 얻어보는 경험은 흔하지 않은 경험이라고 생각하여 기회를 주신 원장님께 감사합니다.

아르바이트로 시작하고, 학원의 프로세스를 개선하고 챗봇을 개발하는 개발자로서 일을 하게되는 경험은 진짜 진짜 흔하지 않구요 ㅎ

아직 많이 부족하지만 더 좋은 서비스를 만들 수 있는 개발자로 성장하고 싶습니다.

이후 포스팅은 프로젝트를 진행하면서 겪었던 이슈들에 대해서 다뤄보고자 합니다. 내부 코드를 공개하기는 좀 어려운 상황이어서, 리팩토링은 어떻게 했고 최적화는 어떻게 했으며, 카카오 i Open Builder 사용법 (이게 많이 없더라구요..) 등등에 대해 포스팅 예정입니다.

긴 글 봐주셔서 감사합니다.
