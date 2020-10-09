<template>
  <nav class="block md:hidden flex items-center justify-between flex-wrap container mx-auto py-4 dark:text-gray-400">
    <div class="block flex-grow flex items-center w-auto mx-4">
      <div class="flex items-center flex-shrink-0 mr-6">
        <!-- hamburger -->
        <a role="button" @click.prevent="onOpenNavbarModal" aria-label="Open Navigation" title="Open Navigation">
          <font-awesome :icon="['fas', 'bars']"></font-awesome>
        </a>
      </div>

      <!-- title -->
      <div class="flex-grow text-center font-bold text-lg">
        <span class="font-semibold text-xl tracking-tight">{{ title }}</span>
      </div>

      <div class="inline-block">
        <ul class="list-none flex justify-center md:justify-end">
          <!-- search -->
          <li class="mr-6">
            <search-button v-on="$listeners"></search-button>
          </li>

          <!-- toggle dark mode -->
          <li>
            <theme-switcher v-on="$listeners" :theme="theme"/>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchButton from '@/components/Navbar/SearchButton'
import ThemeSwitcher from '@/components/Navbar/ThemeSwitcher'

let onOpenNavbarModal = function() {
  this.$emit('openNavbarModal')
}

let created = function() {
  this.title = this.$static.metadata.siteName
}

export default {
  components: {
    ThemeSwitcher,
    SearchButton
  },
  props: {
    theme: { default: '' },
  },
  data: () => ({
    title: ''
  }),
  methods: {
    onOpenNavbarModal
  },
  created
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
