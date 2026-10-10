/** Teacher progress for the school ERC AI course (C1–C4). Browser-only. */

export const STORAGE_KEY = 'erc-ai-school-progress'
export const SAVED_AT_KEY = 'erc-ai-school-progress-saved-at'

export const C1_KEYS = ['wifi', 'installed', 'imported', 'forward', 'stop', 'turns', 'estop', 'dryRun']
export const C2_CHECK_KEYS = ['labeled', 'trained', 'loaded', 'mapped', 'verified']
export const C4_CHECK_KEYS = ['demoEstop', 'blockedDrive', 'clearStaysStill', 'overrideExplained']

export const LINKS = {
  roboflow: 'https://roboflow.com',
  studentSdk: 'https://github.com/Yoasb-kwok/ERC_auto/blob/main/docs/STUDENT_SDK.md',
  repo: 'https://github.com/Yoasb-kwok/ERC_auto',
  courses: '/courses'
}

function text(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return typeof value === 'string' ? value : ''
}

function flags(source, keys) {
  const next = {}
  for (const key of keys) next[key] = Boolean(source && source[key])
  return next
}

export function createVoiceRow(partial = {}) {
  return {
    id: text(partial.id) || `voice-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    phrase: text(partial.phrase),
    action: text(partial.action),
    tested: Boolean(partial.tested),
    note: text(partial.note),
    template: Boolean(partial.template)
  }
}

export function createEmptyProgress() {
  return {
    school: '',
    className: '',
    teacher: '',
    date: '',
    c1: {
      ...flags(null, C1_KEYS),
      notes: ''
    },
    c2: {
      workspace: '',
      project: '',
      classes: '',
      imageCount: '',
      modelId: '',
      weightsFile: '',
      confidence: '',
      ...flags(null, C2_CHECK_KEYS),
      notes: ''
    },
    c3: {
      rows: [
        createVoiceRow({ phrase: 'stop / 停止 / 停', action: 'erc.stop()', template: true }),
        createVoiceRow({ phrase: '前進 / forward', action: 'erc.move_forward()', template: true }),
        createVoiceRow({ phrase: '緊急停止', action: 'erc.estop()', template: true })
      ]
    },
    c4: {
      ...flags(null, C4_CHECK_KEYS),
      challenge: '',
      outcome: '',
      whatHappened: '',
      reflection: '',
      followUp: ''
    }
  }
}

function filledRow(row) {
  return Boolean(row.phrase.trim() || row.action.trim() || row.note.trim() || row.tested)
}

export function normalizeProgress(raw) {
  const base = createEmptyProgress()
  if (!raw || typeof raw !== 'object') return base

  base.school = text(raw.school)
  base.className = text(raw.className)
  base.teacher = text(raw.teacher)
  base.date = text(raw.date)

  const c1 = raw.c1 && typeof raw.c1 === 'object' ? raw.c1 : {}
  base.c1 = { ...flags(c1, C1_KEYS), notes: text(c1.notes) }

  const c2 = raw.c2 && typeof raw.c2 === 'object' ? raw.c2 : {}
  base.c2 = {
    workspace: text(c2.workspace),
    project: text(c2.project),
    classes: text(c2.classes),
    imageCount: text(c2.imageCount),
    modelId: text(c2.modelId),
    weightsFile: text(c2.weightsFile),
    confidence: text(c2.confidence),
    ...flags(c2, C2_CHECK_KEYS),
    notes: text(c2.notes)
  }

  if (Array.isArray(raw.c3?.rows)) {
    const rows = raw.c3.rows
      .filter((row) => row && typeof row === 'object')
      .map((row, index) => createVoiceRow({ ...row, id: text(row.id) || `voice-${index + 1}` }))
    if (rows.length) base.c3.rows = rows
  }

  const c4 = raw.c4 && typeof raw.c4 === 'object' ? raw.c4 : {}
  const outcome = c4.outcome === 'done' || c4.outcome === 'practice' ? c4.outcome : ''
  base.c4 = {
    ...flags(c4, C4_CHECK_KEYS),
    challenge: text(c4.challenge),
    outcome,
    whatHappened: text(c4.whatHappened),
    reflection: text(c4.reflection),
    followUp: text(c4.followUp)
  }

  return base
}

export function loadProgress(storage) {
  try {
    const raw = storage?.getItem?.(STORAGE_KEY)
    if (!raw) return createEmptyProgress()
    return normalizeProgress(JSON.parse(raw))
  } catch {
    return createEmptyProgress()
  }
}

export function saveProgress(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(normalizeProgress(state)))
}

function mark(done, touched) {
  return done ? 'done' : touched ? 'doing' : 'todo'
}

export function artefactProgress(state) {
  const data = normalizeProgress(state)

  const c1Checked = C1_KEYS.filter((key) => data.c1[key]).length
  const c1Done = c1Checked === C1_KEYS.length
  const c1Touched = c1Checked > 0 || Boolean(data.c1.notes.trim())

  const c2Checked = C2_CHECK_KEYS.filter((key) => data.c2[key]).length
  const c2Named = Boolean(data.c2.project.trim() && data.c2.classes.trim())
  const c2Model = Boolean(data.c2.modelId.trim() || data.c2.weightsFile.trim())
  const c2Done = c2Checked === C2_CHECK_KEYS.length && c2Named && c2Model
  const c2Touched = c2Checked > 0 || c2Named || c2Model || Boolean(
    data.c2.workspace.trim() || data.c2.imageCount.trim() || data.c2.confidence.trim() || data.c2.notes.trim()
  )

  const c3Rows = data.c3.rows.filter(filledRow)
  const c3Tested = c3Rows.filter((row) => row.phrase.trim() && row.action.trim() && row.tested).length
  const c3Done = c3Rows.length > 0 && c3Rows.every((row) => row.phrase.trim() && row.action.trim() && row.tested)
  const c3Touched = data.c3.rows.some((row) => row.tested || row.note.trim() || !row.template)

  const c4Checked = C4_CHECK_KEYS.filter((key) => data.c4[key]).length
  const c4Done = c4Checked === C4_CHECK_KEYS.length && Boolean(data.c4.challenge.trim() && data.c4.reflection.trim())
  const c4Touched = c4Checked > 0 || Boolean(
    data.c4.challenge.trim() || data.c4.outcome || data.c4.whatHappened.trim() || data.c4.reflection.trim() || data.c4.followUp.trim()
  )

  const parts = {
    c1: { done: c1Done, touched: c1Touched, checked: c1Checked, total: C1_KEYS.length, status: mark(c1Done, c1Touched) },
    c2: { done: c2Done, touched: c2Touched, checked: c2Checked, total: C2_CHECK_KEYS.length, status: mark(c2Done, c2Touched) },
    c3: { done: c3Done, touched: c3Touched, checked: c3Tested, total: c3Rows.length, status: mark(c3Done, c3Touched) },
    c4: { done: c4Done, touched: c4Touched, checked: c4Checked, total: C4_CHECK_KEYS.length, status: mark(c4Done, c4Touched) }
  }

  return {
    ...parts,
    completedCount: ['c1', 'c2', 'c3', 'c4'].filter((id) => parts[id].done).length
  }
}
