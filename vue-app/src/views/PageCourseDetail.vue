<template>
  <section id="course-detail" class="course-detail-page">
    <div class="container">
      <router-link to="/courses" class="course-detail-back">
        <i class="fas fa-arrow-left"></i> {{ copy.back }}
      </router-link>

      <template v-if="course">
        <div class="course-detail-hero">
          <div class="course-detail-poster-wrap">
            <PosterLightboxTrigger
              :src="course.poster"
              :alt="getText(course.title)"
              :zoom-label="copy.zoomPoster"
              :close-label="copy.closeZoom"
              @error="onPosterError"
            />
          </div>

          <div class="course-detail-summary">
            <header class="course-detail-header">
              <p class="course-detail-category">{{ getText(course.category) }}</p>
              <h1>{{ getText(course.title) }}</h1>
              <p v-if="course.subtitle" class="course-detail-subtitle">{{ getText(course.subtitle) }}</p>
              <div v-if="course.tags?.length" class="tags">
                <span v-for="tag in course.tags" :key="JSON.stringify(tag)" class="tag">{{ getText(tag) }}</span>
              </div>
            </header>

            <div v-if="course.fee || course.enrollUrl" class="course-detail-fee-block">
              <template v-if="course.fee">
                <p class="course-detail-fee-label">{{ copy.feeLabel }}</p>
                <p class="course-detail-fee">{{ getText(course.fee) }}</p>
              </template>
              <a
                :href="enrollUrl"
                class="course-detail-enroll"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ copy.enroll }}
              </a>
            </div>
          </div>
        </div>

        <div class="course-detail-body">
          <section class="course-detail-intro">
            <h2><i class="fas fa-info-circle"></i> {{ copy.intro }}</h2>
            <p>{{ getText(course.intro) }}</p>
          </section>

          <section
            v-if="course.workshops?.length || course.info?.length"
            class="course-detail-info"
          >
            <h2><i class="fas fa-list-ul"></i> {{ copy.infoTitle }}</h2>

            <template v-if="course.workshops?.length">
              <dl v-if="course.infoLead?.length" class="course-info-list course-info-lead">
                <div v-for="(item, i) in course.infoLead" :key="'lead-' + i" class="course-info-row">
                  <dt>{{ getText(item.label) }}</dt>
                  <dd>{{ getText(item.value) }}</dd>
                </div>
              </dl>

              <div class="workshop-list">
                <article
                  v-for="(workshop, wi) in course.workshops"
                  :key="wi"
                  class="workshop-card"
                >
                  <h3 class="workshop-title">{{ getText(workshop.title) }}</h3>
                  <dl class="course-info-list workshop-details">
                    <div
                      v-for="(item, di) in workshop.details"
                      :key="di"
                      class="course-info-row"
                    >
                      <dt>{{ getText(item.label) }}</dt>
                      <dd>{{ getText(item.value) }}</dd>
                    </div>
                  </dl>
                </article>
              </div>

              <dl v-if="course.infoFooter?.length" class="course-info-list course-info-footer">
                <div v-for="(item, i) in course.infoFooter" :key="'foot-' + i" class="course-info-row">
                  <dt>{{ getText(item.label) }}</dt>
                  <dd>{{ getText(item.value) }}</dd>
                </div>
              </dl>
            </template>

            <dl v-else class="course-info-list">
              <div v-for="(item, i) in course.info" :key="i" class="course-info-row">
                <dt>{{ getText(item.label) }}</dt>
                <dd>{{ getText(item.value) }}</dd>
              </div>
            </dl>
          </section>
        </div>
      </template>

      <div v-else class="course-detail-not-found">
        <p>{{ copy.notFound }}</p>
        <router-link to="/courses">{{ copy.backList }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseById } from '@/data/courses'
import { language, getText } from '@/i18n'
import PosterLightboxTrigger from '@/components/PosterLightboxTrigger.vue'

const WHATSAPP_NUMBER = '85296061079'

const route = useRoute()
const course = computed(() => getCourseById(route.params.id))

