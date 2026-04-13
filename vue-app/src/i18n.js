import { ref } from 'vue'

const STORAGE_KEY = 'erc-language'
const defaultLanguage = 'zh'
const initialLanguage = localStorage.getItem(STORAGE_KEY) || defaultLanguage

export const language = ref(initialLanguage === 'en' ? 'en' : defaultLanguage)

export function setLanguage(nextLanguage) {
  language.value = nextLanguage === 'en' ? 'en' : defaultLanguage
  localStorage.setItem(STORAGE_KEY, language.value)
}

export function getText(value) {
  if (value && typeof value === 'object') {
    return value[language.value] ?? value.zh ?? value.en ?? ''
  }
  return value ?? ''
}
