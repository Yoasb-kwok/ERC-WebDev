<template>
  <section id="license-challenge">
    <HeroSection :slides="['/images/course.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container track-section-wrap">
      <div class="track-section">
        <div class="track-text">
          <h3>{{ copy.trackTitle }}</h3>
          <p>{{ copy.trackDesc }}</p>
          <br>
          <ul>
            <li><strong>Ground Floor:</strong> {{ copy.trackGroundFloor }}</li>
            <li><strong>Upper Deck:</strong> {{ copy.trackUpperDeck }}</li>
            <li><strong>Safety:</strong> {{ copy.trackSafety }}</li>
          </ul>
        </div>
        <div v-if="trackVideoSrc" class="track-image track-video-inline">
          <video :src="trackVideoSrc" controls playsinline class="track-video-element">
            {{ copy.videoNotSupported }}
          </video>
        </div>
        <div v-else-if="trackYoutubeEmbed" class="track-image track-video-inline track-video-youtube">
          <iframe
            :src="trackYoutubeEmbed"
            :title="copy.trackVideoTitle"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <div v-else class="track-image">
          <img :src="trackImage" :alt="copy.trackImageAlt">
        </div>
      </div>
    </div>

    <div class="container levels-section">
      <h2 class="section-title levels-title">{{ copy.planTitle }}</h2>
      <div class="level-container">
        <router-link v-for="level in copy.levels" :key="level.path" :to="level.path" class="level-card level-card-link">
          <div class="level-img">
            <img :src="level.image" :alt="level.imageAlt">
          </div>
          <div class="level-info">
            <div class="level-header">
              <h3>{{ level.title }}</h3>
              <span class="badge" :class="level.badgeClass">{{ level.badge }}</span>
            </div>
            <p>{{ level.desc }}</p>
            <ul>
              <li><i class="fas fa-check"></i> {{ level.item1 }}</li>
              <li><i class="fas fa-flag"></i> {{ level.item2 }}</li>
              <li><i class="fas fa-trophy"></i> {{ level.item3 }}</li>
            </ul>
            <span class="level-card-enter">{{ copy.levelEnter }} <i class="fas fa-chevron-right"></i></span>
          </div>
        </router-link>
      </div>
      <div class="levels-cta">
        <router-link to="/booking" class="cta-button"><span>{{ copy.bookNow }}</span></router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { language } from '@/i18n'

const trackImage = '/images/car.png'

const levelImages = {
  level1: '/images/level_1.webp',
  level2: '/images/level_2.webp',
  level3: '/images/level_3.webp'
}

const trackVideoSrc = '/videos/ERC_promo_video.mp4'
const trackYoutubeEmbed = ''

const copy = computed(() => (
  language.value === 'en'
    ? {
      title: 'License Challenge',
      subtitle: 'Professional Driver Training Program - From Beginner to Elite',
      trackTitle: 'Two-Level Extreme 3x3 Track',
      trackDesc: 'We create limitless challenges in a compact space with our exclusive 3m x 3m composite track.',
      trackGroundFloor: 'High-speed S-curves and tunnel zone to test reaction speed.',
      trackUpperDeck: 'Parking zone and cliff-edge lane to test precision control.',
      trackSafety: 'Custom foam barriers across the track protect cars and improve fault tolerance.',
      videoNotSupported: 'Your browser does not support video playback.',
      trackVideoTitle: 'Track introduction video',
      trackImageAlt: 'Track layout',
      planTitle: 'Professional Driver Development Program',
      levelEnter: 'View track and gameplay',
      bookNow: 'Book a Challenge Now',
      levels: [
        {
          path: '/license-challenge/level/1',
          image: levelImages.level1,
          imageAlt: 'Rookie Trainee',
          title: 'Level 1: Rookie Trainee',
          badge: 'Beginner',
          badgeClass: 'novice',
          desc: 'Start without VR to learn vehicle dynamics. Perfect for all beginners.',
          item1: 'Equipment: Third-person view (No VR)',
          item2: 'Mission: Track laps and acceleration-stop drills',
          item3: 'Reward: Unlock VR driving qualification'
        },
        {
          path: '/license-challenge/level/2',
          image: levelImages.level2,
          imageAlt: 'Professional Driver',
          title: 'Level 2: Professional Driver',
          badge: 'Advanced',
          badgeClass: 'pro',
          desc: 'Put on VR and enter the cockpit. Challenge your spatial judgment and blind-spot awareness.',
          item1: 'Equipment: FPV immersive VR',
          item2: 'Mission: Blind turns, slope climbing, and parking',
          item3: 'Reward: Earn a physical P-plate license'
        },
        {
          path: '/license-challenge/level/3',
          image: levelImages.level3,
          imageAlt: 'Elite Master Driver',
          title: 'Level 3: Elite Master Driver',
          badge: 'Hard',
          badgeClass: 'master',
          desc: 'Extreme control under race pressure. A complete showcase of advanced driving skill.',
          item1: 'Equipment: VR + race mode',
          item2: 'Mission: Time trial, maze race, and tofu delivery challenge',
          item3: 'Reward: Hall of Fame entry and exclusive title'
        }
      ]
    }
    : {
      title: '考照挑戰',
      subtitle: '職業賽車手養成計畫 — 從新手到菁英車神',
      trackTitle: '雙層立體．極限 3x3 賽道',
      trackDesc: '我們在有限的空間創造了無限的挑戰。獨家設計的 3公尺 x 3公尺 複合材質賽道。',
      trackGroundFloor: '高速 S 彎與隧道區，考驗反應速度。',
      trackUpperDeck: '泊車區與懸崖邊緣，考驗細膩操作。',
      trackSafety: '全場採用特製泡綿護欄，保護車輛同時增加容錯率。',
      videoNotSupported: '您的瀏覽器不支援影片播放。',
      trackVideoTitle: '賽道介紹影片',
      trackImageAlt: '賽道佈局',
      planTitle: '職業賽車手養成計畫',
      levelEnter: '查看賽道與玩法',
      bookNow: '立即預約挑戰',
      levels: [
        {
          path: '/license-challenge/level/1',
          image: levelImages.level1,
          imageAlt: '新手實習生',
          title: 'Level 1: 新手實習生',
          badge: '入門',
          badgeClass: 'novice',
          desc: '不用戴 VR，先熟悉車輛動態。適合所有初學者。',
          item1: '設備：第三人稱視角 (無VR)',
          item2: '任務：賽道繞圈、加速停車',
          item3: '獎勵：解鎖 VR 駕駛資格'
        },
        {
          path: '/license-challenge/level/2',
          image: levelImages.level2,
          imageAlt: '專業駕駛員',
          title: 'Level 2: 專業駕駛員',
          badge: '進階',
          badgeClass: 'pro',
          desc: '戴上 VR，進入駕駛艙。挑戰空間感與盲區判斷。',
          item1: '設備：FPV 沉浸式 VR',
          item2: '任務：盲彎與斜坡、泊車',
          item3: '獎勵：獲得實體 P 牌駕照'
        },
        {
          path: '/license-challenge/level/3',
          image: levelImages.level3,
          imageAlt: '菁英車神',
          title: 'Level 3: 菁英車神',
          badge: '困難',
          badgeClass: 'master',
          desc: '極限操控，分秒必爭。完美的技術展示。',
          item1: '設備：VR + 競速模式',
          item2: '任務：計時賽、迷宮賽、運送「豆腐」(特殊挑戰)',
          item3: '獎勵：登錄名人堂、專屬稱號'
        }
      ]
    }
))
</script>
