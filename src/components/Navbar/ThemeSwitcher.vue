<template>
  <a role="button" @click.prevent="toggleTheme()" :aria-label="'Toggle ' + nextTheme" :title="'Toggle ' + nextTheme" class="toggle-theme">
    <font-awesome :icon="['fas', 'sun']" v-if="theme === 'dark'"/>
    <font-awesome :icon="['fas', 'moon']" v-if="theme === 'light'"/>
  </a>
</template>

<script>
let themes = ['light', 'dark']

let nextTheme = function() {
  let currentIndex = themes.indexOf(this.theme)
  let nextIndex = (currentIndex + 1) % themes.length
  return themes[nextIndex]
}

let toggleTheme = function() {
  const currentIndex = themes.indexOf(this.theme)
  const nextIndex = (currentIndex + 1) % themes.length
  window.__setPreferredTheme(themes[nextIndex])

  this.$emit('setTheme', themes[nextIndex])
}

let mounted = function() {
  // set default
  if (typeof window.__theme !== 'undefined')
    this.$emit('setTheme', window.__theme)
}

export default {
  props: {
    theme: { default: '' }
  },
  computed: {
    nextTheme
  },
  methods: {
    toggleTheme
  },
  mounted
}
</script>