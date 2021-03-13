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

## 프로젝트 개요

### 시작하게된 계기와 CIT 코딩학원 관리자를 마치면서 ..

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

#### 원장님으로부터의 제안
저희 학원 원장님은 아주 훌륭하신 분입니다.👍

정해진 업무뿐만 아니라 스스로 개선할 수 있는 부분을 찾아서 자동화하는 저의 능력을 인정해주시고, 상담 부분에서 더 많은 부분을 자동화 할 수 있도록 개발을 부탁하셨습니다.

그렇게 개발하게된 프로젝트가 카카오 i Open Builder의 Skill Server를 연동하기 위해 Spring 기반 Rest API 서버를 만들어 연결한 후, 엔티티와 시나리오, 블록 작업을 통해 Flow를 제작한 후 챗봇을 만들었습니다.

이를 통해 수작업으로 이뤄지던 학부모님들의 요청사항을 자동화할 수 있도록 하는 것 이었습니다. 제공하는 기능은 다음과 같습니다.

##### 수강생 인증

학원에 등록이 되어있다면, 프로필 이용 플러그인을 통해 전화번호를 1회 제공받은 뒤 이를 학원에서 사용하는 Google Spread Sheet 내에서 검색하여 학생을 찾습니다. 그 후, Developers App과 연동된 채널은 각 유저를 구분할 수 있는 appUserID라는 property가 Request Body에 제공이 되는데요, 이를 Spread Sheet에 추가하여 1회 인증 후 다양한 기능을 사용할 수 있도록 구현했습니다. 일종의 회원가입입니다.

####
