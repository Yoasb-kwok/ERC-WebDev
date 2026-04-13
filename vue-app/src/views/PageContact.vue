<template>
  <section id="contact">
    <HeroSection :slides="['/images/contact.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <div class="grid-container" style="max-width: 900px; margin: 0 auto;">
        <div class="card">
          <h3><i class="fas fa-map-marker-alt"></i> {{ copy.school }}</h3>
          <p><strong>{{ copy.addressLabel }}</strong>{{ copy.schoolAddress1 }}</p>
          <p>{{ copy.schoolAddress2 }}<br><small>{{ copy.schoolAddress3 }}</small></p>
          <p style="margin-top:15px;"><strong>{{ copy.phoneLabel }}</strong> 2527 7799</p>
          <p><strong>WhatsApp：</strong> 9173 4677</p>
        </div>

        <div class="card">
          <h3><i class="fas fa-vr-cardboard"></i> {{ copy.center }}</h3>
          <p><strong>{{ copy.addressLabel }}</strong>{{ copy.centerAddress1 }}</p>
          <p>{{ copy.centerAddress2 }}</p>
          <p style="margin-top:15px; color: var(--electric-blue);">{{ copy.visit }}</p>
          <p style="margin-top:15px;"><strong>{{ copy.phoneLabel }}</strong> 9606 1079</p>
          <p><strong>WhatsApp：</strong> 9606 1079</p>
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
      title: 'Contact Us',
      subtitle: 'Visit us and experience the immersive smart-driving simulator.',
      school: 'Tak On Driving School',
      center: 'ERC Driving Experience Center',
      addressLabel: 'Address: ',
      phoneLabel: 'Phone: ',
      schoolAddress1: 'Admiralty, Hong Kong - 95 Queensway',
      schoolAddress2: 'Shop 2013, 2/F, United Centre',
      schoolAddress3: '(MTR Admiralty Station Exit D)',
      centerAddress1: 'Kowloon Bay, Kowloon - 21 Lam Hing Street',
      centerAddress2: 'Room 15, 17/F, Metro Centre II',
      visit: 'Visits by appointment welcome'
    }
    : {
      title: '聯絡我們',
      subtitle: '歡迎蒞臨體驗智能實景駕駛模擬系統',
      school: '德安駕駛學校',
      center: 'ERC駕駛體驗館',
      addressLabel: '地址：',
      phoneLabel: '電話：',
      schoolAddress1: '香港 - 金鐘金鐘道 95 號',
      schoolAddress2: '統一中心 2 樓 2013 號舖',
      schoolAddress3: '（港鐵金鐘站 D 出口）',
      centerAddress1: '九龍 - 九龍灣臨興街 21 號',
      centerAddress2: '美羅中心二期 17 樓 15 室',
      visit: '歡迎預約參觀'
    }
))
</script>
