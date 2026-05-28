<template>
  <section id="stem-product-detail" class="stem-product-detail-page">
    <div class="container">
      <router-link to="/stem-products" class="stem-product-detail-back">
        <i class="fas fa-arrow-left"></i> {{ copy.back }}
      </router-link>

      <template v-if="product">
        <div class="stem-product-detail-hero">
          <div class="stem-product-detail-gallery">
            <div class="stem-product-gallery-main">
              <Transition name="stem-gallery-fade" mode="out-in">
                <div :key="activeIndex" class="stem-product-gallery-slide">
                  <PosterLightboxTrigger
                    class="stem-product-detail-image"
                    :src="product.images[activeIndex]"
                    :alt="getText(product.name)"
                    :zoom-label="copy.zoomImage"
                    :close-label="copy.closeZoom"
                    @error="(e) => onImageError(e, product.id, activeIndex + 1)"
                  />
                </div>
              </Transition>
            </div>
            <div
              v-if="product.images.length > 1"
              class="stem-product-gallery-thumbs"
              @mouseleave="onThumbsLeave"
            >
              <button
                v-for="(src, i) in product.images"
                :key="i"
                type="button"
                class="stem-product-gallery-thumb"
                :class="{ 'is-active': i === activeIndex }"
                :aria-label="copy.thumbLabel(i + 1)"
                :aria-current="i === activeIndex ? 'true' : undefined"
                @mouseenter="onThumbEnter(i)"
                @focus="onThumbEnter(i)"
              >
                <img
                  :src="src"
                  :alt="getText(product.name)"
                  @error="(e) => onImageError(e, product.id, i + 1)"
                >
              </button>
            </div>
          </div>

          <div class="stem-product-detail-summary">
            <h1>{{ getText(product.name) }}</h1>
            <p class="stem-product-detail-price-label">{{ copy.priceLabel }}</p>
            <p class="stem-product-detail-price">HK$ {{ formatPrice(product.price) }}</p>
            <a
              :href="inquiryWhatsappUrl"
              class="stem-product-detail-inquiry"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ copy.inquire }}
            </a>
          </div>
        </div>

        <div class="stem-product-detail-body">
          <section class="stem-product-detail-intro">
            <h2><i class="fas fa-info-circle"></i> {{ copy.introTitle }}</h2>
            <p>{{ getText(product.intro) }}</p>
          </section>

          <section v-if="product.highlights?.length" class="stem-product-detail-highlights">
            <h2><i class="fas fa-check-circle"></i> {{ copy.highlightsTitle }}</h2>
            <ul>
              <li v-for="(item, idx) in product.highlights" :key="idx">{{ getText(item) }}</li>
            </ul>
          </section>
        </div>
      </template>

      <div v-else class="stem-product-detail-not-found">
        <p>{{ copy.notFound }}</p>
        <router-link to="/stem-products">{{ copy.backList }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '@/data/stemProducts'
import { language, getText } from '@/i18n'
import PosterLightboxTrigger from '@/components/PosterLightboxTrigger.vue'

const WHATSAPP_NUMBER = '85296061079'
const AUTO_PLAY_INTERVAL = 4000

const route = useRoute()
const product = computed(() => getProductById(route.params.id))
const activeIndex = ref(0)
let autoPlayTimer = null
let resumeTimer = null
let thumbHovering = false

const copy = computed(() => (
  language.value === 'en'
    ? {
      back: 'Back to products',
      introTitle: 'Product Overview',
      highlightsTitle: 'Highlights',
      priceLabel: 'Price',
      inquire: 'Enquire & Purchase',
      notFound: 'Product not found',
      backList: 'Back to product catalog',
      zoomImage: 'View image full size',
      closeZoom: 'Close',
      waIntro: 'Hi ERC, I would like to enquire about purchasing:',
      thumbLabel: (n) => `View image ${n}`
    }
    : {
      back: '返回產品目錄',
      introTitle: '產品簡介',
      highlightsTitle: '產品特點',
      priceLabel: '售價',
      inquire: '查詢購買',
      notFound: '找不到該產品',
      backList: '返回產品目錄',
      zoomImage: '放大檢視圖片',
      closeZoom: '關閉',
      waIntro: '你好 ERC，我想查詢及購買產品：',
      thumbLabel: (n) => `檢視第 ${n} 張圖片`
    }
))

watch(product, () => {
  activeIndex.value = 0
  startAutoPlay()
}, { immediate: true })

const inquiryWhatsappUrl = computed(() => {
  if (!product.value) return '#'
  const name = getText(product.value.name)
  const price = `HK$${formatPrice(product.value.price)}`
  const msg = `${copy.value.waIntro} ${name}（${price}）`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
})

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
  const len = product.value?.images?.length ?? 0
  if (len <= 1 || thumbHovering) return
  autoPlayTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % len
  }, AUTO_PLAY_INTERVAL)
}

