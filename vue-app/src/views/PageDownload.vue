<template>
  <section id="download">
    <HeroSection :slides="['/images/banner2.webp']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container">
      <div class="download-container">
        <i class="fas fa-box-open" style="font-size: 4rem; color: var(--brand-primary); margin-bottom: 20px;"></i>
        <h2 style="margin-bottom: 10px;">ERC Host Controller</h2>
        <span style="background:var(--electric-blue); color:white; padding:3px 8px; border-radius:4px; font-size:0.9rem;">Version 1.2.0 (Stable)</span>

        <p style="margin-top: 20px; color: var(--text-muted);">
          {{ copy.description }}
        </p>

        <div class="requirements">
          <h4><i class="fas fa-cogs"></i> {{ copy.requirements }}</h4>
          <ul>
            <li><i class="fas fa-check"></i> Windows 10 / 11 (64-bit)</li>
            <li><i class="fas fa-check"></i> {{ copy.req2 }}</li>
            <li><i class="fas fa-check"></i> {{ copy.req3 }}</li>
            <li><i class="fas fa-check"></i> {{ copy.req4 }}</li>
          </ul>
        </div>

        <a href="https://drive.google.com/file/d/1pPSq7irpVbjj8yRFcxqzQFPFOSOqwrGa/view?usp=sharing" class="cta-button" target="_blank" rel="noopener">
          <span><i class="fas fa-download"></i> {{ copy.downloadBtn }}</span>
        </a>

        <div style="margin-top: 20px; font-size: 0.8rem; color: #888;">
          {{ copy.fileMeta }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { language } from '@/i18n'

const copy = computed(() => (
  language.value === 'en'
    ? {
      title: 'Driving Software Download',
      subtitle: 'Download the host application to connect your wheel to the car.',
      description: 'This application bridges your PC and the ERC vehicle, handling input mapping, Wi-Fi connection, and telemetry display.',
      requirements: 'System Requirements',
      req2: 'Logitech G-Hub installed',
      req3: 'Wi-Fi adapter (2.4GHz supported)',
      req4: '.NET Framework 4.8 or above',
      downloadBtn: 'Download Installer (.exe)',
      fileMeta: 'SHA-256: 8A2F... | Size: 45MB'
    }
    : {
      title: '駕駛軟體下載',
      subtitle: '下載主控程式，把方向盤連接到 ERC 車輛。',
      description: '此軟體作為 PC 與 ERC 車輛之間的橋樑，負責處理輸入映射、WiFi 連接和遙測顯示。',
      requirements: '系統需求',
      req2: '已安裝 Logitech G-Hub',
      req3: 'WiFi 接收器 (需支援 2.4GHz)',
      req4: '.NET Framework 4.8 或更高版本',
      downloadBtn: '下載安裝程式 (.exe)',
      fileMeta: 'SHA-256: 8A2F... | 大小: 45MB'
    }
))
</script>
