/**
 * STEM 產品資料
 *
 * 相片上載：專案根目錄 images/stem-products/（建置時複製到 vue-app/public/images/stem-products/）
 * 每個產品至少兩張圖：{id}-1.webp、{id}-2.webp（或第二張用 {id}.webp；亦可用 .jpg / .jpeg）
 */
export const stemProducts = [
  {
    id: 'erc-starter-kit',
    images: [
      '/images/stem-products/erc-starter-kit-1.webp',
      '/images/stem-products/erc-starter-kit-2.webp'
    ],
    name: { zh: 'ERC Starter Kit', en: 'ERC Starter Kit' },
    price: 6000,
    intro: {
      zh: 'ERC Starter Kit 整合智能駕駛學習所需的核心硬件，適合學校及機構開展 STEM 教學或體驗活動，讓學員由零開始認識智能實景駕駛系統。',
      en: 'The ERC Starter Kit bundles core hardware for smart driving education—ideal for schools and organisations running STEM programmes or hands-on demos.'
    },
    highlights: [
      { zh: '適合課堂及體驗館使用', en: 'Suitable for classrooms and experience centres' },
      { zh: '可配合 ERC 課程模組延伸', en: 'Extends ERC course modules' }
    ]
  },
  {
    id: 'walksnail-avatar-hd',
    images: [
      '/images/stem-products/walksnail-avatar-hd-1.webp',
      '/images/stem-products/walksnail-avatar-hd.webp'
    ],
    name: {
      zh: 'Walksnail Avatar HD Goggles L with GM3 and Pro kit (Dual)',
      en: 'Walksnail Avatar HD Goggles L with GM3 and Pro kit (Dual)'
    },
    price: 4500,
    intro: {
      zh: 'Walksnail Avatar HD 頭戴式顯示器連 GM3 及 Pro 套件（Dual），提供高畫質低延遲的 FPV 視覺體驗，適合搭配 ERC 智能駕駛及 VR 教學場景使用。',
      en: 'Walksnail Avatar HD goggles with GM3 and Pro kit (Dual) deliver high-quality, low-latency FPV vision—ideal for ERC smart driving and VR learning setups.'
    },
    highlights: [
      { zh: 'HD 低延遲圖傳', en: 'HD low-latency video' },
      { zh: '適合 FPV / VR 駕駛體驗', en: 'For FPV / VR driving experiences' }
    ]
  },
  {
    id: 'g29-driving-force',
    images: [
      '/images/stem-products/g29-driving-force-1.webp',
      '/images/stem-products/g29-driving-force-2.webp'
    ],
    name: { zh: 'G29 Driving Force', en: 'G29 Driving Force' },
    price: 1799,
    intro: {
      zh: 'Logitech G29 Driving Force 力回饋方向盤，提供真實轉向阻力與油門制動感，是 ERC 駕駛體驗館及模擬賽車學習的標準周邊設備。',
      en: 'The Logitech G29 Driving Force wheel offers realistic force feedback and pedal control—the standard peripheral for ERC driving experiences and sim racing education.'
    },
    highlights: [
      { zh: '力回饋方向盤', en: 'Force feedback wheel' },
      { zh: '含油門及制動踏板', en: 'Includes throttle and brake pedals' }
    ]
  },
  {
    id: 'racing-rig-seat',
    images: [
      '/images/stem-products/racing-rig-seat-1.webp',
      '/images/stem-products/racing-rig-seat-2.webp'
    ],
    name: { zh: '賽車架連座位', en: 'Racing Rig with Seat' },
    price: 2000,
    intro: {
      zh: '賽車架連座位為駕駛模擬提供穩固坐姿及設備安裝位置，可配合方向盤、踏板及顯示設備，打造沉浸式駕駛體驗環境。',
      en: 'This racing rig with seat provides a stable driving position and mounting for wheels, pedals, and displays—building an immersive simulator setup.'
    },
    highlights: [
      { zh: '人體工學坐姿', en: 'Ergonomic seating position' },
      { zh: '可擴展安裝多種設備', en: 'Expandable for multiple peripherals' }
    ]
  },
  {
    id: 'erc-controller',
    images: [
      '/images/stem-products/erc-controller-1.webp',
      '/images/stem-products/erc-controller-2.webp'
    ],
    name: { zh: 'Controller', en: 'Controller' },
    price: 550,
    intro: {
      zh: 'Controller 為 ERC 智能駕駛系統專用控制器，讓學員以直觀操作方式控制車輛，適合課堂示範及實景駕駛練習。',
      en: 'The Controller is designed for the ERC smart driving system—giving learners intuitive vehicle control for demos and real-scene driving practice.'
    },
    highlights: [
      { zh: '專為 ERC 系統設計', en: 'Designed for ERC systems' },
      { zh: '操作簡單易學', en: 'Easy to learn' }
    ]
  }
]

export function getProductById(id) {
  return stemProducts.find((p) => p.id === id) ?? null
}