const copy = computed(() => (
  language.value === 'en'
    ? {
      back: 'Back to courses',
      intro: 'Course Overview',
      infoTitle: 'Course Information',
      feeLabel: 'Course fee',
      enroll: 'Enroll',
      notFound: 'Course not found',
      backList: 'Back to courses list',
      zoomPoster: 'View poster full size',
      closeZoom: 'Close',
      waIntro: 'Hi ERC, I would like to enroll in the summer course:'
    }
    : {
      back: '返回課程',
      intro: '課程簡介',
      infoTitle: '課程資訊',
      feeLabel: '課程費用',
      enroll: '報名',
      notFound: '找不到該課程',
      backList: '返回課程列表',
      zoomPoster: '放大檢視海報',
      closeZoom: '關閉',
      waIntro: '你好 ERC，我想報名暑期課程：'
    }
))

const enrollUrl = computed(() => {
  if (!course.value) return '#'
  if (course.value.enrollUrl) return course.value.enrollUrl
  const title = getText(course.value.title)
  const fee = course.value.fee ? getText(course.value.fee) : ''
  const msg = fee
    ? `${copy.value.waIntro} ${title}（${fee}）`
    : `${copy.value.waIntro} ${title}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
})

function onPosterError(e) {
  const id = course.value?.id
  if (!id) return
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
.course-detail-page {
  padding: 2rem 0 4rem;
}
.course-detail-page .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}
.course-detail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.course-detail-back:hover {
  text-decoration: underline;
}
.course-detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
}
.course-detail-poster-wrap {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-light);
  border: 2px solid #084c61;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
}
.course-detail-poster-wrap:hover {
  box-shadow: 0 8px 20px rgba(8, 76, 97, 0.2);
  transform: translateY(-2px);
}
.course-detail-poster-wrap :deep(.poster-lightbox-trigger) {
  width: 100%;
}
.course-detail-poster-wrap :deep(img) {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.course-detail-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  height: 100%;
}
.course-detail-header {
  margin-bottom: 1.25rem;
}
.course-detail-category {
  color: #177e89;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.35rem;
}
.course-detail-header h1 {
  font-size: 1.65rem;
  margin-bottom: 0.4rem;
  color: #177e89;
  line-height: 1.3;
}
.course-detail-subtitle {
  color: #555;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 0.95rem;
}
.course-detail-header .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.course-detail-header :deep(.tag) {
  background: rgba(23, 126, 137, 0.12);
  color: #177e89;
}
.course-detail-fee-block {
  margin-top: 1rem;
}
.course-detail-fee-label {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--brand-accent);
}
.course-detail-fee {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--brand-accent);
  font-family: var(--font-display);
  line-height: 1.2;
}
.course-detail-enroll {
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
}
.course-detail-enroll:hover {
  background: #fff;
  color: var(--brand-accent);
}
.course-detail-body {
  border-top: 1px solid #e8e8e8;
  padding-top: 2rem;
}
.course-detail-intro,
.course-detail-info {
  margin-bottom: 1.5rem;
}
.course-detail-intro h2,
.course-detail-info h2 {
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
  color: #177e89;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.course-detail-intro p {
  line-height: 1.8;
  color: #444;
  margin: 0;
}
.course-info-list {
  margin: 0;
}
.course-info-row {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 0.5rem 1rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid #e8e8e8;
}
.course-info-row:last-child {
  border-bottom: none;
}
.course-info-row dt {
  font-weight: 700;
  color: #084c61;
  font-size: 0.9rem;
  margin: 0;
}
.course-info-row dd {
  margin: 0;
  color: #444;
  line-height: 1.6;
  font-size: 0.95rem;
}
.course-info-lead {
  margin-bottom: 1.25rem;
}
.workshop-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}
.workshop-card {
  background: var(--bg-light);
  border: 1px solid #e0e0e0;
  border-left: 4px solid #177e89;
  border-radius: 8px;
  padding: 1rem 1.15rem 0.35rem;
}
.workshop-title {
  margin: 0 0 0.65rem;
  font-size: 1.05rem;
  color: #084c61;
  line-height: 1.35;
}
.workshop-details .course-info-row {
  padding: 0.5rem 0;
}
.workshop-details .course-info-row dt {
  color: #177e89;
}
.course-info-footer {
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e8e8e8;
}
@media (max-width: 768px) {
  .course-detail-hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .course-info-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
.course-detail-not-found {
  text-align: center;
  padding: 3rem 0;
}
.course-detail-not-found a {
  color: var(--brand-primary);
}
</style>
