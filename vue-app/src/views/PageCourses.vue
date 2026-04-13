<template>
  <section id="courses">
    <HeroSection :slides="['/images/course.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <div class="section-header">
        <h2>{{ copy.modulesTitle }}</h2>
        <p>{{ copy.modulesSubtitle }}</p>
      </div>

      <div class="grid-container">
        <div v-for="course in copy.courseCards" :key="course.title" class="card">
          <div class="card-date">{{ course.category }}</div>
          <h3>{{ course.title }} <br>({{ course.subtitle }})</h3>
          <p>{{ course.description }}</p>
          <span class="tag">{{ course.tag1 }}</span>
          <span class="tag">{{ course.tag2 }}</span>
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
      title: 'ERC STEM Courses',
      subtitle: 'Immersive smart-driving learning for primary/secondary students, parents, and teachers.',
      modulesTitle: 'Four Course Modules',
      modulesSubtitle: 'A progressive STEM learning pathway',
      courseCards: [
        {
          category: 'Vehicle Hardware Assembly',
          title: 'A1 - Lego ERC Course',
          subtitle: 'Hardware Experience Learning',
          description: 'Students assemble segmented hardware parts into a functional drivable car, strengthening hands-on making skills and understanding of vehicle structure.',
          tag1: 'Lego',
          tag2: 'Hands-on Lab'
        },
        {
          category: 'Programming Applications',
          title: 'A2 - Microcontroller ERC Course',
          subtitle: 'Programming Application Learning',
          description: 'After building the car hardware, students write code for movement commands and learn the full workflow from zero-code setup to stable driving, including turning, acceleration, and reverse control logic.',
          tag1: 'Coding',
          tag2: 'Microcontroller'
        },
        {
          category: 'Immersive Simulated Driving',
          title: 'A3 - CoSpaces VR/AR',
          subtitle: 'Virtual Scene Operation and Application',
          description: 'Driving workflow is mapped from virtual scenes into real operation through VR headsets or 3D wall projection. Live telemetry and video are shown on the control console while learners drive like operating a real robot vehicle.',
          tag1: 'VR/AR',
          tag2: 'Virtual Scene'
        },
        {
          category: 'Road Safety Skills',
          title: 'A4 - Practical Driving and Road Safety Education',
          subtitle: 'Real-Scene Practice and Safety Awareness',
          description: 'Realistic elements such as traffic lights, junctions, and roundabouts are integrated into the route so learners practice by real traffic rules and improve sensitivity to signs and road instructions.',
          tag1: 'Real-Scene Driving',
          tag2: 'Remote Control'
        }
      ]
    }
    : {
      title: 'ERC STEM 課程',
      subtitle: '為小學生、初中生、家長和學校老師提供的智能實景駕駛學習體驗',
      modulesTitle: '四大課程模組',
      modulesSubtitle: '循序漸進的 STEM 學習路徑',
      courseCards: [
        {
          category: '汽車硬件拼裝學習',
          title: 'A1 - Lego ERC課程',
          subtitle: '硬件體驗學習',
          description: '讓學童可以從細分的硬件組合成一件可用及可行駛的汽車，從而啟發學生的動手製作能力及認識汽車結構。',
          tag1: 'Lego',
          tag2: '動手實驗'
        },
        {
          category: '編程應用',
          title: 'A2 - Microcontroller ERC課程',
          subtitle: '編程應用程式及使用學習',
          description: '在完成硬體汽車製作後，需為車輛編寫程式以實現所需的行進指令。同時，向學生講解從零開始編寫程式到車輛順利行駛的具體步驟，並介紹如何透過程式設計實現轉彎、前進、後退等功能的數據處理方式。',
          tag1: '編程',
          tag2: '微控制器'
        },
        {
          category: '實景模擬駕駛',
          title: 'A3 - Cospaces VR/AR',
          subtitle: '實景視像模擬鏡頭操作及運用',
          description: '要將駕駛的所有工序從虛擬場景轉化為實際操作，可以採用虛擬眼鏡或3D實景牆式投影螢幕進行顯示。車輛在實際場地行進時，相關數據和畫面可即時呈現在駕駛者的控制器台上，讓駕駛者透過類似遙控機器人的操作方式，直接操控車輛。',
          tag1: 'VR/AR',
          tag2: '虛擬場景'
        },
        {
          category: '道路安全技能',
          title: 'A4 - 實景操作及教育道路安全常識',
          subtitle: '實景操作及教育道路安全常識',
          description: '在車輛行進的路面設計中，可融入真實場景模擬，例如交通燈、路口、迴旋處等，讓學習者根據實際道路規定進行安全操作。這能有效提升學生對交通標誌和指示的敏感度，進一步增強道路安全意識。',
          tag1: '實景駕駛',
          tag2: '遙控操作'
        }
      ]
    }
))
</script>
