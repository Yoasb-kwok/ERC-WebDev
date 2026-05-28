<template>
  <section id="booking">
    <HeroSection :slides="['/images/logo.webp']" hero-height="40vh">
      <h1>{{ copy.heroTitle }}</h1>
      <p>{{ copy.heroSubtitle }}</p>
    </HeroSection>

    <div class="container pricing-section">
      <h2 class="pricing-section-title">{{ copy.pricingTitle }}</h2>
      <div class="pricing-container">
        <div class="pricing-card" v-for="plan in planCards" :key="plan.key" :class="{ 'pricing-card-popular': plan.popular }">
          <div v-if="plan.popular" class="pricing-ribbon">{{ copy.popular }}</div>
          <h3>{{ plan.title }}</h3>
          <div class="price-tag">
            <span class="price"><span class="currency">$</span>{{ plan.price }}</span>
            <span class="duration">/ {{ plan.duration }}</span>
          </div>
          <ul class="pricing-features">
            <li v-for="feature in plan.features" :key="feature.icon + feature.text"><i class="fas" :class="feature.icon"></i>{{ feature.text }}</li>
          </ul>
          <button type="button" class="pricing-select-btn" @click="selectPlanAndScroll(plan.key)">{{ copy.selectPlan }}</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="booking-container" ref="bookingFormRef">
        <h2 style="color: var(--text-main); margin-bottom: 20px;">{{ copy.bookingTitle }}</h2>

        <div class="form-group" style="text-align: left; max-width: 400px; margin: 0 auto 20px;">
          <label for="booking-plan">{{ copy.planLabel }}</label>
          <select id="booking-plan" v-model="selectedPlan" class="booking-plan-select">
            <option value="">{{ copy.planPlaceholder }}</option>
            <option v-for="plan in planCards" :key="plan.key" :value="plan.key">{{ plan.selectLabel }}</option>
          </select>
        </div>

        <label for="booking-date">{{ copy.dateLabel }}</label>
        <input
          id="booking-date"
          v-model="selectedDate"
          type="date"
          :min="minDate"
          @change="onDateChange"
        >

        <h3 style="color: var(--electric-blue); margin-top: 30px; margin-bottom: 15px;">{{ copy.slotTitle }}</h3>
        <div class="time-slots-grid">
          <template v-if="loadingSlots">{{ copy.loadingSlots }}</template>
          <template v-else-if="fridayError">
            <p style="grid-column: 1/-1; text-align:center; color: red;">{{ copy.fridayError }}</p>
          </template>
          <template v-else>
            <button
              v-for="slot in timeSlots"
              :key="slot.time"
              type="button"
              class="time-slot-btn"
              :class="{ active: selectedTime === slot.time }"
              :disabled="slot.booked"
              :title="slot.booked ? copy.booked : ''"
              :style="slot.booked ? { backgroundColor: '#ccc', color: '#666', cursor: 'not-allowed' } : {}"
              @click="selectTime(slot.time)"
            >
              {{ slot.time }}
            </button>
          </template>
        </div>

        <form class="booking-form" @submit.prevent="submitBooking">
          <h3 style="color: var(--text-main); margin-bottom: 20px;">{{ copy.contactTitle }}</h3>
          <div class="form-group">
            <label for="booking-name">{{ copy.nameLabel }}</label>
            <input id="booking-name" v-model="form.name" type="text" :placeholder="copy.namePlaceholder" required>
          </div>
          <div class="form-group">
            <label for="booking-phone">{{ copy.phoneLabel }}</label>
            <input id="booking-phone" v-model="form.phone" type="tel" :placeholder="copy.phonePlaceholder" required>
          </div>
          <div class="form-group">
            <label for="booking-email">{{ copy.emailLabel }}</label>
            <input id="booking-email" v-model="form.email" type="email" :placeholder="copy.emailPlaceholder" required>
          </div>
          <button type="submit" class="cta-button cta-button--accent" :disabled="submitting">
            <span>{{ submitting ? copy.submitting : copy.submitBtn }}</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import HeroSection from '@/components/HeroSection.vue'
import { language } from '@/i18n'

