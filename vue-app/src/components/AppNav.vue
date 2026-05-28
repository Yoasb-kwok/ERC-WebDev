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
      <!-- STEM 教育下拉：STEM 課程、STEM 產品 -->
      <div
        class="nav-dropdown"
        :class="{ open: stemDropdownOpen, 'is-active': isStemGroup }"
        @mouseenter="onStemDropdownEnter"
        @mouseleave="stemDropdownOpen = false"
      >
        <button
          type="button"
          class="nav-dropdown-trigger"
          aria-haspopup="true"
          :aria-expanded="stemDropdownOpen"
          @click="stemDropdownOpen = !stemDropdownOpen"
        >
          {{ navText.stemEducation }}
          <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="nav-dropdown-menu">
          <li>
            <router-link to="/courses" @click="closeMobile">
              <i class="fas fa-graduation-cap"></i>{{ navText.stemCourses }}
            </router-link>
          </li>
          <li>
            <router-link to="/stem-products" @click="closeMobile">
              <i class="fas fa-box-open"></i>{{ navText.stemProducts }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 駕駛體驗館下拉：考照挑戰、預約 -->
      <div
        class="nav-dropdown"
        :class="{ open: experienceDropdownOpen, 'is-active': isBookingGroup }"
        @mouseenter="onExperienceDropdownEnter"
        @mouseleave="experienceDropdownOpen = false"
      >
        <button
          type="button"
          class="nav-dropdown-trigger"
          aria-haspopup="true"
          :aria-expanded="experienceDropdownOpen"
          @click="experienceDropdownOpen = !experienceDropdownOpen"
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

      <!-- 關於我們下拉：關於 ERC、聯絡我們 -->
      <div
        class="nav-dropdown"
        :class="{ open: aboutDropdownOpen, 'is-active': isAboutGroup }"
        @mouseenter="onAboutDropdownEnter"
        @mouseleave="aboutDropdownOpen = false"
      >
        <button
          type="button"
          class="nav-dropdown-trigger"
          aria-haspopup="true"
          :aria-expanded="aboutDropdownOpen"
          @click="aboutDropdownOpen = !aboutDropdownOpen"
        >
          {{ navText.aboutUs }}
          <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="nav-dropdown-menu">
          <li>
            <router-link to="/about" @click="closeMobile">
              <i class="fas fa-building"></i>{{ navText.about }}
            </router-link>
          </li>
          <li>
            <router-link to="/contact" @click="closeMobile">
              <i class="fas fa-envelope"></i>{{ navText.contact }}
            </router-link>
          </li>
        </ul>
      </div>

      <router-link to="/download" class="nav-btn download-nav" active-class="active" data-page-id="download" @click="closeMobile">
        <span><i class="fas fa-download"></i> {{ navText.download }}</span>
      </router-link>

      <button
        type="button"
        class="language-switcher"
        :aria-label="language === 'zh' ? 'Switch to English' : '切換至中文'"
        :title="language === 'zh' ? 'English' : '中文'"
        @click="toggleLanguage"
      >
        <svg class="language-globe-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9.25" />
          <ellipse cx="12" cy="12" rx="4" ry="9.25" />
          <path d="M2.75 12h18.5M12 2.75c2.8 2.67 4.25 5.58 4.25 9.25S14.8 19.58 12 22.25M12 2.75C9.2 5.42 7.75 8.33 7.75 12s1.45 6.58 4.25 9.25" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { language, setLanguage } from '@/i18n'

const route = useRoute()
const mobileOpen = ref(false)
const stemDropdownOpen = ref(false)
const aboutDropdownOpen = ref(false)
const experienceDropdownOpen = ref(false)
function toggleLanguage() {
  setLanguage(language.value === 'zh' ? 'en' : 'zh')
}

const navText = computed(() => (
  language.value === 'en'
    ? {
      home: 'Home',
      exhibitions: 'Exhibitions',
      stemEducation: 'STEM Education',
      stemCourses: 'STEM Courses',
      stemProducts: 'STEM Products',
      aboutUs: 'About Us',
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
      stemEducation: 'STEM教育',
      stemCourses: 'STEM課程',
      stemProducts: 'STEM產品',
      aboutUs: '關於我們',
      about: '關於 ERC',
      experienceCenter: 'ERC駕駛體驗館',
      licenseChallenge: '考照挑戰',
      booking: '預約',
      contact: '聯絡我們',
      download: '軟體下載'
    }
))

const isStemGroup = computed(() =>
  route.path === '/stem-products' || route.path.startsWith('/stem-products/') || route.path.startsWith('/courses')
)

const isAboutGroup = computed(() =>
  ['/about', '/contact'].includes(route.path)
)

const isBookingGroup = computed(() =>
  ['/booking', '/license-challenge'].includes(route.path) || route.path.startsWith('/license-challenge/')
)

function closeMobile() {
  mobileOpen.value = false
  stemDropdownOpen.value = false
  aboutDropdownOpen.value = false
  experienceDropdownOpen.value = false
}

function onStemDropdownEnter() {
  if (window.innerWidth >= 901) stemDropdownOpen.value = true
}

function onAboutDropdownEnter() {
  if (window.innerWidth >= 901) aboutDropdownOpen.value = true
}

function onExperienceDropdownEnter() {
  if (window.innerWidth >= 901) experienceDropdownOpen.value = true
}

watch(() => route.path, () => {
  mobileOpen.value = false
  stemDropdownOpen.value = false
  aboutDropdownOpen.value = false
  experienceDropdownOpen.value = false
})
</script>
