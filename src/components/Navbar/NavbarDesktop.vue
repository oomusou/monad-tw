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

            <!-- internal link -->
            <g-link v-if="isShowInternalLink(navItem)" class="inline-block py-1" :to="navItem.link" :title="navItem.name">
              {{ navItem.name }}
            </g-link>

            <!-- external link -->
            <a v-if="isShowExternalLink(navItem)" class="inline-block py-1" :href="navItem.link" target="_blank" :title="navItem.name">
              {{ navItem.name }}
            </a>

            <!-- More -->
            <client-only>
              <v-popover v-if="isShowMore(navItem)" placement="top" popoverClass="navbar-popover" offset="16">
                <a class="inline-block py-1 cursor-pointer">
                  {{ navItem.name }}
                  <font-awesome :icon="['fas', 'angle-down']"/>
                </a>

                <!-- More submenu -->
                <template slot="popover">
                  <ul>
                    <li v-for="subItem in navItem.children" :key="subItem.name" class="px-4 py-2 submenu-item hover:text-white">
                      <!-- internal link -->
                      <g-link v-if="isShowSubMenuInternalLink(subItem)" class="inline-block" :to="subItem.link" :title="subItem.name">
                        {{ subItem.name }}
                      </g-link>

                      <!-- external link -->
                      <a v-if="isShowSubMenuExternalLink(subItem)" class="inline-block" :href="subItem.link" target="_blank" :title="subItem.name">
                        {{ subItem.name }}
                      </a>
                    </li>
                  </ul>
                </template>
              </v-popover>
            </client-only>
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
          <!-- search -->
          <li class="mr-6">
            <search-button v-on="$listeners"/>
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
import { pipe, prop, path, allPass, not, __, gt, equals } from 'ramda'
import ThemeSwitcher from '@/components/Navbar/ThemeSwitcher'
import SearchButton from '@/components/Navbar/SearchButton'
import SubNavigation from '@/components/Navbar/NavbarSubNavigation'
import vClickOutside from 'v-click-outside'

// isShowInternalLink :: Object -> Boolean
let isShowInternalLink = allPass([
  pipe(prop('external'), not),
  pipe(path(['children', 'length']), equals(0))
])

// isShowExternalLink :: Object -> Boolean
let isShowExternalLink = allPass([
  prop('external'),
  pipe(path(['children', 'length']), equals(0))
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
    isShowInternalLink,
    isShowExternalLink,
    isShowSubMenuInternalLink,
    isShowSubMenuExternalLink,
    isShowMore,
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