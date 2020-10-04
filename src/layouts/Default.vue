<template>
  <div id="app" class="dark:bg-black">
    <navbar @setTheme="setTheme" :theme="this.theme"></navbar>
    <slot />
    <v-footer></v-footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Navbar from '@/components/Navbar/Navbar'
import VFooter from '@/components/Partials/Footer'

let setTheme = function(mode) {
  this.theme = mode
}

export default {
  data: () => ({
    theme: 'light'
  }),
  components: {
    Navbar,
    VFooter
  },
  methods: {
    setTheme
  }
}
</script>