<template>
  <nav>
    <router-link to="/home" class="logo-link">
      <img src="/images/logo.png" alt="ERC Logo" class="logo-img">
    </router-link>
    <button
      type="button"
      class="menu-toggle"
      aria-label="Toggle navigation"
      @click="mobileOpen = !mobileOpen"
    >
      <i class="fas" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <div class="nav-links" :class="{ open: mobileOpen }">
      <router-link to="/home" class="nav-btn" active-class="active" data-page-id="home" @click="closeMobile">{{ navText.home }}</router-link>
      <router-link to="/exhibitions" class="nav-btn" active-class="active" data-page-id="exhibitions" @click="closeMobile">{{ navText.exhibitions }}</router-link>
      <router-link to="/courses" class="nav-btn" active-class="active" data-page-id="courses" @click="closeMobile">{{ navText.courses }}</router-link>
      <router-link to="/about" class="nav-btn" active-class="active" data-page-id="about" @click="closeMobile">{{ navText.about }}</router-link>

      <!-- 駕駛體驗館下拉：考照挑戰、預約 -->
      <div
        class="nav-dropdown"
        :class="{ open: dropdownOpen, 'is-active': isBookingGroup }"
        @mouseenter="onDropdownEnter"
        @mouseleave="onDropdownLeave"
      >
        <button
          type="button"
          class="nav-dropdown-trigger"
          aria-haspopup="true"
          :aria-expanded="dropdownOpen"
          @click="dropdownOpen = !dropdownOpen"
        >
          {{ navText.experienceCenter }}
          <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="nav-dropdown-menu">
          <li>
            <router-link to="/license-challenge" @click="closeMobile">
              <i class="fas fa-flag-checkered"></i>{{ navText.licenseChallenge }}
            </router-link>
          </li>
          <li>
            <router-link to="/booking" @click="closeMobile">
              <i class="fas fa-calendar-check"></i>{{ navText.booking }}
            </router-link>
          </li>
        </ul>
      </div>

      <router-link to="/contact" class="nav-btn" active-class="active" data-page-id="contact" @click="closeMobile">{{ navText.contact }}</router-link>
      <router-link to="/download" class="nav-btn download-nav" active-class="active" data-page-id="download" @click="closeMobile">
        <span><i class="fas fa-download"></i> {{ navText.download }}</span>
      </router-link>

      <div class="language-switcher">
        <i class="fas fa-globe"></i>
        <select v-model="selectedLanguage" aria-label="Language selector">
          <option value="zh">中文</option>
          <option value="en">ENG</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { language, setLanguage } from '@/i18n'

const route = useRoute()
const mobileOpen = ref(false)
const dropdownOpen = ref(false)
const selectedLanguage = computed({
  get: () => language.value,
  set: (value) => setLanguage(value)
})

const navText = computed(() => (
  language.value === 'en'
    ? {
      home: 'Home',
      exhibitions: 'Exhibitions',
      courses: 'Courses',
      about: 'About ERC',
      experienceCenter: 'ERC Driving Experience Center',
      licenseChallenge: 'License Challenge',
      booking: 'Booking',
      contact: 'Contact',
      download: 'Software Download'
    }
    : {
      home: '首頁',
      exhibitions: '展覽活動',
      courses: '課程',
      about: '關於 ERC',
      experienceCenter: 'ERC駕駛體驗館',
      licenseChallenge: '考照挑戰',
      booking: '預約',
      contact: '聯絡我們',
      download: '軟體下載'
    }
))

const isBookingGroup = computed(() =>
  ['/booking', '/license-challenge'].includes(route.path)
)

function closeMobile() {
  mobileOpen.value = false
  dropdownOpen.value = false
}

function onDropdownEnter() {
  if (window.innerWidth >= 901) dropdownOpen.value = true
}

function onDropdownLeave() {
  dropdownOpen.value = false
}

watch(() => route.path, () => {
  mobileOpen.value = false
  dropdownOpen.value = false
})
</script>
