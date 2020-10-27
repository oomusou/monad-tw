<template>
  <nav class="block md:hidden py-4 dark:text-gray-400">
    <div class="flex justify-between items-center mx-4">
      <!-- toggle -->
      <div class="w-3/12 flex justify-start">
        <theme-switcher class="py-1 px-2" v-on="$listeners" :theme="theme"/>
      </div>

      <!-- title -->
      <div class="flex-grow text-center text-xl font-semibold tracking-tight">
        <g-link to="/">{{ title }}</g-link>
      </div>

      <div class="w-3/12 flex justify-end">
        <ul class="flex">
          <!-- search -->
          <li class="mr-8">
            <search-button class="py-1 px-2" v-on="$listeners"/>
          </li>

          <!-- hamburger -->
          <li>
            <a class="py-1 px-2" role="button" @click.prevent="onOpenNavbarModal" aria-label="Open Navigation" title="Open Navigation">
              <font-awesome :icon="['fas', 'bars']"/>
            </a>
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
