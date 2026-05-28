<template>
  <section id="courses">
    <HeroSection :slides="['/images/course.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <section
        v-for="section in courseSections"
        :key="section.id"
        class="course-section"
      >
        <div class="section-header">
          <h2>{{ getText(section.title) }}</h2>
        </div>

        <div class="course-grid">
          <article
            v-for="course in section.courses"
            :key="course.id"
            class="course-item"
          >
            <PosterLightboxTrigger
              class="course-poster"
              :src="course.poster"
              :alt="getText(course.title)"
              :zoom-label="copy.zoomPoster"
              :close-label="copy.closeZoom"
              @error="(e) => onPosterError(e, course.id)"
            />
            <div class="course-info">
              <span class="course-category">{{ getText(course.category) }}</span>
              <h3>{{ getText(course.title) }}</h3>
              <div class="course-tags">
                <span v-for="tag in course.tags" :key="JSON.stringify(tag)" class="tag">{{ getText(tag) }}</span>
              </div>
              <div class="course-actions">
                <router-link :to="'/courses/' + course.id" class="course-btn course-btn-primary">
                  <span>{{ copy.learnMore }}</span>
                </router-link>
                <a
                  :href="getEnrollUrl(course)"
                  class="course-btn course-btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ copy.enroll }}</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import PosterLightboxTrigger from '@/components/PosterLightboxTrigger.vue'
import { getCourseSections } from '@/data/courses'
import { language, getText } from '@/i18n'

const courseSections = getCourseSections()
const WHATSAPP_NUMBER = '85296061079'

const copy = computed(() => (
  language.value === 'en'
    ? {
      title: 'ERC STEM Courses',
      subtitle: 'Immersive smart-driving learning for primary/secondary students, parents, and teachers.',
      learnMore: 'Learn More',
      enroll: 'Enroll',
      zoomPoster: 'View poster full size',
      closeZoom: 'Close'
    }
    : {
      title: 'ERC STEM 課程',
      subtitle: '為小學生、初中生、家長和學校老師提供的智能實景駕駛學習體驗',
      learnMore: '了解更多',
      enroll: '報名',
      zoomPoster: '放大檢視海報',
      closeZoom: '關閉'
    }
))

function getEnrollUrl(course) {
  if (course.enrollUrl) return course.enrollUrl
  const title = getText(course.title)
  const msg = language.value === 'en'
    ? `Hi ERC, I would like to enroll in the summer course: ${title}`
    : `你好 ERC，我想報名暑期課程：${title}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

function onPosterError(e, id) {
  const img = e.target
  const base = `/images/courses/${id}-poster`
  const stage = img.dataset.fallbackStage || '0'
  if (stage === '0') {
    img.dataset.fallbackStage = '1'
    img.src = `${base}.jpeg`
    return
  }
  if (stage === '1') {
    img.dataset.fallbackStage = '2'
    img.src = `${base}.svg`
  }
}
</script>

<style scoped>
.course-section {
  margin-bottom: 3rem;
}
.course-section:last-child {
  margin-bottom: 0;
}
.course-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
  max-width: 720px;
  margin: 0 auto;
}
.course-item {
  display: flex;
  flex-direction: column;
  background: var(--bg-light);
  border: 2px solid #084c61;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.course-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
.course-poster {
  width: 100%;
  padding: 0.75rem 0.75rem 0;
  box-sizing: border-box;
}
.course-poster :deep(img) {
  border-radius: 6px;
}
.course-info {
  width: 100%;
  padding: 1rem 1.1rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.course-category {
  display: block;
  font-size: 0.85rem;
  font-weight: bold;
  color: #177e89;
  margin-bottom: 0.35rem;
}
.course-info h3 {
  color: #177e89;
  font-size: 1rem;
  margin: 0 0 0.75rem;
  line-height: 1.35;
}
.course-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.course-item :deep(.tag) {
  background: rgba(23, 126, 137, 0.12);
  color: #177e89;
}
.course-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}
.course-btn {
  display: inline-block;
  width: auto;
  min-width: 7.5rem;
  max-width: 85%;
  padding: 0.55rem 1.25rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  border: 2px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  box-sizing: border-box;
}
.course-btn-primary {
  background: #177e89;
  color: #fff;
  border-color: #177e89;
}
.course-btn-primary:hover {
  background: #fff;
  color: #177e89;
}
.course-btn-secondary {
  background: var(--brand-accent);
  color: #fff;
  border-color: var(--brand-accent);
}
.course-btn-secondary:hover {
  background: #fff;
  color: var(--brand-accent);
}
@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
    max-width: 21.6rem;
  }
}
</style>
