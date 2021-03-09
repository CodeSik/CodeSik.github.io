---
date: 2020-12-06 22:55:45
layout: post
title: vscode에 eslint와 prettier 설정하기
description: eslint airbnb-base와 prettier로 코드 규약을 맞추고 스타일링하는 방법을 정리한다
image: https://res.cloudinary.com/dtttkj2mc/image/upload/t_post_img/v1607415891/etc/ESLint-icon_xmsigz.png
optimized_image: https://res.cloudinary.com/dtttkj2mc/image/upload/c_pad,w_380,h_200/t_post_img/v1607415891/etc/ESLint-icon_xmsigz.png
---

<p class="callout"> 💡 개발환경을 eslint와 prettier로 설정해보자 </p>

## 환경설정

팀 프로젝트를 할 때, 우리는 제일 먼저 개발환경에 대한 명세부터 정한다. 어떤 OS를 쓸 것인가, 어떤 언어를 사용할 것인가, 얼마동안 개발할 것인가 하는 것들 말이다.\
그리고 코딩 스타일에 대한 규칙도 정한다. 들여쓰기를 어떻게 할 것인가, `{` 를 코드 옆에 붙일 것인가 밑에 붙일 것인가, 그런 것들 말이다.\
ESLint와 Prettier는 이러한 코드 규약을 지킬 수 있게 도와주는 도구다. 이 포스팅에서는 ESLint와 Prettier를 이용하여 일관성 있는 스타일로 코드를 작성하는 방법을 정리한다.

우선 vscode와 node.js를 다운받는다.

### vsCode

IDE는 vsCode를 이용할 것이다. 확장프로그램을 깔기도 쉽고, 가볍고 빠르기 때문이다.\
vscode에 git을 연동하여 쓰거나, 바로 terminal을 이용하기도 쉽고, 테마도 이쁘다.\
이 포스팅은 vscode를 기준으로 작성한다.

### node.js와 npm

이 프로젝트에서는 지금 당장  `node.js`를 이용하지 않는다. 하지만  `npm`은 필요하기 때문에 node.js는 설치해야 한다.