function getNextFriday(date) {
  const d = new Date(date)
  const day = d.getDay()
  let add = 0
  if (day === 5) add = 0
  else if (day < 5) add = 5 - day
  else add = 5 - day + 7
  d.setDate(d.getDate() + add)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dayNum = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dayNum}`
}

const today = new Date()
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
const minDate = ref(todayStr)
const defaultDate = getNextFriday(today)

const selectedDate = ref(defaultDate)
const selectedTime = ref('')
const selectedPlan = ref('')
const timeSlots = ref([])
const loadingSlots = ref(false)
const fridayError = ref(false)
const submitting = ref(false)

const form = ref({
  name: '',
  phone: '',
  email: ''
})

const bookingFormRef = ref(null)

const copy = computed(() => (
  language.value === 'en'
    ? {
      heroTitle: 'Book Your Experience',
      heroSubtitle: 'Choose your preferred date and time to experience ERC smart driving.',
      pricingTitle: 'Pricing Plans',
      popular: 'Most Popular',
      selectPlan: 'Choose This Plan',
      bookingTitle: 'Book ERC Driving Experience Center',
      planLabel: 'Choose Plan:',
      planPlaceholder: 'Please select a pricing plan',
      dateLabel: 'Select Date:',
      slotTitle: 'Available Time Slots (10:00 AM - 5:00 PM)',
      loadingSlots: 'Checking booking status...',
      fridayError: 'Bookings are open on Fridays only. Please select a Friday.',
      booked: 'Booked',
      contactTitle: 'Your Contact Information',
      nameLabel: 'Name:',
      namePlaceholder: 'Enter your name',
      phoneLabel: 'Phone:',
      phonePlaceholder: 'Enter your phone number',
      emailLabel: 'Email:',
      emailPlaceholder: 'Enter your email address',
      submitting: 'Processing...',
      submitBtn: 'Confirm Booking',
      fillAllAlert: 'Please complete all booking information and select a time.',
      choosePlanAlert: 'Please select a pricing plan.',
      saveSuccessAlert: 'Booking saved. We will redirect to WhatsApp so you can send your booking details.',
      redirectAlert: 'We will redirect to WhatsApp so you can send your booking details.',
      failedAlert: 'Booking failed. Please check your network connection.',
      waIntro: 'Hi ERC, I would like to make a booking.',
      waPlan: 'Plan',
      waName: 'Name',
      waPhone: 'Phone',
      waEmail: 'Email',
      waDate: 'Date',
      waTime: 'Time'
    }
    : {
      heroTitle: '預約體驗',
      heroSubtitle: '選擇您方便的日期和時間，親身體驗 ERC 智能駕駛！',
      pricingTitle: '收費方案',
      popular: '熱門推薦',
      selectPlan: '選擇此方案',
      bookingTitle: '預約 ERC駕駛體驗館時間',
      planLabel: '選擇方案：',
      planPlaceholder: '請選擇收費方案',
      dateLabel: '選擇日期：',
      slotTitle: '可預約時段 (上午10:00 - 下午5:00)',
      loadingSlots: '正在檢查預約狀況...',
      fridayError: '預約只在星期五開放。請選擇一個星期五。',
      booked: '已預約',
      contactTitle: '您的聯絡資料',
      nameLabel: '姓名：',
      namePlaceholder: '請輸入您的姓名',
      phoneLabel: '電話：',
      phonePlaceholder: '請輸入您的電話號碼',
      emailLabel: '電郵：',
      emailPlaceholder: '請輸入您的電郵地址',
      submitting: '處理中...',
      submitBtn: '確認預約',
      fillAllAlert: '請填寫所有預約資訊並選擇時間！',
      choosePlanAlert: '請選擇收費方案。',
      saveSuccessAlert: '資料已儲存！我們將轉至 WhatsApp 以便您發送預約詳情。',
      redirectAlert: '我們將轉至 WhatsApp 以便您發送預約詳情。',
      failedAlert: '預約失敗，請檢查網絡連接。',
      waIntro: '你好 ERC，我想預約體驗。',
      waPlan: '方案',
      waName: '姓名',
      waPhone: '電話',
      waEmail: '電郵',
      waDate: '日期',
      waTime: '時間'
    }
))

const planCards = computed(() => (
  language.value === 'en'
    ? [
      {
        key: 'solo',
        title: 'Solo Extreme Experience',
        price: '198',
        duration: '1 session (45 minutes)',
        selectLabel: 'Solo Extreme Experience - $198 / 45 minutes',
        popular: false,
        features: [
          { icon: 'fa-user', text: 'Up to 2 participants' },
          { icon: 'fa-car', text: '1 race car (G29 + VR)' },
          { icon: 'fa-chalkboard-teacher', text: 'Includes operation briefing' },
          { icon: 'fa-medal', text: 'License challenge mission' }
        ]
      },
      {
        key: 'party',
        title: 'Private Battle Party',
        price: '498',
        duration: '1 session (45 minutes)',
        selectLabel: 'Private Battle Party - $498 / 45 minutes (up to 4 participants)',
        popular: true,
        features: [
          { icon: 'fa-users', text: 'Up to 4 participants' },
          { icon: 'fa-car-side', text: '2 race cars (G29 + VR)' },
          { icon: 'fa-flag-checkered', text: 'Friends/family racing battle' },
          { icon: 'fa-unlock', text: 'Exclusive full venue access' }
        ]
      }
    ]
    : [
      {
        key: 'solo',
        title: '單人極限體驗',
        price: '198',
        duration: '1 節 (45分鐘)',
        selectLabel: '單人極限體驗 — $198 / 45分鐘',
        popular: false,
        features: [
          { icon: 'fa-user', text: '最多 2 人入場' },
          { icon: 'fa-car', text: '1 台賽車 (G29 + VR)' },
          { icon: 'fa-chalkboard-teacher', text: '包含操作教學' },
          { icon: 'fa-medal', text: '挑戰考照任務' }
        ]
      },
      {
        key: 'party',
        title: '包場對戰派對',
        price: '498',
        duration: '1 節 (45分鐘)',
        selectLabel: '包場對戰派對 — $498 / 45分鐘 (最多 4 人)',
        popular: true,
        features: [
          { icon: 'fa-users', text: '最多 4 人入場' },
          { icon: 'fa-car-side', text: '2 台賽車 (G29 + VR)' },
          { icon: 'fa-flag-checkered', text: '朋友/親子對戰' },
          { icon: 'fa-unlock', text: '全場地獨享不被打擾' }
        ]
      }
    ]
))

const planOptions = computed(() => Object.fromEntries(planCards.value.map(plan => ([
  plan.key,
  { label: plan.title, price: `$${plan.price}`, duration: plan.duration }
]))))

function selectPlanAndScroll(plan) {
  selectedPlan.value = plan
  bookingFormRef.value?.scrollIntoView?.({ behavior: 'smooth' })
}

function buildSlots() {
  const slots = []
  for (let m = 10 * 60; m <= 17 * 60; m += 30) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push({ time: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`, booked: false })
  }
  return slots
}

