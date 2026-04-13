/**
 * 展覽活動資料（列表與詳情頁共用）
 *
 * 活動相片放置位置與路徑：
 * - 實體資料夾：專案根目錄的 images 資料夾，即 ERC-WebDev-main/images/
 * - 建置時會複製到 vue-app/public/images/，網頁用 /images/檔名 引用
 *
 * 命名建議（可自訂）：
 * - 依活動 id 編號，例如：kcis-open-day-2025-1.jpg、kcis-open-day-2025-2.jpg
 * - 或簡短名稱：e3-gallery-1.jpg、e2-gallery-1.jpg
 * - 支援 .jpg、.jpeg、.png、.webp
 *
 * 下方每個活動的 gallery 陣列請改成你的圖片路徑，例如：
 * gallery: [
 *   { src: '/images/kcis-open-day-2025-1.jpg', alt: '蘇浙公學開放日 相片 1' },
 *   { src: '/images/kcis-open-day-2025-2.jpg', alt: '蘇浙公學開放日 相片 2' },
 * ]
 */
export const exhibitions = [
  {
    id: 'kcis-open-day-2025',
    title: { zh: '蘇浙公學(北角)開放日', en: 'Kiangsu-Chekiang College Open Day' },
    date: { zh: '2025年 11月 30日', en: 'Nov 30, 2025' },
    coverImage: '/images/kccnp2025_1.jpg',
    intro: {
      zh: 'ERC 將STEM 教育帶入校園，讓學生親手操控結合 AI 與 VR 技術的模型電動車。',
      en: 'ERC brought STEM driving education into campus with AI + VR model EV hands-on experiences.'
    },
    introDetail: {
      zh: '開放日當天，ERC 於校內設置智能實景駕駛體驗區，讓學生透過 VR 與實景賽道體驗安全駕駛與科技學習。',
      en: 'During the Open Day, ERC set up an immersive smart-driving zone where students learned safety, mechanics, and coding through VR and physical tracks.'
    },
    tags: [{ zh: '趣味導向', en: 'Fun Learning' }, { zh: '走進校園', en: 'Campus Event' }, { zh: '開放日', en: 'Open Day' }],
    gallery: [
      { src: '/images/kccnp2025_1.jpg', alt: '蘇浙公學開放日 相片 1' },
      { src: '/images/kccnp2025_2.jpg', alt: '蘇浙公學開放日 相片 2' },
      { src: '/images/kccnp2025_3.jpg', alt: '蘇浙公學開放日 相片 3' },
      { src: '/images/kccnp2025_4.jpg', alt: '蘇浙公學開放日 相片 4' },
      { src: '/images/kccnp2025_5.jpg', alt: '蘇浙公學開放日 相片 5' }
    ]
  },
  {
    id: 'outdoor-sports-expo-2025',
    title: { zh: '香港戶外用品及運動博覽 2025', en: 'Hong Kong Outdoor & Sports Expo 2025' },
    date: { zh: '2025年 11月 21–23日', en: 'Nov 21-23, 2025' },
    coverImage: '/images/IndoorSport2025_1.jpg',
    intro: {
      zh: '展示駕駛模擬技術如何應用於教育及安全訓練，結合戶外及運動主題展示創新科技。',
      en: 'Showcased how driving simulation can support education and road safety training.'
    },
    introDetail: {
      zh: 'ERC 在會場設置智能實景駕駛體驗區，讓參加者在運動節中同時體驗智能駕駛教育。',
      en: 'ERC built a smart-driving experience zone at the expo to connect sports events with immersive driving technology education.'
    },
    tags: [{ zh: '運動博覽', en: 'Sports Expo' }, { zh: '科技展示', en: 'Tech Showcase' }],
    gallery: [
      { src: '/images/IndoorSport2025_1.jpg', alt: '戶外用品及運動博覽 相片 1' },
      { src: '/images/IndoorSport2025_2.jpg', alt: '戶外用品及運動博覽 相片 2' },
      { src: '/images/IndoorSport2025_3.jpg', alt: '戶外用品及運動博覽 相片 3' },
      { src: '/images/IndoorSport2025_4.jpg', alt: '戶外用品及運動博覽 相片 4' },
      { src: '/images/IndoorSport2025_5.jpg', alt: '戶外用品及運動博覽 相片 5' },
      { src: '/images/IndoorSport2025_6.jpg', alt: '戶外用品及運動博覽 相片 6' }
    ]
  },
  {
    id: 'hong-kong-sports-festival-2025',
    title: { zh: '香港運動節 2025', en: 'Hong Kong Sports Festival 2025' },
    date: { zh: '2025年 8月 22–24日', en: 'Aug 22-24, 2025' },
    coverImage: '/images/sportfest2025_1.jpg',
    intro: {
      zh: '設置智能實景駕駛體驗區，讓參加者以模擬實景方式了解安全駕駛及道路風險管理。',
      en: 'An immersive zone helped participants learn safe driving and risk awareness through simulation.'
    },
    introDetail: {
      zh: 'ERC 在運動節中融合 VR 與駕駛體驗，推動公眾以科技方式學習道路安全。',
      en: 'ERC blended VR and driving simulation into the festival, promoting road-safety education with interactive technology.'
    },
    tags: [{ zh: '運動節', en: 'Sports Festival' }, { zh: '體驗展示', en: 'Interactive Demo' }],
    gallery: [
      { src: '/images/sportfest2025_1.jpg', alt: '香港運動節 相片 1' },
      { src: '/images/sportfest2025_2.jpg', alt: '香港運動節 相片 2' },
      { src: '/images/sportfest2025_3.jpg', alt: '香港運動節 相片 3' },
      { src: '/images/sportfest2025_4.jpg', alt: '香港運動節 相片 4' }
    ]
  }
]

export function getExhibitionById(id) {
  return exhibitions.find(e => e.id === id) || null
}
