<template>
  <section id="level-detail" class="level-detail-page">
    <div class="container">
      <router-link to="/license-challenge" class="level-detail-back">
        <i class="fas fa-arrow-left"></i> {{ copy.back }}
      </router-link>

      <header class="level-detail-header">
        <span class="badge" :class="levelMeta.badgeClass">{{ levelMeta.badgeText }}</span>
        <h1>{{ levelMeta.title }}</h1>
        <p class="level-detail-desc">{{ levelMeta.desc }}</p>
      </header>

      <!-- 賽道影片 -->
      <section class="level-detail-video-section">
        <h2><i class="fas fa-video"></i> {{ copy.videoTitle }}</h2>
        <div v-if="levelMeta.videoSrc" class="level-detail-video-wrap">
          <video :src="levelMeta.videoSrc" controls playsinline class="level-detail-video">
            {{ copy.videoNotSupported }}
          </video>
        </div>
        <div v-else class="level-detail-coming-soon">
          <i class="fas fa-film"></i>
          <p>Coming Soon</p>
          <span>{{ copy.videoSoon }}</span>
        </div>
      </section>

      <!-- 玩法介紹 -->
      <section class="level-detail-gameplay">
        <h2><i class="fas fa-gamepad"></i> {{ copy.gameplayTitle }}</h2>
        <div v-if="levelMeta.gameplayHtml" class="level-detail-gameplay-content" v-html="levelMeta.gameplayHtml"></div>
        <div v-else class="level-detail-coming-soon">
          <i class="fas fa-tasks"></i>
          <p>Coming Soon</p>
          <span>{{ copy.gameplaySoon }}</span>
        </div>
      </section>

      <div class="level-detail-cta">
        <router-link to="/booking" class="cta-button cta-button--accent"><span>{{ copy.bookNow }}</span></router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { language } from '@/i18n'

const route = useRoute()
const levelId = computed(() => route.params.id || '1')

const gameplay = computed(() => (
  language.value === 'en'
    ? {
      level1: `
        <div class="gameplay-blocks">
          <div class="gameplay-task">
            <h3>Mission A - Track Lap</h3>
            <p>Driver must complete the target lap route without touching the foam barriers.</p>
            <p class="gameplay-point"><strong>Assessment:</strong> Steering smoothness and corner control without getting stuck.</p>
          </div>
          <div class="gameplay-task">
            <h3>Mission B - Accelerate and Stop</h3>
            <p>Driver accelerates from the start point and fully stops inside the marked parking box.</p>
            <p class="gameplay-point"><strong>Assessment:</strong> Throttle and braking precision. Fails if overshooting or not entering the box.</p>
          </div>
        </div>
      `,
      level2: `
        <div class="gameplay-blocks">
          <div class="gameplay-task">
            <h3>Mission A - Blind Turn and Slope</h3>
            <p>Driver navigates narrow bends and climbs to the second level steadily.</p>
            <p class="gameplay-point"><strong>Assessment:</strong> During ascent, vision may only show ceiling; maintain straight control based on vehicle position feel.</p>
          </div>
          <div class="gameplay-task">
            <h3>Mission B - Parking</h3>
            <p>Park accurately at the designated parking bay on the second level.</p>
            <p class="gameplay-point"><strong>Assessment:</strong> Vehicle must be aligned fully inside the bay without touching foam walls.</p>
          </div>
        </div>
      `,
      level3: `
        <div class="gameplay-blocks gameplay-blocks-stack">
          <div class="gameplay-task">
            <h3>Full Track Time Trial</h3>
            <p><strong>Rules:</strong></p>
            <ul class="gameplay-list">
              <li><strong>Timed mode:</strong> Must finish within the target time (e.g. 2 minutes).</li>
              <li><strong>Penalty mode:</strong> Each foam-wall hit adds +5 seconds.</li>
              <li><strong>Survival mode:</strong> Vehicle rollover or falling from upper level results in DNF.</li>
            </ul>
          </div>
          <div class="gameplay-task">
            <h3>Maze Race</h3>
            <p>Drivers race through a maze layout and must escape successfully. The final Friday of each month is maze-race day with a new layout every time.</p>
          </div>
          <div class="gameplay-task">
            <h3>Special Challenge - Tofu Delivery</h3>
            <p>This challenge pays tribute to Initial D.</p>
            <p>Place an ultra-light cup or ping-pong ball setup on the car nose. Complete one lap without dropping it. This tests throttle finesse instead of raw speed.</p>
          </div>
        </div>
      `
    }
    : {
      level1: `
        <div class="gameplay-blocks">
          <div class="gameplay-task">
            <h3>任務 A － 賽道繞圈</h3>
            <p>玩家需要控制車輛完成指定賽道繞圈，不可觸碰到泡綿邊界。</p>
            <p class="gameplay-point"><strong>考核點：</strong>轉向的平滑度，避免車輛卡死在角落。</p>
          </div>
          <div class="gameplay-task">
            <h3>任務 B － 加速停車</h3>
            <p>玩家需從起點直線加速，在指定區域（用顏色膠帶貼出的一個小方框）內完全煞停。</p>
            <p class="gameplay-point"><strong>考核點：</strong>油門與煞車的細膩度。超出框線或未進框皆失敗。</p>
          </div>
        </div>
      `,
      level2: `
        <div class="gameplay-blocks">
          <div class="gameplay-task">
            <h3>任務 A － 盲彎與斜坡</h3>
            <p>玩家需駕駛車輛通過泡綿賽道的窄彎，並穩定地開上斜坡到達第二層。</p>
            <p class="gameplay-point"><strong>考核點：</strong>上坡時視野會只看到天花板，玩家需要憑藉對車頭位置的感覺保持直線，避免掉落。</p>
          </div>
          <div class="gameplay-task">
            <h3>任務 B － 泊車</h3>
            <p>在第二層的指定泊車位，進行泊車。</p>
            <p class="gameplay-point"><strong>考核點：</strong>車身必須正向停入格線內，不可擦撞泡綿牆。</p>
          </div>
        </div>
      `,
      level3: `
        <div class="gameplay-blocks gameplay-blocks-stack">
          <div class="gameplay-task">
            <h3>完整賽道計時賽</h3>
            <p><strong>規則：</strong></p>
            <ul class="gameplay-list">
              <li><strong>計時制：</strong>必須在規定時間內完成（例如 2 分鐘）。</li>
              <li><strong>扣分制：</strong>每碰撞一次泡綿牆，總時間 +5 秒（模擬車損）。</li>
              <li><strong>生存制：</strong>如果車輛翻覆或從上層掉落，直接淘汰 (DNF)。</li>
            </ul>
          </div>
          <div class="gameplay-task">
            <h3>迷宮賽</h3>
            <p>賽道以迷宮形式進行，駕駛者以成功離開迷宮為目標。每月最後一個星期五為迷宮賽道，每次迷宮賽道不同。</p>
          </div>
          <div class="gameplay-task">
            <h3>特殊挑戰 － 運送豆腐</h3>
            <p>這是致敬《頭文字D》。</p>
            <p>在車頭黏貼一個極輕的小杯子（或乒乓球在湯匙上），玩家必須跑完一圈且球不能掉落。這考驗的是 G29 的「油門細膩度」而非速度。</p>
          </div>
        </div>
      `
    }
))

