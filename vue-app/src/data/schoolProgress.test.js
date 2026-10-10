import assert from 'node:assert/strict'
import test from 'node:test'
import {
  artefactProgress,
  createEmptyProgress,
  loadProgress,
  normalizeProgress
} from './schoolProgress.js'

test('a new class has no completed artefacts', () => {
  const progress = artefactProgress(createEmptyProgress())
  assert.equal(progress.completedCount, 0)
  assert.equal(progress.c1.status, 'todo')
  assert.equal(progress.c3.status, 'todo')
  assert.equal(progress.c3.total, 3)
  assert.equal(progress.c3.checked, 0)
})

test('C1 is complete only when every connection check is ticked', () => {
  const state = createEmptyProgress()
  state.c1.wifi = true
  state.c1.forward = true
  assert.equal(artefactProgress(state).c1.status, 'doing')

  for (const key of Object.keys(state.c1)) {
    if (key !== 'notes') state.c1[key] = true
  }
  const done = artefactProgress(state)
  assert.equal(done.c1.done, true)
  assert.equal(done.c1.checked, 8)
})

test('C2 needs the Roboflow record as well as the checks', () => {
  const state = createEmptyProgress()
  state.c2.labeled = true
  state.c2.trained = true
  state.c2.loaded = true
  state.c2.mapped = true
  state.c2.verified = true
  assert.equal(artefactProgress(state).c2.done, false)

  state.c2.project = 'erc-signs'
  state.c2.classes = 'stop_sign, go_sign'
  state.c2.modelId = 'erc/erc-signs/1'
  assert.equal(artefactProgress(state).c2.done, true)
})

test('C3 is complete when every filled voice row is tested', () => {
  const state = createEmptyProgress()
  state.c3.rows[0].tested = true
  assert.equal(artefactProgress(state).c3.done, false)

  for (const row of state.c3.rows) row.tested = true
  state.c3.rows.push({ id: 'blank', phrase: '', action: '', tested: false, note: '' })
  const done = artefactProgress(state)
  assert.equal(done.c3.done, true)
  assert.equal(done.c3.total, 3)
})

test('C4 needs the safety checks plus challenge and reflection', () => {
  const state = createEmptyProgress()
  state.c4.demoEstop = true
  state.c4.blockedDrive = true
  state.c4.clearStaysStill = true
  state.c4.overrideExplained = true
  state.c4.challenge = '學生在偵測到 stop_sign 前先按緊急停止'
  assert.equal(artefactProgress(state).c4.done, false)
  state.c4.reflection = '同學明白解除緊急停止不會自動再開車'
  assert.equal(artefactProgress(state).c4.done, true)
  assert.equal(artefactProgress(state).completedCount, 1)
})

test('saved records drop unknown fields and keep voice rows', () => {
  const normalized = normalizeProgress({
    school: '德安小學',
    c2: { project: 'signs', extra: 'ignore' },
    c3: { rows: [{ phrase: '停', action: 'erc.stop()', tested: true }] },
    c4: { outcome: 'nope' }
  })
  assert.equal(normalized.school, '德安小學')
  assert.equal(normalized.c2.project, 'signs')
  assert.equal(normalized.c2.extra, undefined)
  assert.equal(normalized.c3.rows.length, 1)
  assert.equal(normalized.c3.rows[0].tested, true)
  assert.equal(normalized.c4.outcome, '')
  assert.equal(normalized.c1.wifi, false)
})

test('a numeric image count survives save and reload', () => {
  const normalized = normalizeProgress({ c2: { imageCount: 24, confidence: 0.5 } })
  assert.equal(normalized.c2.imageCount, '24')
  assert.equal(normalized.c2.confidence, '0.5')
})

test('broken browser storage falls back to an empty record', () => {
  const storage = { getItem: () => '{not json' }
  const loaded = loadProgress(storage)
  assert.equal(loaded.school, '')
  assert.equal(loaded.c3.rows.length, 3)
})
