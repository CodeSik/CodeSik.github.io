module.exports = {
  title: `CodeSik의 개발공방`,
  description: `CodeSik의 개발공방`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://codesik.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `CodeSik/CodeSik.github.io`,
    },
  },
  ga: 'UA-191544283-1', // Google Analytics Tracking ID
  author: {
    name: `서건식`,
    bio: {
      role: `개발자`,
      description: ['배움의 가치를 아는', '꾸준함의 가치를 아는', '몰입의 가치를 아는'],
      thumbnail: 'codesik.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/CodeSik`,
      email: `iqeq2328@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2016.03',
        activity: '한양대학교 컴퓨터공학부 신입학',
      },
      {
        date: '2017.03 ~ 2017.09',
        activity: '한양대학교 소프트웨어 봉사단 Python 강사',
      },

      {
        date: '2020.02',
        activity: '삼성전자 X Decenter FOUNDERS 3기 해커톤 우수상 수상',
      },
      {
        date: '2020.07 ~ 2020.08',
        activity: 'KAIST 몰입캠프',
        links: {
          github: 'https://github.com/CodeSik/GotiPocari_Project1',
          github: 'https://github.com/CodeSik/MadCampWeek2',
          github: 'https://github.com/CodeSik/MadCampWeek2_Backend',
          github: 'https://github.com/CodeSik/2020_madcamp_third',
        },
      },
      {
        date: '2020.12',
        activity: '카카오 Ground X & 삼성전자 2020 제주 블록체인 해커톤 상위 20팀 선정',
      },
      {
        date: '2019.06 - 2021.03',
        activity: 'CIT 코딩학원 관리자 & 카카오 i Open Builder 연동 Spring 기반 Rest API 서버 개발',
        links: {
          post: '/Kakao-OpenBuilder-RestAPI-Server',
        },
      },
      {
        date: '2021.04 ~',
        activity: '피플펀드 컴퍼니 - Fintech Engineering Group Backend Developer',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '카카오 i Open Builder CIT 챗봇 스킬 서버 개발',
        description:
          'CIT 코딩학원의 관리자로 일하면서, 수기로 진행되는 프로세스들을 자동화하는 백오피스 개발을 진행했습니다. 회원가입, 예약 일정 확인, 진도표 확인, 온라인 수업 링크 확인 등의 프로세스를 카카오 i OpenBuilder로 챗봇을 통해 진행할 수 있도록 API Server를 개발했습니다.',
        techStack: ['Spring', 'Java'],
        thumbnailUrl: 'cit_coding.png',
        links: {
          post: '/Kakao-OpenBuilder-RestAPI-Server',
        },
      },
    ],
  },
};
