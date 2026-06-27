import { ref, watch } from 'vue'

const STORAGE_KEY = 'neon-ui-theme'

// shared singleton state across all components
function getInitial() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // default to dark theme
  return 'dark'
}

const theme = ref(getInitial())

function apply(value) {
  document.documentElement.setAttribute('data-theme', value)
}

// apply immediately and on every change
apply(theme.value)
watch(theme, (val) => {
  apply(val)
  localStorage.setItem(STORAGE_KEY, val)
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
