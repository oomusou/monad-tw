<template>
  <nav class="block md:hidden py-4 dark:text-gray-400">
    <div class="flex items-center mx-4">
      <!-- hamburger -->
      <div class="flex items-center mr-6">
        <a role="button" @click.prevent="onOpenNavbarModal" aria-label="Open Navigation" title="Open Navigation">
          <font-awesome :icon="['fas', 'bars']"/>
        </a>
      </div>

      <!-- title -->
      <div class="flex-grow text-center text-xl font-semibold tracking-tight">
        {{ title }}
      </div>

      <div>
        <ul class="flex">
          <!-- search -->
          <li class="mr-6">
            <search-button v-on="$listeners"/>
          </li>

          <!-- toggle -->
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

<!--@formatter:off-->
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<!--@formatter:on-->
