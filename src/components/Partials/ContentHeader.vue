<template>
  <div>
    <!-- no image, only title & sub -->
    <div v-if="!hasImage" class="z-100 text-center bg-gray-200 dark:bg-gray-900 py-10 md:py-20" >
      <h2 v-if="hasTitle" class="h1 font-extrabold dark:text-gray-400">{{ title }}</h2>
      <p v-if="hasSub" class="text-gray-600 text-light font-sans">{{ sub }}</p>
    </div>

    <!-- with image,title & sub -->
    <div v-if="hasImage" class="z-100 relative mt-0 h-auto">
      <!-- static image -->
      <g-image v-if="hasImage && staticImage" :src="require(`!!assets-loader!@pageImage/${image}`)" width="1400" height="400" class="object-cover absolute -z-10 h-full w-full"></g-image>

      <!-- dynamic image -->
      <g-image v-if="hasImage && !staticImage" :src="image" width="1400" height="400" class="object-cover absolute -z-10 h-full w-full"></g-image>

      <!--  default slot -->
      <slot>
        <div class="text-center text-white bg-gray-800 lg:py-48 md:py-32 py-24" :class='`bg-opacity-${opacity}`'>
          <h2 v-if="hasTitle" class="h1 font-extrabold">{{ title }}</h2>
          <p v-if="hasSub" class="h5 font-sans">{{ sub }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
let hasTitle = function() {
  return !!this.title
}

let hasSub = function() {
  return !!this.sub
}

let hasImage = function() {
  return !!this.image
}

export default {
  props: {
    title: { default: '' },
    sub: { default: '' },
    image: { default: '' },
    staticImage: { default: true },
    opacity: { default: 50 }
  },
  computed: {
    hasTitle,
    hasSub,
    hasImage
  }
}
</script>