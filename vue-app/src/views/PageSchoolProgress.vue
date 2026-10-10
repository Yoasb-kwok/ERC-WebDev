<template>
  <section id="school-progress">
    <HeroSection :slides="['/images/course.png']" hero-height="40vh">
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.subtitle }}</p>
    </HeroSection>

    <div class="container progress-page">
      <form class="panel class-panel" @submit.prevent>
        <div class="panel-head">
          <h2>{{ copy.classTitle }}</h2>
          <p class="save-note">{{ savedLabel }}</p>
        </div>
        <div class="meta-grid">
          <div class="field">
            <label for="school-name">{{ copy.school }}</label>
            <input id="school-name" v-model="state.school" type="text" :placeholder="copy.schoolPlaceholder" autocomplete="organization">
          </div>
          <div class="field">
            <label for="class-name">{{ copy.className }}</label>
            <input id="class-name" v-model="state.className" type="text" :placeholder="copy.classPlaceholder">
          </div>
          <div class="field">
            <label for="teacher-name">{{ copy.teacher }}</label>
            <input id="teacher-name" v-model="state.teacher" type="text" :placeholder="copy.teacherPlaceholder" autocomplete="name">
          </div>
          <div class="field">
            <label for="class-date">{{ copy.date }}</label>
            <input id="class-date" v-model="state.date" type="date">
          </div>
        </div>
        <p class="hint">{{ copy.localHint }}</p>
      </form>

      <section class="panel" aria-labelledby="resource-heading">
        <h2 id="resource-heading">{{ copy.linksTitle }}</h2>
        <p class="lede">{{ copy.linksLede }}</p>
        <div class="link-grid">
          <a class="resource-link" :href="links.roboflow" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-tags" aria-hidden="true"></i>
            <span>
              <strong>{{ copy.linkRoboflow }}</strong>
              <small>{{ copy.linkRoboflowHint }}</small>
            </span>
          </a>
          <a class="resource-link" :href="links.studentSdk" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-book" aria-hidden="true"></i>
            <span>
              <strong>{{ copy.linkSdk }}</strong>
              <small>docs/STUDENT_SDK.md</small>
            </span>
          </a>
          <a class="resource-link" :href="links.repo" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github" aria-hidden="true"></i>
            <span>
              <strong>{{ copy.linkRepo }}</strong>
              <small>Yoasb-kwok/ERC_auto</small>
            </span>
          </a>
          <router-link class="resource-link" :to="links.courses">
            <i class="fas fa-graduation-cap" aria-hidden="true"></i>
            <span>
              <strong>{{ copy.linkCourses }}</strong>
              <small>{{ copy.linkCoursesHint }}</small>
            </span>
          </router-link>
        </div>
      </section>

      <section class="overview" aria-labelledby="overview-heading">
        <div class="overview-copy">
          <h2 id="overview-heading">{{ copy.overviewTitle }}</h2>
          <p>{{ overviewText }}</p>
        </div>
        <p class="overview-count">{{ progress.completedCount }}<span>/4</span></p>
        <div class="progress-grid">
          <button
            v-for="item in sessionNav"
            :key="item.id"
            type="button"
            class="progress-pill"
            :class="progress[item.id].status"
            @click="scrollTo(item.id)"
          >
            <span class="pill-code">{{ item.code }}</span>
            <span class="pill-title">{{ item.title }}</span>
            <span class="pill-meta">{{ countLabel(progress[item.id]) }}</span>
          </button>
        </div>
      </section>

      <article id="c1" class="panel session">
        <header class="session-head">
          <div>
            <p class="session-kicker">C1 · 1.5 {{ copy.hours }} · {{ copy.c1Kicker }}</p>
            <h2>{{ copy.c1Title }}</h2>
          </div>
          <span class="status" :class="progress.c1.status">{{ copy.status[progress.c1.status] }}</span>
        </header>
        <p class="lede">{{ copy.c1Lede }}</p>
        <p class="api-line"><code>erc.move_forward</code> <code>stop</code> <code>turn_left</code> <code>turn_right</code> <code>estop</code> <code>clear_estop</code></p>
        <ul class="checks">
          <li v-for="item in copy.c1Items" :key="item.key">
            <label>
              <input v-model="state.c1[item.key]" type="checkbox">
              <span>{{ item.label }}</span>
            </label>
          </li>
        </ul>
        <div class="field">
          <label for="c1-notes">{{ copy.notes }}</label>
          <textarea id="c1-notes" v-model="state.c1.notes" rows="3" :placeholder="copy.c1NotesPlaceholder"></textarea>
        </div>
        <p class="hint">{{ copy.c1DoneHint }}</p>
      </article>

      <article id="c2" class="panel session">
        <header class="session-head">
          <div>
            <p class="session-kicker">C2 · 1.5 {{ copy.hours }} · {{ copy.c2Kicker }}</p>
            <h2>{{ copy.c2Title }}</h2>
          </div>
          <span class="status" :class="progress.c2.status">{{ copy.status[progress.c2.status] }}</span>
        </header>
        <p class="lede">{{ copy.c2Lede }}</p>
        <p class="api-line"><code>erc.load_model</code> <code>on_detect</code> <code>simulate_detect</code></p>
        <div class="field-grid">
          <div class="field">
            <label for="c2-workspace">{{ copy.workspace }}</label>
            <input id="c2-workspace" v-model="state.c2.workspace" type="text" :placeholder="copy.workspacePlaceholder">
          </div>
          <div class="field">
            <label for="c2-project">{{ copy.project }}</label>
            <input id="c2-project" v-model="state.c2.project" type="text" placeholder="erc-signs">
          </div>
          <div class="field">
            <label for="c2-classes">{{ copy.classes }}</label>
            <input id="c2-classes" v-model="state.c2.classes" type="text" placeholder="stop_sign, go_sign">
          </div>
          <div class="field">
            <label for="c2-images">{{ copy.imageCount }}</label>
            <input id="c2-images" v-model="state.c2.imageCount" type="number" min="0" inputmode="numeric">
          </div>
          <div class="field">
            <label for="c2-model">{{ copy.modelId }}</label>
            <input id="c2-model" v-model="state.c2.modelId" type="text" placeholder="workspace/project/version">
          </div>
          <div class="field">
            <label for="c2-weights">{{ copy.weights }}</label>
            <input id="c2-weights" v-model="state.c2.weightsFile" type="text" placeholder="erc-signs.onnx">
          </div>
          <div class="field">
            <label for="c2-confidence">{{ copy.confidence }}</label>
            <input id="c2-confidence" v-model="state.c2.confidence" type="text" placeholder="0.5">
          </div>
        </div>
        <ul class="checks">
          <li v-for="item in copy.c2Items" :key="item.key">
            <label>
              <input v-model="state.c2[item.key]" type="checkbox">
              <span>{{ item.label }}</span>
            </label>
          </li>
        </ul>
        <div class="field">
          <label for="c2-notes">{{ copy.notes }}</label>
          <textarea id="c2-notes" v-model="state.c2.notes" rows="3" :placeholder="copy.c2NotesPlaceholder"></textarea>
        </div>
        <p class="hint">{{ copy.c2DoneHint }}</p>
      </article>

      <article id="c3" class="panel session">
        <header class="session-head">
          <div>
            <p class="session-kicker">C3 · 1.5 {{ copy.hours }} · {{ copy.c3Kicker }}</p>
            <h2>{{ copy.c3Title }}</h2>
          </div>
          <span class="status" :class="progress.c3.status">{{ copy.status[progress.c3.status] }}</span>
        </header>
        <p class="lede">{{ copy.c3Lede }}</p>
        <p class="api-line"><code>erc.on_voice</code> <code>hear</code></p>
        <div class="table-wrap">
          <table class="voice-table">
            <thead>
              <tr>
                <th scope="col">{{ copy.phrase }}</th>
                <th scope="col">{{ copy.action }}</th>
                <th scope="col">{{ copy.tested }}</th>
                <th scope="col">{{ copy.note }}</th>
                <th scope="col"><span class="sr-only">{{ copy.remove }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in state.c3.rows" :key="row.id">
                <td>
                  <label class="sr-only" :for="`phrase-${row.id}`">{{ copy.phrase }}</label>
                  <input :id="`phrase-${row.id}`" v-model="row.phrase" type="text" :placeholder="copy.phrasePlaceholder" @input="markVoiceEdited(row)">
                </td>
                <td>
                  <label class="sr-only" :for="`action-${row.id}`">{{ copy.action }}</label>
                  <input :id="`action-${row.id}`" v-model="row.action" type="text" placeholder="erc.stop()" @input="markVoiceEdited(row)">
                </td>
                <td class="tested-cell">
                  <label>
                    <input v-model="row.tested" type="checkbox">
                    <span>{{ copy.tested }}</span>
                  </label>
                </td>
                <td>
                  <label class="sr-only" :for="`note-${row.id}`">{{ copy.note }}</label>
                  <input :id="`note-${row.id}`" v-model="row.note" type="text" :placeholder="copy.notePlaceholder" @input="markVoiceEdited(row)">
                </td>
                <td>
                  <button type="button" class="icon-btn" :aria-label="copy.remove" @click="removeVoiceRow(index)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" class="btn" @click="addVoiceRow">
          <i class="fas fa-plus" aria-hidden="true"></i> {{ copy.addRow }}
        </button>
        <p class="hint">{{ copy.c3DoneHint }}</p>
      </article>

      <article id="c4" class="panel session">
        <header class="session-head">
          <div>
            <p class="session-kicker">C4 · 1.5 {{ copy.hours }} · {{ copy.c4Kicker }}</p>
            <h2>{{ copy.c4Title }}</h2>
          </div>
          <span class="status" :class="progress.c4.status">{{ copy.status[progress.c4.status] }}</span>
        </header>
        <p class="lede">{{ copy.c4Lede }}</p>
        <p class="api-line"><code>erc.estop</code> <code>clear_estop</code> <code>set_manual_override</code></p>
        <ul class="checks">
          <li v-for="item in copy.c4Items" :key="item.key">
            <label>
              <input v-model="state.c4[item.key]" type="checkbox">
              <span>{{ item.label }}</span>
            </label>
          </li>
        </ul>
        <div class="field-grid">
          <div class="field field-wide">
            <label for="c4-challenge">{{ copy.challenge }}</label>
            <textarea id="c4-challenge" v-model="state.c4.challenge" rows="3" :placeholder="copy.challengePlaceholder"></textarea>
          </div>
          <div class="field">
            <label for="c4-outcome">{{ copy.outcome }}</label>
            <select id="c4-outcome" v-model="state.c4.outcome">
              <option value="">{{ copy.outcomePlaceholder }}</option>
              <option value="done">{{ copy.outcomeDone }}</option>
              <option value="practice">{{ copy.outcomePractice }}</option>
            </select>
          </div>
          <div class="field field-wide">
            <label for="c4-happened">{{ copy.whatHappened }}</label>
            <textarea id="c4-happened" v-model="state.c4.whatHappened" rows="3" :placeholder="copy.whatHappenedPlaceholder"></textarea>
          </div>
          <div class="field field-wide">
            <label for="c4-reflection">{{ copy.reflection }}</label>
            <textarea id="c4-reflection" v-model="state.c4.reflection" rows="4" :placeholder="copy.reflectionPlaceholder"></textarea>
          </div>
          <div class="field field-wide">
            <label for="c4-follow">{{ copy.followUp }}</label>
            <textarea id="c4-follow" v-model="state.c4.followUp" rows="2" :placeholder="copy.followUpPlaceholder"></textarea>
          </div>
        </div>
        <p class="hint">{{ copy.c4DoneHint }}</p>
      </article>

      <div class="actions no-print">
        <button type="button" class="btn btn-primary" @click="downloadRecord">
          <i class="fas fa-download" aria-hidden="true"></i> {{ copy.download }}
        </button>
        <button type="button" class="btn" @click="printPage">
          <i class="fas fa-print" aria-hidden="true"></i> {{ copy.print }}
        </button>
        <button type="button" class="btn btn-danger" @click="clearRecord">
          {{ copy.clear }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import { language } from '@/i18n'
import {
  LINKS,
  SAVED_AT_KEY,
  STORAGE_KEY,
  artefactProgress,
  createVoiceRow,
  loadProgress,
  normalizeProgress,
  saveProgress
} from '@/data/schoolProgress'

const links = LINKS
const state = ref(loadProgress(localStorage))
const savedAt = ref(localStorage.getItem(SAVED_AT_KEY) || '')

watch(state, () => {
  const now = new Date().toISOString()
  savedAt.value = now
  saveProgress(localStorage, state.value)
  localStorage.setItem(SAVED_AT_KEY, now)
}, { deep: true })

const progress = computed(() => artefactProgress(state.value))

const copy = computed(() => (
  language.value === 'en'
    ? {
      title: 'ERC AI School Progress',
      subtitle: 'For teachers. Four 1.5-hour lessons: SDK drive, Roboflow detection, voice, then safety.',
      classTitle: 'Class details',
      school: 'School',
      schoolPlaceholder: 'e.g. ABC Primary School',
      className: 'Class',
      classPlaceholder: 'e.g. P5A',
      teacher: 'Teacher',
      teacherPlaceholder: 'Name',
      date: 'Date',
      localHint: 'Saved in this browser only. It is not uploaded. Do not paste a Roboflow API key here.',
      linksTitle: 'Lesson links',
      linksLede: 'Train on Roboflow. Run the car with the ERC_auto Python SDK. This page only records progress.',
      linkRoboflow: 'Roboflow',
      linkRoboflowHint: 'Label and train',
      linkSdk: 'Student SDK guide',
      linkRepo: 'ERC_auto repository',
      linkCourses: 'STEM courses on this site',
      linkCoursesHint: 'Course list',
      overviewTitle: 'Four class records',
      overviewBody: '{school}{done} of 4 records complete.',
      overviewEmptySchool: 'This class',
      hours: 'h',
      status: { todo: 'Not started', doing: 'In progress', done: 'Complete' },
      count: '{checked}/{total}',
      notes: 'Notes',
      c1Kicker: 'SDK drive',
      c1Title: '1. Connection checklist',
      c1Lede: 'Students drive by calling SDK functions. The SDK writes the car message. Connect the computer to the car Wi-Fi first (the access point from 8266.ino, car at 192.168.4.1 port 4210).',
      c1Items: [
        { key: 'wifi', label: 'Computer is on the car Wi-Fi' },
        { key: 'installed', label: 'SDK installed (python3 -m pip install -r requirements-ai.txt)' },
        { key: 'imported', label: 'The program can import erc' },
        { key: 'forward', label: 'erc.move_forward() drives forward' },
        { key: 'stop', label: 'erc.stop() brakes, and the brake is not latched' },
        { key: 'turns', label: 'erc.turn_left() and erc.turn_right() were tried' },
        { key: 'estop', label: 'erc.estop() latches the brake, and erc.clear_estop() releases it without moving the car' },
        { key: 'dryRun', label: 'Dry run with ERC_LOG_ONLY=1 (prints the command, does not drive)' }
      ],
      c1NotesPlaceholder: 'Which cars connected, and what still failed',
      c1DoneHint: 'Complete when all eight checks are ticked.',
      c2Kicker: 'Roboflow detect',
      c2Title: '2. Roboflow label and model record',
      c2Lede: 'Training happens on the Roboflow website: create a project, upload photos, draw boxes, then press Train. Students do not write a training loop. In class they only run erc.load_model and erc.on_detect. Do not paste an API key on this page.',
      workspace: 'Roboflow workspace',
      workspacePlaceholder: 'Workspace name',
      project: 'Project name',
      classes: 'Class names',
      imageCount: 'Labelled images',
      modelId: 'Model id',
      weights: 'Weights file',
      confidence: 'Confidence',
      c2Items: [
        { key: 'labeled', label: 'Photos uploaded and boxes drawn' },
        { key: 'trained', label: 'Train pressed on Roboflow' },
        { key: 'loaded', label: 'erc.load_model can load the model' },
        { key: 'mapped', label: 'erc.on_detect maps each class to stop or move_forward' },
        { key: 'verified', label: 'simulate_detect or the real car confirmed a detection drives the car' }
      ],
      c2NotesPlaceholder: 'Class names that misfired, or confidence that needed a change',
      c2DoneHint: 'Complete when all five checks are ticked and the project name, class names, and model id or weights file are filled in.',
      c3Kicker: 'Voice',
      c3Title: '3. Voice command table',
      c3Lede: 'erc.on_voice maps a phrase to an action. stop, halt, 停止, and 停 are one intent. 前進 and forward are one intent. The microphone engine is later work; test with erc.hear("phrase"). run() does not listen yet.',
      phrase: 'Phrase',
      phrasePlaceholder: 'e.g. 停止',
      action: 'SDK action',
      tested: 'Tested',
      note: 'Note',
      notePlaceholder: 'Optional',
      addRow: 'Add a command',
      remove: 'Remove this row',
      c3DoneHint: 'Complete when every filled row has a phrase, an action, and Tested ticked. Blank rows are ignored.',
      c4Kicker: 'Safety',
      c4Title: '4. Safety challenge and reflection',
      c4Lede: 'erc.estop() latches the brake. Until erc.clear_estop(), move_forward and the colour, voice, and detection handlers do not drive. Clearing the e-stop does not resume the old speed. Manual override wins the same way, and e-stop still works while override is on.',
      c4Items: [
        { key: 'demoEstop', label: 'Demonstrated erc.estop() latching the brake' },
        { key: 'blockedDrive', label: 'Confirmed drive, voice, and detection do nothing while e-stop is latched' },
        { key: 'clearStaysStill', label: 'Confirmed the car stays still after erc.clear_estop()' },
        { key: 'overrideExplained', label: 'Explained manual override (erc.set_manual_override)' }
      ],
      challenge: 'Challenge',
      challengePlaceholder: 'What students had to do before the car could move again',
      outcome: 'Result',
      outcomePlaceholder: 'Select',
      outcomeDone: 'Completed',
      outcomePractice: 'Needs more practice',
      whatHappened: 'What happened',
      whatHappenedPlaceholder: 'Who stopped the car, and whether anyone expected it to restart on its own',
      reflection: 'Student reflection',
      reflectionPlaceholder: 'What the class said about why the brake stays on',
      followUp: 'Follow-up',
      followUpPlaceholder: 'What to revisit next lesson',
      c4DoneHint: 'Complete when all four checks are ticked and both the challenge and the reflection are filled in.',
      download: 'Download JSON',
      print: 'Print',
      clear: 'Clear this class',
      clearConfirm: 'Clear the progress stored in this browser for this class?',
      saved: 'Saved in this browser · {time}',
      notSaved: 'Not saved yet. Tick a box or type to save in this browser.'
    }
    : {
      title: 'ERC AI 學校課程進度',
      subtitle: '給學校老師。四堂各 1.5 小時：SDK 駕駛、Roboflow 偵測、語音指令，然後安全挑戰。',
      classTitle: '班別資料',
      school: '學校名稱',
      schoolPlaceholder: '例如：德安小學',
      className: '班別',
      classPlaceholder: '例如：小五甲',
      teacher: '負責老師',
      teacherPlaceholder: '老師姓名',
      date: '上課日期',
      localHint: '紀錄只存在這部瀏覽器，不會上傳。請勿在此頁貼上 Roboflow API 金鑰。',
      linksTitle: '課堂連結',
      linksLede: '訓練用 Roboflow，開車用 ERC_auto Python SDK。本頁只供老師勾選和記錄進度。',
      linkRoboflow: 'Roboflow',
      linkRoboflowHint: '標註與訓練',
      linkSdk: '學生 SDK 說明',
      linkRepo: 'ERC_auto 程式庫',
      linkCourses: '本站 STEM 課程',
      linkCoursesHint: '課程一覽',
      overviewTitle: '四項課堂紀錄',
      overviewBody: '{school}已完成 {done}／4 項紀錄。',
      overviewEmptySchool: '本班',
      hours: '小時',
      status: { todo: '未開始', doing: '進行中', done: '已完成' },
      count: '{checked}/{total}',
      notes: '備註',
      c1Kicker: 'SDK 駕駛',
      c1Title: '1. 連線檢查表',
      c1Lede: '學生呼叫 SDK 函式開車，SDK 會寫成車輛訊息，學生不用自己寫 L:、R:、B:、S:。請先把電腦連上車輛 Wi-Fi（8266.ino 開啟的熱點，車輛位址 192.168.4.1，連接埠 4210）。',
      c1Items: [
        { key: 'wifi', label: '電腦已連接車輛 Wi-Fi' },
        { key: 'installed', label: '已安裝 SDK（python3 -m pip install -r requirements-ai.txt）' },
        { key: 'imported', label: '程式可以 import erc' },
        { key: 'forward', label: 'erc.move_forward() 可以前進' },
        { key: 'stop', label: 'erc.stop() 可以煞車，而且煞車沒有鎖住' },
        { key: 'turns', label: '已試過 erc.turn_left() 和 erc.turn_right()' },
        { key: 'estop', label: 'erc.estop() 可以鎖住煞車，erc.clear_estop() 可以解除，解除後車輛保持靜止' },
        { key: 'dryRun', label: '已用 ERC_LOG_ONLY=1 做無車試跑（只印指令，不開車）' }
      ],
      c1NotesPlaceholder: '哪幾部車已連上、哪一項仍失敗',
      c1DoneHint: '八項全部勾選後，這項紀錄才算完成。',
      c2Kicker: 'Roboflow 偵測',
      c2Title: '2. Roboflow 標註與模型紀錄',
      c2Lede: '訓練在 Roboflow 網站完成：建立專案、上載相片、畫框，然後按 Train。學生不用寫訓練迴圈。課堂只執行 erc.load_model 和 erc.on_detect。請勿在此頁貼上 API 金鑰。',
      workspace: 'Roboflow workspace',
      workspacePlaceholder: '工作區名稱',
      project: '專案名稱',
      classes: '類別名稱',
      imageCount: '已標註圖片數量',
      modelId: '模型編號',
      weights: '權重檔名',
      confidence: '信心閾值',
      c2Items: [
        { key: 'labeled', label: '已上載相片並畫框' },
        { key: 'trained', label: '已在 Roboflow 按 Train' },
        { key: 'loaded', label: 'erc.load_model 可以載入模型' },
        { key: 'mapped', label: 'erc.on_detect 已把類別對到 stop 或 move_forward' },
        { key: 'verified', label: '已用 simulate_detect 或實車確認偵測會開車' }
      ],
      c2NotesPlaceholder: '哪些類別誤判，或信心閾值要不要調',
      c2DoneHint: '五項全部勾選，並填上專案名稱、類別名稱，以及模型編號或權重檔名後，這項紀錄才算完成。',
      c3Kicker: '語音',
      c3Title: '3. 語音指令表',
      c3Lede: 'erc.on_voice 把口令對到動作。stop、halt、停止、停 是同一意圖；前進 與 forward 是同一意圖。麥克風引擎仍是後續工作，課堂可用 erc.hear("口令") 測試。run() 尚未聽麥克風。',
      phrase: '口令',
      phrasePlaceholder: '例如：停止',
      action: 'SDK 動作',
      tested: '已測試',
      note: '備註',
      notePlaceholder: '可留空',
      addRow: '新增一句口令',
      remove: '刪除此列',
      c3DoneHint: '每一列已填的口令都要有動作，並勾選已測試。空白列不算。',
      c4Kicker: '安全',
      c4Title: '4. 安全挑戰紀錄與反思',
      c4Lede: 'erc.estop() 會鎖住煞車。鎖住期間，move_forward、顏色、語音和偵測都不會開車，直到 erc.clear_estop()。解除不會恢復原來速度，車輛保持靜止。手動覆寫同樣優先，但緊急停止仍然有效。',
      c4Items: [
        { key: 'demoEstop', label: '已示範 erc.estop() 鎖住煞車' },
        { key: 'blockedDrive', label: '已確認緊急停止後，前進、語音和偵測都不會開車' },
        { key: 'clearStaysStill', label: '已確認 erc.clear_estop() 後車輛保持靜止' },
        { key: 'overrideExplained', label: '已向學生說明手動覆寫（erc.set_manual_override）' }
      ],
      challenge: '挑戰任務',
      challengePlaceholder: '學生要做什麼，車輛才可以再前進',
      outcome: '結果',
      outcomePlaceholder: '請選擇',
      outcomeDone: '完成',
      outcomePractice: '需要再練習',
      whatHappened: '課堂發生了什麼',
      whatHappenedPlaceholder: '誰按下緊急停止，有沒有同學以為車會自己再開',
      reflection: '學生反思',
      reflectionPlaceholder: '同學怎樣說煞車為什麼會鎖住',
      followUp: '下堂跟進',
      followUpPlaceholder: '下堂要再練的地方',
      c4DoneHint: '四項全部勾選，並填上挑戰任務和學生反思後，這項紀錄才算完成。',
      download: '下載 JSON',
      print: '列印',
      clear: '清除本班紀錄',
      clearConfirm: '要清除這部瀏覽器裡本班的課程進度嗎？',
      saved: '已儲存於這部瀏覽器 · {time}',
      notSaved: '尚未儲存。勾選或輸入後會存在這部瀏覽器。'
    }
))

const sessionNav = computed(() => [
  { id: 'c1', code: 'C1', title: copy.value.c1Title.replace(/^\d+\.\s*/, '') },
  { id: 'c2', code: 'C2', title: copy.value.c2Title.replace(/^\d+\.\s*/, '') },
  { id: 'c3', code: 'C3', title: copy.value.c3Title.replace(/^\d+\.\s*/, '') },
  { id: 'c4', code: 'C4', title: copy.value.c4Title.replace(/^\d+\.\s*/, '') }
])

const overviewText = computed(() => {
  const school = state.value.school.trim()
  const label = school || copy.value.overviewEmptySchool
  const schoolBit = language.value === 'en' ? `${label}: ` : `${label} · `
  return copy.value.overviewBody
    .replace('{school}', schoolBit)
    .replace('{done}', String(progress.value.completedCount))
})

const savedLabel = computed(() => {
  if (!savedAt.value) return copy.value.notSaved
  const time = new Date(savedAt.value).toLocaleString(language.value === 'en' ? 'en-HK' : 'zh-HK')
  return copy.value.saved.replace('{time}', time)
})

function countLabel(part) {
  return copy.value.count
    .replace('{checked}', String(part.checked))
    .replace('{total}', String(part.total))
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function markVoiceEdited(row) {
  row.template = false
}

function addVoiceRow() {
  state.value.c3.rows.push(createVoiceRow())
}

function removeVoiceRow(index) {
  state.value.c3.rows.splice(index, 1)
  if (!state.value.c3.rows.length) addVoiceRow()
}

function downloadRecord() {
  const record = normalizeProgress(state.value)
  record.c3.rows = record.c3.rows.map(({ template, ...row }) => row)
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const school = (record.school.trim() || 'class').replace(/[\\/:*?"<>|]+/g, '-')
  link.href = url
  link.download = `erc-ai-progress-${school}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function printPage() {
  window.print()
}

function clearRecord() {
  if (!window.confirm(copy.value.clearConfirm)) return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SAVED_AT_KEY)
  savedAt.value = ''
  state.value = loadProgress(localStorage)
}
</script>

<style scoped>
.progress-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 2rem;
}
#school-progress :deep(.hero h1) {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
}
#school-progress :deep(.hero p) {
  max-width: 40rem;
}
.panel {
  background: var(--bg-white);
  border: 2px solid var(--brand-dark);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
}
.panel h2,
.overview h2 {
  color: var(--text-main);
  font-size: 1.45rem;
  line-height: 1.3;
}
.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
}
.save-note,
.hint,
.lede {
  color: var(--text-muted);
}
.save-note,
.hint {
  font-size: 0.92rem;
}
.lede {
  margin: 0.75rem 0 1rem;
}
.meta-grid,
.field-grid,
.link-grid,
.progress-grid {
  display: grid;
  gap: 1rem;
}
.meta-grid,
.field-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.link-grid,
.progress-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
}
.field-wide {
  grid-column: 1 / -1;
}
label,
.field label {
  font-weight: 700;
  color: var(--text-main);
}
input[type="text"],
input[type="number"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  background: white;
  color: var(--text-main);
}
textarea {
  resize: vertical;
}
.resource-link {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.9rem;
  border-radius: 10px;
  background: var(--bg-light);
  color: var(--text-main);
  text-decoration: none;
  border-left: 4px solid var(--brand-primary);
}
.resource-link:hover {
  color: var(--brand-primary);
}
.resource-link i {
  color: var(--brand-primary);
  margin-top: 0.2rem;
}
.resource-link span {
  display: flex;
  flex-direction: column;
}
.resource-link small {
  color: var(--text-muted);
}
.overview {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem 1.5rem;
  align-items: end;
}
.overview-count {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--brand-dark);
  line-height: 1;
}
.overview-count span {
  font-size: 1.1rem;
  color: var(--text-muted);
}
.progress-grid {
  grid-column: 1 / -1;
}
.progress-pill,
.btn,
.icon-btn {
  font-family: var(--font-body);
  cursor: pointer;
}
.progress-pill {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 2px solid #d5dde3;
  background: white;
  color: var(--text-main);
}
.progress-pill.doing {
  border-color: var(--brand-primary);
}
.progress-pill.done {
  border-color: var(--brand-dark);
  background: var(--brand-dark);
  color: white;
}
.pill-code {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--brand-primary);
}
.progress-pill.done .pill-code,
.progress-pill.done .pill-meta {
  color: white;
}
.pill-meta {
  color: var(--text-muted);
  font-size: 0.85rem;
}
.session {
  scroll-margin-top: 96px;
}
.session-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}
.session-kicker {
  color: var(--brand-primary);
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.api-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
code {
  background: var(--bg-light);
  color: var(--brand-dark);
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  font-size: 0.92rem;
}
.checks {
  list-style: none;
  display: grid;
  gap: 0.65rem;
  margin-bottom: 1rem;
}
.checks label,
.tested-cell label {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-weight: 500;
}
input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 0.2rem;
  accent-color: var(--brand-primary);
  flex: none;
}
.status {
  flex: none;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  background: var(--bg-light);
  color: var(--text-muted);
}
.status.doing {
  color: var(--brand-dark);
  background: #e5f3f5;
}
.status.done {
  color: white;
  background: var(--brand-dark);
}
.table-wrap {
  overflow-x: auto;
  margin-bottom: 0.75rem;
}
.voice-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
}
.voice-table th {
  text-align: left;
  font-size: 0.9rem;
  padding: 0.4rem;
}
.voice-table td {
  padding: 0.35rem;
  vertical-align: middle;
}
.field + .hint,
.checks + .field,
.field-grid {
  margin-top: 0.5rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.btn,
.icon-btn {
  border: 2px solid var(--brand-dark);
  background: white;
  color: var(--brand-dark);
  border-radius: 6px;
  padding: 0.65rem 1rem;
  font-weight: 700;
}
.btn-primary {
  background: var(--brand-dark);
  color: white;
}
.btn-danger {
  border-color: var(--brand-accent);
  color: var(--brand-accent);
  margin-left: auto;
}
.icon-btn {
  padding: 0.45rem 0.6rem;
}
.btn:hover,
.icon-btn:hover,
.progress-pill:hover {
  transform: translateY(-1px);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
@media (max-width: 800px) {
  .meta-grid,
  .field-grid,
  .link-grid,
  .progress-grid,
  .overview {
    grid-template-columns: 1fr;
  }
  .panel-head,
  .session-head {
    flex-direction: column;
  }
  .btn-danger {
    margin-left: 0;
  }
  .voice-table {
    min-width: 0;
  }
  .voice-table,
  .voice-table tbody,
  .voice-table tr,
  .voice-table td {
    display: block;
    width: 100%;
  }
  .voice-table thead {
    display: none;
  }
  .voice-table tr {
    border: 1px solid #d5dde3;
    border-radius: 8px;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .voice-table td {
    padding: 0.35rem 0;
  }
  .voice-table .sr-only {
    position: static;
    width: auto;
    height: auto;
    margin: 0 0 0.2rem;
    overflow: visible;
    clip: auto;
  }
}
</style>

<style>
@media print {
  nav,
  .whatsapp-float,
  footer,
  .no-print {
    display: none !important;
  }
  .page-section {
    padding-top: 0 !important;
  }
  .hero {
    height: auto !important;
    min-height: 0 !important;
  }
}
</style>
