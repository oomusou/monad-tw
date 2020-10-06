<template>
  <div class="dark:bg-black">
    <navbar :theme="this.theme" @setTheme="onSetTheme"></navbar>
    <slot></slot>
    <footer></footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Partials/Footer'

let onSetTheme = function(theme) {
  this.theme = theme
}

export default {
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    theme: 'light'
  }),
  methods: {
    onSetTheme
  }
}
</script>