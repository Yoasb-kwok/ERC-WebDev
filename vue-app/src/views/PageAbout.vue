<template>
  <section id="about">
    <HeroSection :slides="['/images/car.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <div style="max-width: 800px; margin: 0 auto; background: var(--bg-light); padding: 40px; border-radius: 8px;">
        <h3 style="color: var(--electric-blue); margin-bottom: 20px;">{{ copy.missionTitle }}</h3>
        <p style="margin-bottom: 20px;">{{ copy.missionP1 }}</p>
        <p>{{ copy.missionP2 }}</p>

        <hr style="margin: 30px 0; border: 0; border-top: 1px solid #ddd;">

        <h3 style="color: var(--text-main); margin-bottom: 10px;">{{ copy.schoolTitle }}</h3>
        <p style="margin-bottom: 20px;">{{ copy.schoolP1 }}</p>
        <p style="margin-bottom: 20px;">{{ copy.schoolP2 }}</p>
        <p><b>{{ copy.scaleTitle }}</b></p>
        <ul>
          <li>{{ copy.scale1 }}</li>
          <li>{{ copy.scale2 }}</li>
          <li>{{ copy.scale3 }}</li>
          <li>{{ copy.scale4 }}</li>
        </ul>
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
      title: 'About ERC',
      subtitle: 'A collaboration between ERC and Tak On Driving School',
      missionTitle: 'Our Mission',
      missionP1: 'ERC Driving Experience Center is co-created by education and driver-training experts, integrating VR, AI, EV, and tele-reality technologies into Hong Kong’s first smart driving education platform.',
      missionP2: 'Through technology innovation, we deliver safe, efficient, and inspiring learning experiences while developing road-safety awareness and STEM skills.',
      schoolTitle: 'Tak On Driving School Co., Ltd.',
      schoolP1: 'Founded by Mr. Lam Bing Tak in 1970, Tak On has over 50 years of history and focuses on traffic safety and quality driver training.',
      schoolP2: 'In recent years, the school also partnered with community organizations to provide practical vocational driving courses and received the Caring Company recognition.',
      scaleTitle: 'Company Scale & Current Status:',
      scale1: 'One of Hong Kong’s top four driving schools',
      scale2: 'Over 30 vehicles across private car, light goods vehicle, bus, and truck classes',
      scale3: 'Trains over 2,000 students each year',
      scale4: 'Over 30 instructors'
    }
    : {
      title: '關於 ERC',
      subtitle: '智能實景駕駛體驗館與德安駕駛學校合作',
      missionTitle: '我們的使命',
      missionP1: 'ERC駕駛體驗館由教育及駕駛訓練專家共同策劃，結合虛擬實景（VR）、人工智能（AI）、電動車（EV）及遙感現實（TR）技術，為香港提供首創的智能駕駛教育平台。',
      missionP2: '透過科技創新，讓每位學生都能享受安全、高效且富有啟發性的駕駛學習體驗，培育具備道路安全意識和 STEM 技能的未來人才。',
      schoolTitle: '德安駕駛學校有限公司',
      schoolP1: '德安駕駛學校 - 由林秉德先生於 1970 年成立，已有五十多年歷史，以道路交通安全，培訓良好駕駛者為目標。',
      schoolP2: '近年更與 香港善導會 合作，為更新人仕提供輕型貨車及的士課程，讓他們有機會習一技旁身，以裝備他們重投社會工作。',
      scaleTitle: '公司規模及現況 :',
      scale1: '全港四大駕駛學校之一',
      scale2: '私家車，輕型貨車，巴士，貨車共超過30部',
      scale3: '每年教導超過2000個學生',
      scale4: '師傅人數超過30人'
    }
))
</script>
