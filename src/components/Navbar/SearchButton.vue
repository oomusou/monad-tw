<template>
  <a role="button" @click.prevent="openSearchModal()" aria-label="Open Search" title="Open Search">
    <font-awesome :icon="['fas', 'search']"></font-awesome>
  </a>
</template>

<script>
let openSearchModal = function() {
  this.$emit('openSearchModal')
}

export default {
  methods: {
    openSearchModal
  }
}
</script>