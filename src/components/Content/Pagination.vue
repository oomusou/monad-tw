<template>
  <ul class="flex pl-0 list-none rounded my-2">

    <li v-if="!isFirstPage(currentPage, totalPages)">
      <g-link :to="previousPage(currentPage,totalPages)" class="w-10 relative block py-2 text-center dark:text-gray-400 dark:border-gray-800 dark-hover:bg-gray-700 dark:bg-gray-800 leading-tight bg-white border border-gray-300 text-black ml-1 rounded-full hover:bg-gray-300 focus:outline-none" tabindex="-1" >
        <font-awesome :icon="['fas', 'arrow-left']"></font-awesome>
      </g-link>
    </li>

    <li class="self-center mx-4 dark:text-gray-400 ">
        Page {{ currentPage }} of {{ totalPages }} 
    </li>

    <li v-if="!isLastPage(currentPage, totalPages)">
      <g-link :to="nextPage(currentPage,totalPages)" class="w-10 relative block py-2 text-center dark:text-gray-400 dark:border-gray-800 dark-hover:bg-gray-700 dark:bg-gray-800 leading-tight bg-white border border-gray-300 text-black ml-1 rounded-full hover:bg-gray-300 focus:outline-none" tabindex="-1" >
        <font-awesome :icon="['fas', 'arrow-right']"></font-awesome>
      </g-link>
    </li>
  </ul>
</template>

<script>
let startPage = function() {
  if (this.currentPage === 1) return 1
  if (this.currentPage === this.totalPages) return this.currentPage - 1

  return this.currentPage - 1
}

let pages = function() {
  let range = []

  for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i += 1) {
    range.push({ name: i, isDisabled: i === this.currentPage, link: i === 1 ? `${this.baseUrl}/` : `${this.baseUrl}/${i}` })
  }

  return range
}

let isFirstPage = function(currentPage) {
  return currentPage === 1
}

let isLastPage = function(currentPage, totalPages) {
  return currentPage === totalPages
}

let nextPage = function(currentPage) {
  return `${this.baseUrl}/${currentPage + 1}`
}

let previousPage = function(currentPage) {
  return currentPage === 2 ? `${this.baseUrl}/` : `${this.baseUrl}/${currentPage - 1}`;
}

export default {
  props: {
    baseUrl: String,
    currentPage: Number,
    totalPages: Number,
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    }
  },
  computed: {
    startPage,
    pages
  },
  methods: {
    isFirstPage,
    isLastPage,
    nextPage,
    previousPage
  },
}
</script>