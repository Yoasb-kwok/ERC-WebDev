<template>
  <section id="exhibition-detail" class="exhibition-detail-page">
    <div class="container">
      <router-link to="/exhibitions" class="exhibition-detail-back">
        <i class="fas fa-arrow-left"></i> {{ copy.back }}
      </router-link>

      <template v-if="exhibition">
        <header class="exhibition-detail-header">
          <div class="exhibition-detail-meta">
            <p class="exhibition-detail-date">{{ getText(exhibition.date) }}</p>
            <h1>{{ getText(exhibition.title) }}</h1>
            <div class="tags">
              <span v-for="tag in exhibition.tags" :key="JSON.stringify(tag)" class="tag">{{ getText(tag) }}</span>
            </div>
          </div>
        </header>

        <section class="exhibition-detail-intro">
          <h2><i class="fas fa-info-circle"></i> {{ copy.intro }}</h2>
          <p>{{ getText(exhibition.introDetail || exhibition.intro) }}</p>
        </section>

        <section class="exhibition-detail-gallery">
          <h2><i class="fas fa-images"></i> {{ copy.photos }}</h2>
          <div class="exhibition-gallery-slider">
            <button
              v-if="exhibition.gallery.length > 1"
              type="button"
              class="exhibition-gallery-btn exhibition-gallery-prev"
              :aria-label="copy.prev"
              @click="galleryPrev"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="exhibition-gallery-main">
              <Transition :name="'slide-' + slideDirection">
                <div
                  :key="galleryIndex"
                  class="exhibition-gallery-slide"
                >
                  <img
                    :src="exhibition.gallery[galleryIndex].src"
                    :alt="exhibition.gallery[galleryIndex].alt"
                  >
                </div>
              </Transition>
            </div>
            <button
              v-if="exhibition.gallery.length > 1"
              type="button"
              class="exhibition-gallery-btn exhibition-gallery-next"
              :aria-label="copy.next"
              @click="galleryNext"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <p class="exhibition-gallery-counter">{{ galleryIndex + 1 }} / {{ exhibition.gallery.length }}</p>
        </section>
      </template>

      <div v-else class="exhibition-detail-not-found">
        <p>{{ copy.notFound }}</p>
        <router-link to="/exhibitions">{{ copy.backList }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getExhibitionById } from '@/data/exhibitions'
import { language, getText } from '@/i18n'

const route = useRoute()
const exhibition = computed(() => getExhibitionById(route.params.id))
const galleryIndex = ref(0)
const slideDirection = ref('left')
let autoPlayTimer = null
let resumeTimer = null
const AUTO_PLAY_INTERVAL = 4000
const copy = computed(() => (
  language.value === 'en'
    ? {
      back: 'Back to exhibitions',
      intro: 'Event Overview',
      photos: 'Photos',
      prev: 'Previous photo',
      next: 'Next photo',
      notFound: 'Event not found',
      backList: 'Back to exhibitions list'
    }
    : {
      back: '返回展覽活動',
      intro: '活動簡介',
      photos: '活動相片',
      prev: '上一張',
      next: '下一張',
      notFound: '找不到該活動',
      backList: '返回展覽活動列表'
    }
))

watch(exhibition, () => {
  galleryIndex.value = 0
  startAutoPlay()
}, { immediate: true })

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
  if (resumeTimer) {
    clearTimeout(resumeTimer)
    resumeTimer = null
  }
}

function startAutoPlay() {
  stopAutoPlay()
  const len = exhibition.value?.gallery?.length ?? 0
  if (len <= 1) return
  autoPlayTimer = setInterval(() => {
    slideDirection.value = 'left'
    galleryIndex.value = (galleryIndex.value + 1) % len
  }, AUTO_PLAY_INTERVAL)
}

function scheduleResumeAutoPlay() {
  stopAutoPlay()
  const len = exhibition.value?.gallery?.length ?? 0
  if (len <= 1) return
  resumeTimer = setTimeout(() => startAutoPlay(), AUTO_PLAY_INTERVAL)
}

onUnmounted(() => {
  stopAutoPlay()
})

function galleryPrev() {
  const len = exhibition.value?.gallery?.length ?? 0
  if (len === 0) return
  slideDirection.value = 'right'
  galleryIndex.value = (galleryIndex.value - 1 + len) % len
  scheduleResumeAutoPlay()
}
function galleryNext() {
  const len = exhibition.value?.gallery?.length ?? 0
  if (len === 0) return
  slideDirection.value = 'left'
  galleryIndex.value = (galleryIndex.value + 1) % len
  scheduleResumeAutoPlay()
}
</script>

<style scoped>
.exhibition-detail-page {
  padding: 2rem 0 4rem;
}
.exhibition-detail-page .container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}
.exhibition-detail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.exhibition-detail-back:hover {
  text-decoration: underline;
}
.exhibition-detail-header {
  margin-bottom: 2.5rem;
}
.exhibition-detail-meta .exhibition-detail-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}
.exhibition-detail-meta h1 {
  font-size: 1.75rem;
  margin: 0 0 0.75rem;
  line-height: 1.3;
}
.exhibition-detail-meta .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.exhibition-detail-intro,
.exhibition-detail-gallery {
  margin-bottom: 2.5rem;
}
.exhibition-detail-intro h2,
.exhibition-detail-gallery h2 {
  font-size: 1.25rem;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.exhibition-detail-intro h2 i,
.exhibition-detail-gallery h2 i {
  color: var(--brand-primary);
}
.exhibition-detail-intro p {
  line-height: 1.7;
  margin: 0;
  color: #333;
}
.exhibition-gallery-slider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.exhibition-gallery-main {
  flex: 1;
  min-width: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  aspect-ratio: 16/10;
  position: relative;
}
.exhibition-gallery-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.exhibition-gallery-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
/* 下一張：現有往左滑出，新圖從右滑入 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.35s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
/* 上一張：現有往右滑出，新圖從左滑入 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
.exhibition-gallery-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: var(--brand-primary);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: opacity 0.2s;
}
.exhibition-gallery-btn:hover {
  opacity: 0.9;
}
.exhibition-gallery-counter {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

/* 手機版：相片區全寬、按鈕疊在相片上，相片更大 */
@media (max-width: 768px) {
  .exhibition-detail-page .container {
    padding-left: 12px;
    padding-right: 12px;
  }
  .exhibition-detail-gallery {
    margin-left: -12px;
    margin-right: -12px;
  }
  .exhibition-gallery-slider {
    position: relative;
    gap: 0;
  }
  .exhibition-gallery-main {
    width: 100%;
    flex: 1 1 100%;
    aspect-ratio: 4/3;
  }
  .exhibition-gallery-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    font-size: 0.95rem;
    z-index: 2;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .exhibition-gallery-prev {
    left: 8px;
  }
  .exhibition-gallery-next {
    right: 8px;
  }
}

.exhibition-detail-not-found {
  text-align: center;
  padding: 3rem;
}
.exhibition-detail-not-found a {
  color: var(--brand-primary);
}
</style>
