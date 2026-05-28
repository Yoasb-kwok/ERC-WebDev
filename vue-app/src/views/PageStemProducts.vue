<template>
  <section id="stem-products">
    <HeroSection :slides="['/images/course.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <div class="section-header">
        <h2>{{ copy.productsTitle }}</h2>
        <p>{{ copy.productsSubtitle }}</p>
      </div>

      <div class="stem-product-grid">
        <article
          v-for="product in stemProducts"
          :key="product.id"
          class="stem-product-card"
        >
          <router-link :to="'/stem-products/' + product.id" class="stem-product-image-link">
            <div class="stem-product-image">
              <img
                class="stem-product-img stem-product-img--primary"
                :src="product.images[0]"
                :alt="getText(product.name)"
                @error="(e) => onImageError(e, product.id, 1)"
              >
              <img
                class="stem-product-img stem-product-img--hover"
                :src="product.images[1]"
                :alt="getText(product.name)"
                aria-hidden="true"
                @error="(e) => onImageError(e, product.id, 2)"
              >
            </div>
          </router-link>
          <router-link :to="'/stem-products/' + product.id" class="stem-product-name-link">
            <h3 class="stem-product-name">{{ getText(product.name) }}</h3>
          </router-link>
          <p class="stem-product-price">HK$ {{ formatPrice(product.price) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { stemProducts } from '@/data/stemProducts'
import { language, getText } from '@/i18n'

const copy = computed(() => (
  language.value === 'en'
    ? {
      title: 'STEM Products',
      subtitle: 'Professional ERC driving and STEM learning equipment.',
      productsTitle: 'Product Catalog',
      productsSubtitle: 'Prices in Hong Kong dollars (HK$)'
    }
    : {
      title: 'STEM 產品',
      subtitle: 'ERC 智能駕駛及 STEM 學習相關設備',
      productsTitle: '產品目錄',
      productsSubtitle: '價格以港幣（HK$）顯示'
    }
))

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
.stem-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
}
.stem-product-card {
  text-align: center;
}
.stem-product-image-link,
.stem-product-name-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.stem-product-image-link {
  cursor: pointer;
}
.stem-product-name-link:hover .stem-product-name {
  color: #177e89;
}
.stem-product-image {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stem-product-card:hover .stem-product-image {
  border-color: #084c61;
}
.stem-product-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  transition: opacity 0.35s ease;
}
.stem-product-img--hover {
  opacity: 0;
}
.stem-product-card:hover .stem-product-img--primary {
  opacity: 0;
}
.stem-product-card:hover .stem-product-img--hover {
  opacity: 1;
}
.stem-product-name {
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-main);
  margin: 0.85rem 0.5rem 0.5rem;
  font-weight: 600;
  transition: color 0.2s;
}
.stem-product-price {
  margin: 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-dark);
  font-family: var(--font-display);
}
@media (max-width: 1024px) {
  .stem-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .stem-product-grid {
    grid-template-columns: 1fr;
    max-width: 320px;
  }
}
</style>
