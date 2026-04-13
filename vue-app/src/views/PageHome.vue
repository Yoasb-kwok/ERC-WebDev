<template>
  <section id="home">
    <HeroSection :slides="['/images/P1.webp', '/images/P2.webp']">
      <h1>{{ copy.heroTitle }} · <span style="color:var(--racing-red)">{{ copy.heroHighlight }}</span></h1>
      <p>{{ copy.heroDesc }}</p>
      <div style="margin-top: 30px;">
        <router-link to="/courses" class="cta-button"><span>{{ copy.courseBtn }}</span></router-link>
        <router-link to="/contact" class="cta-button btn-secondary"><span>{{ copy.contactBtn }}</span></router-link>
      </div>
    </HeroSection>

    <!-- 核心體驗 (來自 ai_studio 設計) -->
    <div class="container experience-section">
      <h2 class="section-title experience-title">{{ copy.experienceTitle }}</h2>
      <div class="experience-features">
        <div class="feature-card">
          <i class="fas fa-gamepad"></i>
          <h3>{{ copy.feature1Title }}</h3>
          <p>{{ copy.feature1Desc }}</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-vr-cardboard"></i>
          <h3>{{ copy.feature2Title }}</h3>
          <p>{{ copy.feature2Desc }}</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-car-side"></i>
          <h3>{{ copy.feature3Title }}</h3>
          <p>{{ copy.feature3Desc }}</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="section-header">
        <h2>{{ copy.valueTitle }}</h2>
        <p>{{ copy.valueDesc }}</p>
      </div>

      <div class="values-container">
        <div class="card">
          <h3><i class="fas fa-graduation-cap"></i> {{ copy.card1Title }}</h3>
          <p>{{ copy.card1Desc }}</p>
        </div>
        <div class="card">
          <h3><i class="fas fa-microchip"></i> {{ copy.card2Title }}</h3>
          <p>{{ copy.card2Desc }}</p>
        </div>
        <div class="card">
          <h3><i class="fas fa-lightbulb"></i> {{ copy.card3Title }}</h3>
          <p>{{ copy.card3Desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { language } from '@/i18n'

const copy = computed(() => (
  language.value === 'en'
    ? {
      heroTitle: 'Smart Real-World Driving',
      heroHighlight: 'A New Safe Learning Experience',
      heroDesc: 'An innovative STEM solution powered by VR scenes, AI, and EV technology.',
      courseBtn: 'View Courses',
      contactBtn: 'Contact Us',
      experienceTitle: 'This Is Not a Game. This Is Real Experience.',
      feature1Title: 'Logitech G29 Force Feedback',
      feature1Desc: 'No plastic-like feel. Real road feedback and throttle precision for authentic control.',
      feature2Title: 'VR First-Person View',
      feature2Desc: 'Wear the VR headset and enter a miniature cockpit for immersive track control.',
      feature3Title: 'Real RC Car Physics',
      feature3Desc: 'No fake animation. Real mechanics, real friction, and real collision response.',
      valueTitle: 'Core Values',
      valueDesc: 'ERC combines EV, VR, AI, and tele-reality into a complete smart driving education platform developed by PolyU data science and AI students.',
      card1Title: 'Education Innovation',
      card1Desc: 'Smart learning solutions integrating VR, AI, and real-world scene technology.',
      card2Title: 'Technology Excellence',
      card2Desc: 'Latest hardware and software integration for immersive training.',
      card3Title: 'Continuous Innovation',
      card3Desc: 'Advancing safe smart-driving and autonomous-driving education.'
    }
    : {
      heroTitle: '智能實景駕駛',
      heroHighlight: '安全學習新體驗',
      heroDesc: '結合虛擬實景、人工智能與電動車技術，創新的 STEM 教育方案',
      courseBtn: '查看課程',
      contactBtn: '聯絡我們',
      experienceTitle: '這不是遊戲，是真實體驗',
      feature1Title: 'Logitech G29 力回饋',
      feature1Desc: '告別塑膠手感。真實的路感反饋、油門深淺控制，精準還原駕駛體驗。',
      feature2Title: 'VR 第一人稱視角',
      feature2Desc: '戴上 VR，你將縮小 20 倍坐進駕駛艙。以前所未有的微縮角度征服賽道。',
      feature3Title: '實體遙控車物理',
      feature3Desc: '拒絕電腦動畫。這是真實的機械運作、真實的摩擦力、真實的碰撞。',
      valueTitle: '核心價值',
      valueDesc: 'ERC 是一個以智能駕駛體驗的一個品牌，集合四大科技元素，EV，VR，AI及TR。這技術由一班PolyU 數據科學及人工智能系的學生自家研發創立。',
      card1Title: '教育創新',
      card1Desc: '結合 VR、AI 與實景技術的智能教學方案。',
      card2Title: '科技卓越',
      card2Desc: '提供最新的硬體與軟體整合解決方案。',
      card3Title: '持續創新',
      card3Desc: '實現安全智能駕駛及無人駕駛方案。'
    }
))
</script>
