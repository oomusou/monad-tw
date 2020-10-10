<template>
  <nav class="hidden md:block lg:block xl:block flex items-center justify-between flex-wrap container mx-auto py-3 z-20 dark:text-gray-400">
    <div class="block flex-grow flex items-center w-auto mx-4">
      <div class="flex items-center flex-shrink-0 mr-6">
        <span class="font-semibold text-xl tracking-tight">{{ title }}</span>
      </div>
      <div class="flex-grow">
        <ul class="list-none flex justify-left">
          <!-- menu -->
          <li v-for="navItem in menu" :key="navItem.name" class="px-4 py-1">

            <!-- internal link -->
            <g-link v-if="isShowInternalLink(navItem)" class="block py-1" :to="navItem.link" :title="navItem.name">
              {{ navItem.name }}
            </g-link>

            <!-- external link -->
            <a v-if="isShowExternalLink(navItem)" class="block" :href="navItem.link" target="_blank" :title="navItem.name">{{ navItem.name }}</a>

            <!-- More -->
            <client-only>
              <v-popover v-if="isShowMore(navItem)" placement="top" popoverClass="navbar-popover" offset="16">
                <a class="block py-1 cursor-pointer">{{ navItem.name }}
                  <font-awesome :icon="['fas', 'angle-down']"></font-awesome>
                </a>

                <!-- More submenu -->
                <template slot="popover">
                  <ul>
                    <li v-for="subItem in navItem.children" :key="subItem.name" class="px-4 py-2 submenu-item hover:text-white">
                      <!-- internal link -->
                      <g-link v-if="isShowSubMenuInternalLink(subItem)" class="block" :to="subItem.link" :title="subItem.name">
                        {{ subItem.name }}
                      </g-link>

                      <!-- external link -->
                      <a v-if="isShowSubMenuExternalLink(subItem)" class="block" :href="subItem.link" target="_blank" :title="subItem.name">{{ subItem.name }}</a>
                    </li>
                  </ul>
                </template>
              </v-popover>
            </client-only>
          </li>

          <!-- ... -->
          <li class="px-4 py-1">
            <a role="button" :class="showBlueText()" class="block px-4 py-1" @click.prevent="onToggleSubNavigation" aria-label="Open Subnavigation" title="Open Subnavigation">
              <font-awesome :icon="['fas', 'ellipsis-h']" size="lg"></font-awesome>
            </a>

            <!-- ... 下拉選單-->
            <div :class="showSubNavigation()" class="py-4 mega-menu mb-16 border-t border-gray-200 shadow-xl bg-white dark:bg-black dark:border-gray-900" v-click-outside="onClickOutside">
              <sub-navigation></sub-navigation>
            </div>
          </li>
        </ul>
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
import { pipe, prop, path, allPass, not, __, gt } from 'ramda'
import ThemeSwitcher from '@/components/Navbar/ThemeSwitcher'
import SearchButton from '@/components/Navbar/SearchButton'
import SubNavigation from '@/components/Navbar/NavbarSubNavigation'
import vClickOutside from 'v-click-outside'

// isShowInternalLink :: Object -> Boolean
let isShowInternalLink = allPass([
  pipe(prop('external'), not),
  pipe(path(['children', 'length']), not)
])

// isShowExternalLink :: Object -> Boolean
let isShowExternalLink = allPass([
  prop('external'),
  pipe(path(['children', 'length']), not)
])

// isShowSubMenuInternalLink :: Object -> Boolean
let isShowSubMenuInternalLink = pipe(
  prop('external'),
  not
)

// isShowSubMenuExternalLink :: Object -> Boolean
let isShowSubMenuExternalLink = prop('external')

// isShowMore :: Object -> Boolean
let isShowMore = pipe(
  path(['children', 'length']),
  gt(__, 0)
)

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
    this.isShowSubNavigation = !this.isShowSubNavigation
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
  data: () => ({
    title: '',
    menu: [],
    isShowSubNavigation: false,
    vcoConfig: {
      events: ['dblclick', 'click'],
      isActive: true
    }
  }),
  props: {
    theme: { default: '' },
    isShowSubNav: { default: false }
  },
  methods: {
    isShowInternalLink,
    isShowExternalLink,
    isShowSubMenuInternalLink,
    isShowSubMenuExternalLink,
    isShowMore,
    showBlueText,
    showSubNavigation,
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
      children {
        name
        link
        external
      }
    }
  }
}
</static-query>
<!--@formatter:on-->