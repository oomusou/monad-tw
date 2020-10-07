<template>
  <div class="h-16 dark:bg-black bg-white">
    <headroom :classes="{'initial' : 'headroom bg-white dark:bg-black border-b dark:border-gray-900'}" :downTolerance="10" :upTolerance="20" :offset="15" @unpin="navbarUnpinned=true" @pin="navbarUnpinned=false">
      <navbar-desktop v-on="$listeners" :theme="theme" :hideSubnav="this.navbarUnpinned" @openSearchModal="onOpenSearchModal"/>
      <navbar-mobile v-on="$listeners" :theme="theme" @openSearchModal="onOpenSearchModal" @openNavbarModal="onOpenNavbarModal"/>
    </headroom>
    <modal :showModal="this.showSearchModal" @close="onCloseSearchModal">
      <search-modal></search-modal>
    </modal>
    <modal :showModal="this.showNavbarModal" @close="onCloseNavbarModal">
      <navbar-modal></navbar-modal>
    </modal>
  </div>
</template>

<script>
import { headroom } from 'vue-headroom'
import NavbarDesktop from '@/components/Navbar/NavbarDesktop'
import NavbarMobile from '@/components/Navbar/NavbarMobile'
import Modal from '@/components/Modal/Modal'
import SearchModal from '@/components/Modal/SearchModal'
import NavbarModal from '@/components/Modal/NavbarMobileModal'

let onOpenSearchModal = function() {
  this.showSearchModal = true
}

let onCloseSearchModal = function() {
  this.showSearchModal = false
}

let onOpenNavbarModal = function() {
  this.showNavbarModal = true
}

let onCloseNavbarModal = function() {
  this.showNavbarModal = false
}

let route_ = function() {
  this.showNavbarModal = false
  this.showSearchModal = false
}

export default {
  components: {
    NavbarDesktop,
    NavbarMobile,
    Modal,
    SearchModal,
    NavbarModal,
    headroom
  },
  props: [
    'theme'
  ],
  data: () => ({
    showSearchModal: false,
    showNavbarModal: false,
    headerHeight: 100,
    navbarUnpinned: false
  }),
  methods: {
    onOpenSearchModal,
    onCloseSearchModal,
    onOpenNavbarModal,
    onCloseNavbarModal
  },
  watch: {
    $route: route_
  } 
}
</script>