const copy = computed(() => (
  language.value === 'en'
    ? {
      back: 'Back to License Challenge',
      videoTitle: 'Track Video',
      videoNotSupported: 'Your browser does not support video playback.',
      videoSoon: 'Video will be available soon',
      gameplayTitle: 'Gameplay Overview',
      gameplaySoon: 'Gameplay details coming soon',
      bookNow: 'Book a Challenge Now'
    }
    : {
      back: '返回考照挑戰',
      videoTitle: '賽道影片',
      videoNotSupported: '您的瀏覽器不支援影片播放。',
      videoSoon: '影片即將上架',
      gameplayTitle: '玩法介紹',
      gameplaySoon: '玩法介紹即將推出',
      bookNow: '立即預約挑戰'
    }
))

const levels = computed(() => ({
  '1': {
    title: language.value === 'en' ? 'Level 1: Rookie Trainee' : 'Level 1: 新手實習生',
    badgeText: language.value === 'en' ? 'Beginner' : '入門',
    badgeClass: 'novice',
    desc: language.value === 'en' ? 'Start without VR to learn vehicle dynamics. Perfect for all beginners.' : '不用戴 VR，先熟悉車輛動態。適合所有初學者。',
    videoSrc: '/videos/level_1.mp4',
    gameplayHtml: gameplay.value.level1
  },
  '2': {
    title: language.value === 'en' ? 'Level 2: Professional Driver' : 'Level 2: 專業駕駛員',
    badgeText: language.value === 'en' ? 'Advanced' : '進階',
    badgeClass: 'pro',
    desc: language.value === 'en' ? 'Put on VR and enter the cockpit. Challenge your spatial judgment and blind-spot awareness.' : '戴上 VR，進入駕駛艙。挑戰空間感與盲區判斷。',
    videoSrc: '',
    gameplayHtml: gameplay.value.level2
  },
  '3': {
    title: language.value === 'en' ? 'Level 3: Elite Master Driver' : 'Level 3: 菁英車神',
    badgeText: language.value === 'en' ? 'Hard' : '困難',
    badgeClass: 'master',
    desc: language.value === 'en' ? 'Extreme control under race pressure. A complete showcase of advanced driving skill.' : '極限操控，分秒必爭。完美的技術展示。',
    videoSrc: '',
    gameplayHtml: gameplay.value.level3
  }
}))

const levelMeta = computed(() => levels.value[levelId.value] || levels.value['1'])
</script>
