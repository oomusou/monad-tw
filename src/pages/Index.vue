<template>
  <navigation-link>
    <div class="container mx-auto">
      <transition-group name="fade" class="flex flex-wrap my-4" tag="div">
        <featured-card v-if="isShowFeaturedCard" key="featured-card" :records="features"/>
        <card-item v-for="{ node } of latests" :key="node.id" :record="node" />
      </transition-group>
      <client-only>
        <infinite-loading @infinite="onInfinite" spinner="bubbles">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </client-only>
    </div>
  </navigation-link>
</template>

<script>
import { pipe, andThen as then, path } from 'ramda'
import { fetch } from 'gridsome'
import InfiniteLoading from 'vue-infinite-loading'
import NavigationLink from '@/layouts/NavigationLink'
import CardItem from '@/components/Content/CardItem'
import FeaturedCard from '@/components/Content/FeaturedCard'

let isShowFeaturedCard = function() {
  return this.$page.featured.totalCount > 0
}

let onInfinite = function($state) {
  if (this.currentPage + 1 > this.$page.entries.pageInfo.totalPages) {
    $state.complete()
    return
  }

  let sideEffect = x => {
    if (x.edges.length === 0) {
      $state.complete()
      return
    }

    this.currentPage = x.pageInfo.currentPage
    this.latests.push(...x.edges)
    $state.loaded()
  }

  pipe(
    fetch,
    then(path(['data', 'entries'])),
    then(sideEffect)
  )(`/${this.currentPage + 1}`)
}

let created = function() {
  this.title = this.$static.metadata.siteName
  this.sub = this.$static.metadata.siteDescription
  this.features = this.$page.featured.edges
  this.latests = this.$page.entries.edges
}

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    InfiniteLoading,
    NavigationLink,
    CardItem,
    FeaturedCard,
  },
  data: () => ({
    title: '',
    sub: '',
    features: [],
    latests: [],
    currentPage: 1
  }),
  computed: {
    isShowFeaturedCard
  },
  methods: {
    onInfinite
  },
  created,
}
</script>

<page-query>
query($page: Int) {
  featured: allBlog(limit: 4, filter: { featured: { eq: true } }, sortBy:"created") {
    totalCount
    edges {
      node {
        id
        title
        image(width: 800)
        path
        timeToRead
        humanTime: created(format: "DD MMM YYYY")
        datetime: created
        category {
          id
          title
          path
        }
        author {
          id
          name
          image(width: 64, height: 64, fit: inside)
          path
        }
      }
    }
  }
  entries: allBlog(perPage: 6, page: $page, sortBy:"created") @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        image(width: 800)
        path
        timeToRead
        featured
        humanTime: created(format: "DD MMM YYYY")
        datetime: created
        category {
          id
          title
          path
        }
        author {
          id
          name
          image(width: 64, height: 64, fit: inside)
          path
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: ease opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>