<template>
  <button
    type="button"
    class="poster-lightbox-trigger"
    v-bind="$attrs"
    :aria-label="zoomLabel"
    @click="openLightbox"
  >
    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      @error="$emit('error', $event)"
    >
    <span class="poster-zoom-hint" aria-hidden="true">
      <i class="fas fa-search-plus"></i>
    </span>
  </button>

  <Teleport to="body">
    <div
      v-if="lightboxOpen"
      class="poster-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="zoomLabel"
      @click.self="closeLightbox"
    >
      <button
        type="button"
        class="poster-lightbox-close"
        :aria-label="closeLabel"
        @click="closeLightbox"
      >
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
      <img
        :src="lightboxSrc"
        :alt="alt"
        class="poster-lightbox-img"
        @click.stop
      >
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

defineOptions({ inheritAttrs: false })

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  zoomLabel: { type: String, default: 'View poster full size' },
  closeLabel: { type: String, default: 'Close' }
})

defineEmits(['error'])

const lightboxOpen = ref(false)
const lightboxSrc = ref('')
const imgRef = ref(null)

function openLightbox() {
  lightboxSrc.value = imgRef.value?.currentSrc || imgRef.value?.src || ''
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape') closeLightbox()
}

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.poster-lightbox-trigger {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: left;
  line-height: 0;
  cursor: zoom-in;
}
.poster-lightbox-trigger img {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  display: block;
}
.poster-zoom-hint {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(8, 76, 97, 0.75);
  color: #fff;
  font-size: 0.85rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}
.poster-lightbox-trigger:hover .poster-zoom-hint {
  opacity: 1;
}
.poster-lightbox {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.88);
  cursor: zoom-out;
}
.poster-lightbox-img {
  max-width: min(92vw, 720px);
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  cursor: default;
}
.poster-lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.2s;
}
.poster-lightbox-close:hover {
  background: rgba(255, 255, 255, 0.28);
}
</style>
