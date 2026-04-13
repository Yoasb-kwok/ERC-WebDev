<template>
  <div class="app">
    <AppNav />
    <a href="https://wa.me/85296061079" class="whatsapp-float" target="_blank" rel="noopener">
      <i class="fab fa-whatsapp"></i>
    </a>
    <main class="page-section active">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer>
      <div class="logo" style="font-size: 1.2rem; margin-bottom: 20px;">ERC <span>Project</span></div>
      <p>{{ footerText.company }}</p>
      <p>{{ footerText.slogan }}</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppNav from '@/components/AppNav.vue'
import { language } from '@/i18n'

const footerText = computed(() => (
  language.value === 'en'
    ? {
      company: '© 2025 ERC Driving Experience Center · Tak On Driving School Co., Ltd.',
      slogan: 'Smart Driving Experience | STEM Education Innovation | Safe Driving Training'
    }
    : {
      company: '© 2025 ERC駕駛體驗館 · 德安駕駛學校有限公司',
      slogan: '智能駕駛體驗 | STEM 教育創新 | 安全駕駛培訓'
    }
))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
