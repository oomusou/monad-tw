<template>
  <nav class="block md:hidden py-4 dark:text-gray-400">
    <div class="flex justify-between items-center mx-4">
      <div class="w-3/12"/>

      <!-- title -->
      <div class="flex-grow text-center text-xl font-semibold tracking-tight">
        {{ title }}
      </div>

      <div class="w-3/12 flex justify-end">
        <ul class="flex">
          <!-- toggle -->
          <li class="mr-3">
            <theme-switcher v-on="$listeners" :theme="theme"/>
          </li>

          <!-- search -->
          <li class="mr-3">
            <search-button v-on="$listeners"/>
          </li>

          <!-- hamburger -->
          <li class="flex items-center">
            <a role="button" @click.prevent="onOpenNavbarModal" aria-label="Open Navigation" title="Open Navigation">
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
