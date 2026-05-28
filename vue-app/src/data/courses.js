/**
 * 課程資料（列表與詳情頁共用）
 *
 * Poster 上載位置：
 * - 專案根目錄 images/courses/（建置時會複製到 vue-app/public/images/courses/）
 * - 檔名格式：{課程id}-poster.jpg 或 .jpeg（例如 scaa-driving-poster.jpg）
 * - 上載至專案根目錄 images/courses/，執行 npm run dev 會同步到 public
 * - 若改用其他檔名或格式，請修改下方各課程的 poster 路徑
 *
 * A1、A4 已設 visible: false 不顯示於列表；需要時改為 true 即可恢復
 */
export const courses = [
  {
    id: 'a1',
    visible: false,
    poster: '/images/courses/a1-poster.jpg',
    category: { zh: '汽車硬件拼裝學習', en: 'Vehicle Hardware Assembly' },
    title: { zh: 'Lego ERC課程', en: 'Lego ERC Course' },
    subtitle: { zh: '硬件體驗學習', en: 'Hardware Experience Learning' },
    intro: {
      zh: '讓學童可以從細分的硬件組合成一件可用及可行駛的汽車，從而啟發學生的動手製作能力及認識汽車結構。',
      en: 'Students assemble segmented hardware parts into a functional drivable car, strengthening hands-on making skills and understanding of vehicle structure.'
    },
    tags: [{ zh: 'Lego', en: 'Lego' }, { zh: '動手實驗', en: 'Hands-on Lab' }]
  },
  {
    id: 'a2',
    visible: true,
    group: 'summer',
    poster: '/images/courses/a2-poster.jpg',
    category: { zh: '暑期課程 · 編程應用', en: 'Summer Course · Programming' },
    title: { zh: 'Microcontroller ERC課程', en: 'Microcontroller ERC Course' },
    subtitle: { zh: '由零組裝機械車 · IoT · Python · Arduino', en: 'Build from scratch · IoT · Python · Arduino' },
    intro: {
      zh: '同學將由零開始組裝專屬機械車，認識物聯網（IoT）與各類電子零件的通訊方式，並透過 Python 及 Arduino 學習編程與實作，在動手過程中建立硬體與軟體整合的基礎能力。',
      en: 'Learners build their own robotic car from scratch, explore how IoT and electronic components communicate, and practise coding with Python and Arduino—gaining hands-on hardware–software integration skills.'
    },
    fee: { zh: '$1,600 / 4 堂', en: 'HK$1,600 / 4 sessions' },
    info: [
      {
        label: { zh: '適合年齡', en: 'Age' },
        value: { zh: '9–16 歲', en: 'Ages 9–16' }
      },
      {
        label: { zh: '暑期開課日期', en: 'Summer intakes' },
        value: {
          zh: '13/7–16/7、20/7–23/7、27/7–30/7、3/8–6/8、10/8–13/8、17/8–20/8（每期連續上課 4 天）',
          en: '13–16 Jul, 20–23 Jul, 27–30 Jul, 3–6 Aug, 10–13 Aug, 17–20 Aug (4 consecutive days per intake)'
        }
      },
      {
        label: { zh: '上課時間', en: 'Class times' },
        value: {
          zh: '上午班 10:30–12:00 ／ 下午班 13:30–15:00（可選上午或下午）',
          en: 'Morning 10:30–12:00 / Afternoon 13:30–15:00 (choose one)'
        }
      },
      {
        label: { zh: '上課地點', en: 'Venue' },
        value: {
          zh: 'ERC駕駛體驗館｜九龍灣臨興街21號美羅中心二期17樓15室',
          en: 'ERC Driving Experience Center, Unit 15, 17/F, Phase 2, Metro Centre II, 21 Hing Yip Street, Kowloon Bay'
        }
      }
    ],
    tags: [
      { zh: '暑期班', en: 'Summer' },
      { zh: '編程', en: 'Coding' },
      { zh: 'IoT', en: 'IoT' },
      { zh: 'Arduino', en: 'Arduino' }
    ]
  },
  {
    id: 'a3',
    visible: true,
    group: 'summer',
    poster: '/images/courses/a3-poster.jpg',
    category: { zh: '暑期課程 · VR/AR', en: 'Summer Course · VR/AR' },
    title: { zh: 'CoSpaces VR/AR', en: 'CoSpaces VR/AR' },
    subtitle: { zh: '3D 世界設計 · META Quest 虛擬實境', en: '3D world design · META Quest VR' },
    intro: {
      zh: '同學將學會使用 CoSpaces 設計並建立自己的 3D 世界，再透過 META Quest 頭戴裝置探索虛擬實境（VR），親身走進自己創作的場景，結合創意、設計與沉浸式體驗。',
      en: 'Learners use CoSpaces to design and build their own 3D worlds, then explore them in virtual reality with META Quest headsets—combining creativity, design, and immersive VR experiences.'
    },
    fee: { zh: '$1,120 / 4 堂', en: 'HK$1,120 / 4 sessions' },
    info: [
      {
        label: { zh: '適合年齡', en: 'Age' },
        value: { zh: '6–16 歲', en: 'Ages 6–16' }
      },
      {
        label: { zh: '暑期開課日期', en: 'Summer intakes' },
        value: {
          zh: '13/7–16/7、20/7–23/7、27/7–30/7、3/8–6/8、10/8–13/8、17/8–20/8（每期連續上課 4 天）',
          en: '13–16 Jul, 20–23 Jul, 27–30 Jul, 3–6 Aug, 10–13 Aug, 17–20 Aug (4 consecutive days per intake)'
        }
      },
      {
        label: { zh: '上課時間', en: 'Class times' },
        value: {
          zh: '上午班 09:15–10:15 ／ 下午班 15:15–16:15（可選上午或下午）',
          en: 'Morning 09:15–10:15 / Afternoon 15:15–16:15 (choose one)'
        }
      },
      {
        label: { zh: '上課地點', en: 'Venue' },
        value: {
          zh: 'ERC駕駛體驗館｜九龍灣臨興街21號美羅中心二期17樓15室',
          en: 'ERC Driving Experience Center, Unit 15, 17/F, Phase 2, Metro Centre II, 21 Hing Yip Street, Kowloon Bay'
        }
      }
    ],
    tags: [
      { zh: '暑期班', en: 'Summer' },
      { zh: 'CoSpaces', en: 'CoSpaces' },
      { zh: 'VR', en: 'VR' },
      { zh: 'META Quest', en: 'META Quest' }
    ]
  },
  {
    id: 'scaa-driving',
    visible: true,
    group: 'scaa',
    poster: '/images/courses/scaa-driving-poster.jpg',
    enrollUrl: 'https://member.scaa.org.hk/tc/course/28/111',
    category: { zh: 'ERC x 南華會', en: 'ERC x SCAA' },
    title: { zh: 'ERC模擬駕駛體驗學習課程', en: 'ERC Simulated Driving Experience Course' },
    subtitle: { zh: 'EV · VR · AI · 交通安全', en: 'EV · VR · AI · Road Safety' },
    intro: {
      zh: '課程提供四種不同技術取向的學習模組，讓學生透過多元方式體驗電動車（EV）、虛擬實境（VR）、人工智能（AI）及交通安全相關知識，在實作與體驗中建立跨領域的 STEM 素養。',
      en: 'The programme offers four technology-focused learning modules. Students explore electric vehicles (EV), virtual reality (VR), artificial intelligence (AI), and road safety through hands-on, varied learning experiences.'
    },
    fee: { zh: '$2,200 / 4 堂', en: 'HK$2,200 / 4 sessions' },
    info: [
      {
        label: { zh: '課程選擇', en: 'Module options' },
        value: {
          zh: 'A1 Bricks ERC課程｜A2 Microcontroller ERC課程｜A3 CoSpaces VR/AR｜A4 實景操作及教育道路安全常識',
          en: 'A1 Bricks ERC｜A2 Microcontroller ERC｜A3 CoSpaces VR/AR｜A4 Practical driving & road safety education'
        }
      },
      {
        label: { zh: '適合對象', en: 'Suitable for' },
        value: { zh: '10 歲或以上青少年', en: 'Young people aged 10 and above' }
      },
      {
        label: { zh: '上課日期', en: 'Course dates' },
        value: {
          zh: '20/7–24/7、17/8–21/8（逢星期一、二、三、五）',
          en: '20–24 Jul, 17–21 Aug (Mon, Tue, Wed & Fri)'
        }
      },
      {
        label: { zh: '上課地點', en: 'Venue' },
        value: {
          zh: '南華體育會｜賽馬會運動場 1/F VIP室',
          en: 'SCAA · Jockey Club Sports Ground, 1/F VIP Room'
        }
      },
      {
        label: { zh: '查詢及報名', en: 'Enquiries & registration' },
        value: {
          zh: '詳情請瀏覽南華會課程頁面，或 WhatsApp 9606 1079',
          en: 'See the SCAA course page for details, or WhatsApp 9606 1079'
        }
      }
    ],
    tags: [
      { zh: '南華會', en: 'SCAA' },
      { zh: 'EV', en: 'EV' },
      { zh: 'VR', en: 'VR' },
      { zh: 'AI', en: 'AI' },
      { zh: '交通安全', en: 'Road Safety' }
    ]
  },
  {
    id: 'scaa-stem',
    visible: true,
    group: 'scaa',
    poster: '/images/courses/scaa-stem-poster.jpg',
    enrollUrl: 'https://member.scaa.org.hk/tc/course/28/111',
    category: { zh: 'ERC x 南華會', en: 'ERC x SCAA' },
    title: { zh: '暑期STEM創新工作坊', en: 'Summer STEM Innovation Workshop' },
    subtitle: { zh: '三種工作坊任選', en: 'Three workshop options' },
    intro: {
      zh: '提供三種 STEM 創新工作坊，讓學童透過動手製作與專題探究，體驗工程設計、物理原理及未來出行科技。請按興趣選擇 B1、B2 或 B3 工作坊。',
      en: 'Choose from three STEM innovation workshops—hands-on making and themed projects in engineering design, physics, and future mobility. Select B1, B2, or B3 when enrolling.'
    },
    infoLead: [
      {
        label: { zh: '上課日期', en: 'Dates' },
        value: {
          zh: '3/8–7/8（逢星期一、二、三、五）',
          en: '3–7 Aug (Mon, Tue, Wed & Fri)'
        }
      }
    ],
    workshops: [
      {
        title: { zh: 'B1 Bricks 陀螺工作坊', en: 'B1 Bricks Spinning Top Workshop' },
        details: [
          {
            label: { zh: '形式', en: 'Format' },
            value: { zh: '單堂工作坊', en: 'Single-session workshop' }
          },
          {
            label: { zh: '時間', en: 'Time' },
            value: { zh: '14:00–15:15 或 16:00–17:15', en: '14:00–15:15 or 16:00–17:15' }
          },
          {
            label: { zh: '適合年齡', en: 'Age' },
            value: { zh: '6–12 歲', en: 'Ages 6–12' }
          },
          {
            label: { zh: '備註', en: 'Note' },
            value: { zh: '完成作品後可帶走', en: 'Take your finished project home' }
          },
          {
            label: { zh: '費用', en: 'Fee' },
            value: { zh: '$450 / 1 堂', en: 'HK$450 / 1 session' }
          },
          {
            label: { zh: '地點', en: 'Venue' },
            value: {
              zh: '南華體育會｜賽馬會運動場 1/F VIP室',
              en: 'SCAA · Jockey Club Sports Ground, 1/F VIP Room'
            }
          }
        ]
      },
      {
        title: { zh: 'B2 彈弓車工作坊', en: 'B2 Catapult Car Workshop' },
        details: [
          {
            label: { zh: '形式', en: 'Format' },
            value: { zh: '單堂工作坊', en: 'Single-session workshop' }
          },
          {
            label: { zh: '時間', en: 'Time' },
            value: { zh: '14:00–15:15 或 16:00–17:15', en: '14:00–15:15 or 16:00–17:15' }
          },
          {
            label: { zh: '適合年齡', en: 'Age' },
            value: { zh: '6–12 歲', en: 'Ages 6–12' }
          },
          {
            label: { zh: '備註', en: 'Note' },
            value: { zh: '完成作品後可帶走', en: 'Take your finished project home' }
          },
          {
            label: { zh: '費用', en: 'Fee' },
            value: { zh: '$500 / 1 堂', en: 'HK$500 / 1 session' }
          },
          {
            label: { zh: '地點', en: 'Venue' },
            value: {
              zh: '南華體育會｜賽馬會運動場 1/F VIP室',
              en: 'SCAA · Jockey Club Sports Ground, 1/F VIP Room'
            }
          }
        ]
      },
      {
        title: { zh: 'B3 未來汽車出行大冒險', en: 'B3 Future Mobility Adventure' },
        details: [
          {
            label: { zh: '形式', en: 'Format' },
            value: { zh: '4 堂工作坊（每堂 1.5 小時）', en: '4 sessions (1.5 hours each)' }
          },
          {
            label: { zh: '時間', en: 'Time' },
            value: { zh: '10:30–12:00', en: '10:30–12:00' }
          },
          {
            label: { zh: '適合年齡', en: 'Age' },
            value: { zh: '7–12 歲', en: 'Ages 7–12' }
          },
          {
            label: { zh: '費用', en: 'Fee' },
            value: { zh: '$2,200 / 4 堂', en: 'HK$2,200 / 4 sessions' }
          },
          {
            label: { zh: '地點', en: 'Venue' },
            value: { zh: '南華會活動室', en: 'SCAA activity room' }
          }
        ]
      }
    ],
    infoFooter: [
      {
        label: { zh: '查詢及報名', en: 'Enquiries & registration' },
        value: {
          zh: '詳情請瀏覽南華會課程頁面，或 WhatsApp 9606 1079',
          en: 'See the SCAA course page for details, or WhatsApp 9606 1079'
        }
      }
    ],
    tags: [
      { zh: '南華會', en: 'SCAA' },
      { zh: 'STEM', en: 'STEM' },
      { zh: '工作坊', en: 'Workshop' },
      { zh: '動手做', en: 'Hands-on' }
    ]
  },
  {
    id: 'a4',
    visible: false,
    poster: '/images/courses/a4-poster.jpg',
    category: { zh: '道路安全技能', en: 'Road Safety Skills' },
    title: { zh: '實景操作及教育道路安全常識', en: 'Practical Driving and Road Safety Education' },
    subtitle: { zh: '實景操作及教育道路安全常識', en: 'Real-Scene Practice and Safety Awareness' },
    intro: {
      zh: '在車輛行進的路面設計中，可融入真實場景模擬，例如交通燈、路口、迴旋處等，讓學習者根據實際道路規定進行安全操作。這能有效提升學生對交通標誌和指示的敏感度，進一步增強道路安全意識。',
      en: 'Realistic elements such as traffic lights, junctions, and roundabouts are integrated into the route so learners practice by real traffic rules and improve sensitivity to signs and road instructions.'
    },
    tags: [{ zh: '實景駕駛', en: 'Real-Scene Driving' }, { zh: '遙控操作', en: 'Remote Control' }]
  }
]

const courseGroupMeta = [
  { id: 'summer', title: { zh: '暑期課程', en: 'Summer Courses' } },
  { id: 'scaa', title: { zh: 'ERC x 南華會', en: 'ERC x SCAA' } }
]

export function getVisibleCourses() {
  return courses.filter(c => c.visible)
}

export function getCourseSections() {
  return courseGroupMeta
    .map((group) => ({
      ...group,
      courses: courses.filter((c) => c.visible && c.group === group.id)
    }))
    .filter((section) => section.courses.length > 0)
}

export function getCourseById(id) {
  const course = courses.find(c => c.id === id)
  if (!course || !course.visible) return null
  return course
}
