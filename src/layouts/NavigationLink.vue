<template>
  <div class="dark:bg-black">
    <navbar :theme="this.theme" @setTheme="onSetTheme"></navbar>
    <slot></slot>
    <content-footer></content-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import ContentFooter from '@/components/Partials/ContentFooter'

let onSetTheme = function(theme) {
  this.theme = theme
}

export default {
  components: {
    Navbar,
    ContentFooter
  },
  data: () => ({
    theme: 'light'
  }),
  methods: {
    onSetTheme
  }
}
</script>