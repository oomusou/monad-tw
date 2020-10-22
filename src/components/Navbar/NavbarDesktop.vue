<template>
  <nav class="hidden md:block container mx-auto dark:text-gray-400 py-3">
    <div class="flex items-center mx-4">
      <!-- title -->
      <div class="mr-6">
        <span class="font-semibold text-xl tracking-tight">
          {{ title }}
        </span>
      </div>

      <!-- menu -->
      <div class="flex-grow">
        <ul class="flex">
          <li v-for="navItem in menu" :key="navItem.name" class="px-4 py-1">
            <g-link class="inline-block py-1" :to="navItem.link" :title="navItem.name">
              {{ navItem.name }}
            </g-link>
          </li>

          <!-- ... -->
          <li class="px-4 py-1">
            <a role="button" :class="showBlueText" class="inline-block px-4 py-1" @click.prevent="onToggleSubNavigation" aria-label="Open Subnavigation" title="Open Subnavigation">
              <font-awesome :icon="['fas', 'ellipsis-h']" size="lg"/>
            </a>

            <!-- ... sub-navigation -->
            <div :class="showSubNavigation" class="mega-menu bg-white border-t border-gray-200 shadow-xl mb-16 py-4 dark:bg-black dark:border-gray-900" v-click-outside="onClickOutside">
              <sub-navigation/>
            </div>
          </li>
        </ul>
      </div>

      <!-- search & toggle -->
      <div>
        <ul class="flex">
          <!-- toggle dark mode -->
          <li class="mr-6">
            <theme-switcher v-on="$listeners" :theme="theme"/>
          </li>

          <!-- search -->
          <li>
            <search-button v-on="$listeners"/>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { not, pipe, prop } from 'ramda'
import ThemeSwitcher from '@/components/Navbar/ThemeSwitcher'
import SearchButton from '@/components/Navbar/SearchButton'
import SubNavigation from '@/components/Navbar/NavbarSubNavigation'
import vClickOutside from 'v-click-outside'

let showBlueText = function() {
  return { 'text-blue-600' : this.isShowSubNavigation }
}

let showSubNavigation = function() {
  return { 'hidden' : !this.isShowSubNavigation }
}

let onToggleSubNavigation = function() {
  this.isShowSubNavigation = !this.isShowSubNavigation
}

let onClickOutside = function(event) {
  if (!event.defaultPrevented && this.isShowSubNavigation)
    this.isShowSubNavigation = false
}

let isShowSubNav_ = function() {
  if (!this.isShowSubNav)
    this.isShowSubNavigation = false
}

let route_ = function() {
  this.isShowSubNavigation = false
}

let created = function() {
  this.title = this.$static.metadata.siteName
  this.menu = this.$static.metadata.headerNavigation
}

export default {
  components: {
    ThemeSwitcher,
    SearchButton,
    SubNavigation
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    theme: { default: '' },
    isShowSubNav: { default: false }
  },
  data: () => ({
    title: '',
    menu: [],
    isShowSubNavigation: false,
    vcoConfig: {
      events: ['dblclick', 'click'],
      isActive: true
    }
  }),
  computed: {
    showBlueText,
    showSubNavigation,
  },
  methods: {
    onToggleSubNavigation,
    onClickOutside,
  },
  watch: {
    isShowSubNav: isShowSubNav_,
    $route: route_
  },
  created
}
</script>

<!--@formatter:off-->
<static-query>
query {
  metadata {
    siteName
    headerNavigation {
      name
      link
      external
    }
  }
}
</static-query>
<!--@formatter:on-->