function scheduleResumeAutoPlay() {
  stopAutoPlay()
  const len = product.value?.images?.length ?? 0
  if (len <= 1 || thumbHovering) return
  resumeTimer = setTimeout(() => startAutoPlay(), AUTO_PLAY_INTERVAL)
}

function onThumbEnter(index) {
  thumbHovering = true
  stopAutoPlay()
  activeIndex.value = index
}

function onThumbsLeave() {
  thumbHovering = false
  scheduleResumeAutoPlay()
}

onUnmounted(() => {
  stopAutoPlay()
})

function formatPrice(value) {
  return value.toLocaleString('en-HK')
}

function onImageError(e, id, index) {
  const img = e.target
  const base = `/images/stem-products/${id}-${index}`
  const stage = img.dataset.fallbackStage || '0'
  if (stage === '0') {
    img.dataset.fallbackStage = '1'
    img.src = `/images/stem-products/${id}.webp`
    return
  }
  if (stage === '1') {
    img.dataset.fallbackStage = '2'
    img.src = `${base}.jpeg`
    return
  }
  if (stage === '2') {
    img.dataset.fallbackStage = '3'
    img.src = `${base}.svg`
  }
}
</script>

<style scoped>
.stem-product-detail-page {
  padding: 2rem 0 4rem;
}
.stem-product-detail-page .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}
.stem-product-detail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.stem-product-detail-back:hover {
  text-decoration: underline;
}
.stem-product-detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
}
.stem-product-detail-gallery {
  min-width: 0;
}
.stem-product-gallery-main {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  border: 2px solid #084c61;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.stem-product-gallery-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stem-product-detail-image {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
}
.stem-product-detail-image :deep(.poster-lightbox-trigger) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stem-product-detail-image :deep(img) {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
}
.stem-gallery-fade-enter-active,
.stem-gallery-fade-leave-active {
  transition: opacity 0.35s ease;
}
.stem-gallery-fade-enter-from,
.stem-gallery-fade-leave-to {
  opacity: 0;
}
.stem-product-gallery-thumbs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.stem-product-gallery-thumb {
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  padding: 0;
  border: 2px solid #d0d0d0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.stem-product-gallery-thumb:hover,
.stem-product-gallery-thumb.is-active {
  border-color: #084c61;
  box-shadow: 0 2px 8px rgba(8, 76, 97, 0.2);
}
.stem-product-gallery-thumb.is-active {
  border-color: #177e89;
}
.stem-product-gallery-thumb img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.stem-product-gallery-thumb:hover img,
.stem-product-gallery-thumb.is-active img {
  opacity: 1;
}
.stem-product-detail-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.stem-product-detail-summary h1 {
  font-size: 1.5rem;
  color: #177e89;
  line-height: 1.35;
  margin: 0 0 1rem;
}
.stem-product-detail-price-label {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--brand-accent);
}
.stem-product-detail-price {
  margin: 0 0 1.25rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--brand-accent);
  font-family: var(--font-display);
  line-height: 1.2;
}
.stem-product-detail-inquiry {
  display: inline-block;
  padding: 0.65rem 1.75rem;
  background: var(--brand-accent);
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 6px;
  border: 2px solid var(--brand-accent);
  transition: background 0.2s, color 0.2s;
  align-self: flex-start;
}
.stem-product-detail-inquiry:hover {
  background: #fff;
  color: var(--brand-accent);
}
.stem-product-detail-body {
  border-top: 1px solid #e8e8e8;
  padding-top: 2rem;
}
.stem-product-detail-intro,
.stem-product-detail-highlights {
  margin-bottom: 1.5rem;
}
.stem-product-detail-intro h2,
.stem-product-detail-highlights h2 {
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
  color: #177e89;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.stem-product-detail-intro p {
  line-height: 1.8;
  color: #444;
  margin: 0;
}
.stem-product-detail-highlights ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #444;
  line-height: 1.8;
}
.stem-product-detail-not-found {
  text-align: center;
  padding: 3rem 0;
}
.stem-product-detail-not-found a {
  color: var(--brand-primary);
}
@media (max-width: 768px) {
  .stem-product-detail-hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .stem-product-gallery-thumb {
    width: 64px;
    height: 64px;
  }
}
</style>