[node.js 홈페이지](https://nodejs.org/ko/) 에서 최신 안정 버전(12.18.3LTS)를 다운받자. 다운받은 후 node와 npm이 잘 설치되었나 확인한다. 

```bash
$ node -v #node.js 버전
$ npm -v #npm 버전
```

**npm**\
`npm`은 *패키지 관리 도구*라고 생각하면 된다. 개발의 편의성을 위해 여러 패키지를 사용할건데, 이 패키지들을 npm으로 다운받고 관리한다.

**이 프로젝트에서 사용할 패키지**\
이 프로젝트에서는 `ESLint`와 `Prettier`를 이용하여 코드 스타일을 통일한다.

### npm init

vscode에서 terminal을 열어 npm을 설정한다.

```bash
$ npm init
```


npm init을 실행하면 `package.json`파일이 생성된다. 이 package.json에 프로젝트 의존성을 저장할 것이다. 무슨 말이냐면, package.json에 '이 프로젝트에는 어떤어떤 라이브러리와 패키지가 필요하다~' 는 것을 적어놓는다는 말이다.

그러면 나중에 해당 프로젝트를 사용할때

```bash
$ npm install
```

명령어를 이용하여 똑같은 개발환경을 구축하여 개발할 수 있다.

`package.json`외에 `package-lock.json` 도 있다.\
package-lock도 package와 비슷한 기능을 한다. 프로젝트 의존성을 관리하는 일이다.\
다른 점이 있다면 package는 *범위 기준*으로 의존성을 관리하고, lock은 구체적인 정보로 의존성을 관리한다는 것이다. (참고: 이 [포스팅](https://junwoo45.github.io/2019-10-02-package-lock/))

따라서, package와 package-lock도 같이 리포에 올려둔다.

### .**gitignore 추가**

npm 으로 패키지들을 설치하다보면 node_modules 폴더가 커진다. git으로 일일히 변경사항을 추적하기보다, 아예 node_modules는 추적을 제외하는 편이 낫다.\
어차피 다른 컴퓨터에서도 `package`과 `package-lock`만 있다면 같은 node_modules 폴더를 만들 수 있기 때문이다.

`.gitignore` 파일을 생성하여 node_modules를 추적에서 제외한다. `.gitignore` 는 프로젝트 폴더에 생성한다.

```jsx
// .gitignore
node_modules
```

## ESLint

### Lint가 뭔가요?

그동안 git에 띄어쓰기때문에 커밋을 새로 했던 경험이 있는가? 함수 옆에 {를 붙일지, 아래에 새 줄로 {로 붙일지 고민했던 적이 있는가?

린트는 이런 고민을 줄여준다. 코드의 오류나 버그, 스타일 따위를 점검하는 것을 [린트(Lint) 혹은 린터(Linter)](https://en.wikipedia.org/wiki/Lint_(software))라고 부른다. 즉, 코드의 *포맷팅과 품질관리 도구*가 린트다.

린트를 사용하면 좋은 점이 또 있다. C++이나 자바에서 그려줬던 빨간줄(이름을 모르겠다)를 사용할 수 있다는 것이다..아래 사진처럼.\
abc()라는 함수를 선언하고, abbc()로 오타를 냈더니. 짜잔! 빨간줄로 알려준다! 더이상 js 빨간줄로 고통받지 말자...

![Redline](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/redline_ozgl4f.png)

### ESLint 설치

ESLint를 설치해보자.

vscode의 extensions에 `ESLint`를 검색하고 다운받는다.

![eslint plugin](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/eslint_plugin_t7x4fc.png)

그다음 npm으로 린트를 설치한다.

린트는 개발(-d 옵션) 전반적으로 쓰이니 글로벌(-g 옵션)로 설치해도 되지만, 해당 프로젝트에만 사용한다면 글로벌 옵션을 빼고 설치하자.\
vscode에서 `ctrl` + `~` (물결 위 ` 버튼) 혹은 `ctrl` + `j` 를 누르면 터미널이 열린다. 터미널에 다음과 같이 입력한다.

```bash
$ npm install -g -d eslint
```

설치가 끝난 후 init한다.

```bash
$ eslint --init
```

터미널에서 여러가지 설정을 묻는다. 나는 아래 옵션대로 설정했다. 

```bash
- to check syntax and find problems
- js modules
- vue, react: none of these
- typescript : no
- browser
- json
```

.eslintrc.json파일이 생겼다.

![eslintrc](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/eslintrc.json_aqb7lo.png)

### Airbnb 포맷 설정하기

ESLint는 린트 스타일을 설정할 수 있다. `;` 을 넣거나 빼거나, `dangling comma` 를 설정하는 등 스타일에 따라 린트를 다양하게 적용할 수 있다. 이번 포스팅에서는 ESLint의 다양한 포맷 중 `airbnb-base` 스타일을 적용한다. [eslint-airbnb-base 페이지](https://www.npmjs.com/package/eslint-config-airbnb-base)를 참고하여 진행한다. react를 쓰지 않기때문에 airbnb가 아닌 base 버전으로 사용한다.

npm 5버전 이상을 사용하고 있으므로, npx 명령어를 이용하여 모든 dependency를 한번에 설치한다.

```bash
$ npx install-peerdeps --dev eslint-config-airbnb-base
```

`.eslintrc.json` 파일의 extends에 airbnb를 추가한다.  더불어, eslint를 사용하면서 에러가 나는 경우가 있으니 다른 설정들도 함께 수정했다.

```json
// .eslintrc.json
{
    "env": {
        "browser": true,
        "node": true,  // 에러 방지 위해 browswer, node 둘다 true
        "es2020": true  //2020-12-03 기준 2021은 eslint가 안되는 오류가 있다
    },
    "extends": ["eslint:recommended", "airbnb-base"], //airbnb-base 포맷 사용
    "parserOptions": {
        "ecmaVersion": 11, //es2020
        "sourceType": "module"
    },
    "rules": {
    }
}
```

### eslint 동작 확인

eslint가 잘 동작하는지 확인해본다.

우선 포맷을 적용할 코드를 준비한다. 아래는 예시다.

```js
//test.js
function init(){
    const single_q = 'hello world';
    const double_q = "hello world";
	    const no_semi = 500
		console.log('hello world!')
}
init();
```

터미널을 열고 eslint를 실행한다.

```bash
$ eslint lintTest.js --fix
```

파일 코드 스타일이 깔끔하게 통일된다.

### ESLint 적용이 안된다면?

> *"ESLint is disabled since its execution has not been approved or denied yet. Use the light bulb menu to open the approval dialog."*

라며 파란 전구가 뜰 수가 있다. vscode를 사용하는 경우 eslint 사용을 허가해주어야 하기 때문이다.\
그럴땐 파란전구를 눌러서 뜨는 팝업창에서 allow를 누르면 해결된다.

## Prettier

이름에서부터 알 수 있듯 Prettier는 코드를 더 예쁘게 만든다. 

ESLint는 예쁘게하기 + 코드 악취 제거라면 Prettier는 그냥 예쁘게 만드는 용도로 쓴다. 린트에서도 포맷팅 기능이 있지만, 프리티어를 더 많이 쓴다.

### Prettier 설치

extensions에서 prettier를 검색하여 설치한다.

![prettier-plugin](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/prettier_plugin_lybhgl.png)

프리티어도 개발 전반적으로 사용하기 때문에, -d와 -g 옵션을 주고 설치한다. 물론 프로젝트에서만 사용할거라면 -g옵션을 생략해도 된다.

```bash
$ npm install --save-dev --save-exact prettier
```

### 린트에 프리티어 끼얹기 (생략가능)

린트는 자바스크립트 문법을 검사하고, 코드 포맷팅은 프리티어가 맡게한다. ESLint가 프린티어의 형식에 맞춰 린팅하도록 해보자. 이 옵션을 생략하고 바로 prettier extension만 사용해도 된다.\
프리티어와 프리티어 플러그인을 설치한다. 플러그인은 eslint에 끼얹는 용도다.

```bash
$ npm install eslint-plugin-prettier@latest --save-dev -g 
$ npm install --save-dev eslint-config-prettier # prettier와 겹치는 eslint 룰 삭제
$ npm install --save-dev eslint-plugin-prettier # eslint 기본 포맷 대신 프리티어 룰과 동일한 포매팅을 이용함

```

`.eslintrc`에 프리티어 확장팩을 설정한다. 뒤에 오는 설정이 앞을 덮어쓰기때문에 꼭 prettier가 뒤로 와야 한다!

```json
// estlintrc.json
"extends": ["eslint:recommended","airbnb-base", "plugin:prettier/recommended"],
```

<p class="callout">⚠️ Vscode에서 .prettierrc와 eslint(prettier/prettier)의 싱크가 맞지 않는 문제가 발생하는 경우</p>

vscode를 이용할 떄, prettierrc는 수정했으나 eslint에는 반영되지 않는 경우가 있다. 이런 경우, vscode를 재시작하면 변경된 prettierrc로 잘 적용된다. 참고 링크 (<https://github.com/prettier/eslint-plugin-prettier/issues/103>)


**린트에 prettier 적용 확인하기**

린트를 사용하는 방법과 같다. 아래 명령어를 수행하고 코드가 포맷팅되는지 확인한다. 

```bash
eslint lintTest.js --fix # 린트에 프리티어 확장을 설치한 경우
prettier --check . # 프리티어로 체크했을때 문제가 있는 파일 목록 출력
prettier --write  test.js # test.js파일을 포맷팅해서 덮어쓴다
```

### .prettierrc 만들기

린트의 설정은 eslintrc에서 세팅했다. 그렇다면 prettier의 설정은 어디서 수정할까? 그렇다. `.prettierrc` 파일이다. 이 파일도 json으로 만들수 있지만 js로 만들었다. 주석을 넣고싶었기 때문이다.

.prettierrc.js 파일을 만들어 아래와 같은 내용을 넣는다. (내용참고: [시간을-줄이자-React-Vscode-초기세팅](https://velog.io/@jonmad/%EC%8B%9C%EA%B0%84%EC%9D%84-%EC%A4%84%EC%9D%B4%EC%9E%90-React-Vscode-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85))

```js
// .prettierrc.js
module.exports = {
    singleQuote: true,
    // 문자열은 홑따옴표로 formatting
    semi: true,
    //코드 마지막에 세미콜른이 있게 formatting
    useTabs: false,
    //탭의 사용을 금하고 스페이스바 사용으로 대체하게 formatting
    tabWidth: 2,
    // 들여쓰기 너비는 2칸
    trailingComma: 'all',
    // 자세한 설명은 구글링이 짱이긴하나 객체나 배열 키:값 뒤에 항상 콤마를 붙히도록 	  	//formatting
    printWidth: 80,
    // 코드 한줄이 maximum 80칸
    arrowParens: 'avoid',
    // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting
    endOfLine: "auto",
    // windows에 뜨는 'Delete cr' 에러 해결
  };
```

## VSCode 확장프로그램 설정

ESLint도 코드 포맷팅 기능이 있고, 프리티어도 있다. 둘이 충돌하지 않게 겹치는부분은 ESLint의 기능을 꺼준다. 

**ESLint - Setting (단축키 ctrl+,)**

![eslint setting](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/eslint_setting_fpgptn.png)

vscode에서 기본 format을 prettier로 설정한다.

```bash
1. ctrl + shift + p를 눌러 팔레트를 연다.
2. format document with ~
3. config default formatter
4. prettier 선택
```

이제 eslint 명령어를 입력할 필요 없이 vscode의 **format document**(단축키 shift+alt+F)로 포매팅 할 수 있다.

### test.js 작성

프리티어와 린트가 잘 작동하는지 알아보자.

test.js파일을 만든다.

```js
function init(){
    const single_q = 'hello world';
    const double_q = "hello world";
    const no_semi = 500
		console.log('hello world!')
}
init();
```

세미콜론이 빠지고,  어떤 문자열은 따옴표고 어떤건 쌍따옴표로 적는 등 포맷을 지키지 않은 코드를 준비했다.\
palette에서 format document - prettier를 하면 코드가 정렬된다.

### 저장시 코드 자동 포맷팅

매번 이렇게 포맷팅하기 귀찮다. 저장시 알아서 포맷팅하게 설정하자.

ESLint 환경설정에서 *code actions on save* 를 설정한다.

![code action on save](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/onsave_nx6r5o.png)

이제 저장버튼을 누를 때마다 linter가 오류를 검사한다.

그리고 Format On Save도 체크한다. 이제 프리티어가 저장할때마다 format해줄 것이다.

![format on save](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417300/post/tips/eslint-prettier/formatOnsave_ejilnd.png)

![formatted](https://res.cloudinary.com/dtttkj2mc/image/upload/v1607417301/post/tips/eslint-prettier/after_format_bvbmux.png)

### 경고 수준 바꾸기

eslint가 빨간줄을 쳐주는건 좋은데, 문법 오류든, 선언만 해두고 안 쓴 변수든 모두 빨간줄로 알려준다.\
경고 수준을 바꿔 알아보기 편하게 만들자.

.eslintrc.json의 rule를 아래와 같이 변경한다.

```json
"rules": { "no-unused-vars": "warn" }
```

이제 오류가 아닌 경고로 표시된다.
