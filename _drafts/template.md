---
date: 2020-08-30 07:21:00 +0900
layout: post
title: Template title
subtitle: subtitle- 부제목
description: >- # this means to ignore newlines until "baseurl:"
  description 
  this is description
  Hello world!
image: https://res.cloudinary.com/dm7h7e8xj/image/upload/v1559821648/theme8_knvabs.jpg
optimized_image: https://res.cloudinary.com/dm7h7e8xj/image/upload/c_scale,w_380/v1559822138/theme9_v273a9.jpg
category: asdf
tags: [hot, summer]
  -tage1
  -tag2
author: sunmon
paginate: true
excerpt_separator: <!--more-->
math: true
published: false
food: Pizza
---

<h1>{{ page.food }}</h1>


Out-of-excerpt

포스트발췌 예시
<!--more-->
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>


이미지 크기 : 760x399
optimized 크기: 380x200