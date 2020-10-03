<template>
  <div class="h-16 dark:bg-black bg-white">
    <headroom :classes="{'initial' : 'headroom bg-white dark:bg-black border-b dark:border-gray-900'}" :downTolerance="10" :upTolerance="20" :offset="15" @unpin="navbarUnpinned=true" @pin="navbarUnpinned=false">
      <navbar-desktop
        v-on="$listeners" 
        @openSearchModal="openSearchModal"
        :theme="theme"
        :hideSubnav="this.navbarUnpinned"
      />

      <navbar-mobile
        @openSearchModal="openSearchModal"
        @openNavbarModal="openNavbarModal"
        v-on="$listeners"
        :theme="theme"
      />


    </headroom>

    <modal :showModal="this.showSearchModal" @close="closeSearchModal">
      <search-modal></search-modal>
    </modal>

    <modal :showModal="this.showNavbarModal" @close="closeNavbarModal">
      <navbar-modal></navbar-modal>
    </modal>
  </div>
</template>

<script>
import NavbarDesktop from '@/components/Navbar/NavbarDesktop'
import NavbarMobile from '@/components/Navbar/NavbarMobile'
import Modal from '@/components/Modal/Modal'
import SearchModal from '@/components/Modal/SearchModal'
import NavbarModal from '@/components/Modal/NavbarMobileModal'
import { headroom } from 'vue-headroom'

let openSearchModal = function() {
  this.showSearchModal = true
}

let closeSearchModal = function() {
  this.showSearchModal = false
}

let openNavbarModal = function() {
  this.showNavbarModal = true
}

let closeNavbarModal = function() {
  this.showNavbarModal = false
}

let watchRoute = function() {
  this.closeNavbarModal()
  this.closeSearchModal()
}

export default {
  props: {
    theme : {
      type: String
    }
  },
  data: () => ({
    showSearchModal: false,
    showNavbarModal: false,
    headerHeight: 100,
    navbarUnpinned: false
  }),
  components: {
    NavbarDesktop,
    NavbarMobile,
    Modal,
    SearchModal,
    NavbarModal,
    headroom
  },
  methods: {
    openSearchModal,
    closeSearchModal,
    openNavbarModal,
    closeNavbarModal
  },
  watch:{
    $route: watchRoute
  } 
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
