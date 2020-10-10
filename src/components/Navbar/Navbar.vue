<template>
  <div class="h-16">
    <headroom :classes="{'initial': 'headroom bg-white dark:bg-black border-b dark:border-gray-900'}" @pin="onPin" @unpin="onUnPin">
      <navbar-desktop :theme="theme" :isShowSubNav="isNavbarPinned" @openSearchModal="onOpenSearchModal" v-on="$listeners"/>
      <navbar-mobile :theme="theme" @openSearchModal="onOpenSearchModal" @openNavbarModal="onOpenNavbarModal" v-on="$listeners"/>
    </headroom>
    <!-- search modal -->
    <modal :isShowModal="isShowSearchModal" @close="onCloseSearchModal">
      <search-modal></search-modal>
    </modal>

    <!-- hamburger modal -->
    <modal :isShowModal="isShowNavbarModal" @close="onCloseNavbarModal">
      <navbar-modal></navbar-modal>
    </modal>
  </div>
</template>

<script>
import { headroom } from 'vue-headroom'
import NavbarDesktop from '@/components/Navbar/NavbarDesktop'
import NavbarMobile from '@/components/Navbar/NavbarMobile'
import Modal from '@/components/Modal/Modal'
import NavbarModal from '@/components/Modal/NavbarMobileModal'
import SearchModal from '@/components/Modal/SearchModal'

let onUnPin = function() {
  this.isNavbarPinned = false
}

let onPin = function() {
  this.isNavbarPinned = true
}

let onOpenSearchModal = function() {
  this.isShowSearchModal = true
}

let onCloseSearchModal = function() {
  this.isShowSearchModal = false
}

let onOpenNavbarModal = function() {
  this.isShowNavbarModal = true
}

let onCloseNavbarModal = function() {
  this.isShowNavbarModal = false
}

let route_ = function() {
  this.isShowNavbarModal = false
  this.isShowSearchModal = false
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
  props: {
    theme: { default: '' }
  },
  data: () => ({
    headerHeight: 100,
    isShowSearchModal: false,
    isShowNavbarModal: false,
    isNavbarPinned: true
  }),
  methods: {
    onUnPin,
    onPin,
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