async function fetchBookedTimes(date) {
  if (!db) {
    console.warn('Firebase is not configured. All time slots will be available.')
    return new Set()
  }
  try {
    const q = query(collection(db, 'bookings'), where('date', '==', date))
    const snap = await getDocs(q)
    const set = new Set()
    snap.forEach((doc) => set.add(doc.data().time))
    return set
  } catch (error) {
    console.error('Failed to fetch booked times:', error)
    return new Set()
  }
}

async function loadSlots() {
  const date = selectedDate.value
  if (!date) return
  const d = new Date(date + 'T00:00:00')
  if (d.getDay() !== 5) {
    fridayError.value = true
    timeSlots.value = []
    selectedTime.value = ''
    return
  }
  fridayError.value = false
  loadingSlots.value = true
  try {
    const booked = await fetchBookedTimes(date)
    timeSlots.value = buildSlots().map((s) => ({ ...s, booked: booked.has(s.time) }))
  } catch (error) {
    console.error('Failed to load slots:', error)
    timeSlots.value = buildSlots()
  } finally {
    loadingSlots.value = false
    selectedTime.value = ''
  }
}

function onDateChange() {
  selectedTime.value = ''
  loadSlots()
}

function selectTime(time) {
  selectedTime.value = time
}

async function submitBooking() {
  if (!selectedDate.value || !selectedTime.value || !form.value.name || !form.value.phone || !form.value.email) {
    alert(copy.value.fillAllAlert)
    return
  }
  if (!selectedPlan.value) {
    alert(copy.value.choosePlanAlert)
    return
  }
  const planLabel = planOptions.value[selectedPlan.value]?.label || selectedPlan.value
  const planDetail = planOptions.value[selectedPlan.value] ? `${planOptions.value[selectedPlan.value].label} ${planOptions.value[selectedPlan.value].price}` : selectedPlan.value

  submitting.value = true
  try {
    if (db) {
      await addDoc(collection(db, 'bookings'), {
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email,
        date: selectedDate.value,
        time: selectedTime.value,
        plan: selectedPlan.value,
        plan_label: planLabel,
        created_at: serverTimestamp()
      })
    }
    const msg = `${copy.value.waIntro}\n\n📋 *${copy.value.waPlan}:* ${planDetail}\n👤 *${copy.value.waName}:* ${form.value.name}\n📱 *${copy.value.waPhone}:* ${form.value.phone}\n📧 *${copy.value.waEmail}:* ${form.value.email}\n📅 *${copy.value.waDate}:* ${selectedDate.value}\n⏰ *${copy.value.waTime}:* ${selectedTime.value}`
    window.open(`https://wa.me/85255379080?text=${encodeURIComponent(msg)}`, '_blank')
    if (db) {
      alert(copy.value.saveSuccessAlert)
    } else {
      alert(copy.value.redirectAlert)
    }
    form.value = { name: '', phone: '', email: '' }
    selectedTime.value = ''
    selectedPlan.value = ''
    loadSlots()
  } catch (e) {
    console.error(e)
    alert(copy.value.failedAlert)
  } finally {
    submitting.value = false
  }
}

onMounted(loadSlots)
</script>
