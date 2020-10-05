<template>
  <navigation-link>
    <content-header :title="$static.metadata.siteName" :sub="$static.metadata.siteDescription" image="phoenix-han-Nqdh0G8rdCc-unsplash.jpg"></content-header>
    <div class="container mx-auto">
      <transition-group name="fade" class="flex flex-wrap my-4" tag="div">
        <FeaturedCard key="featured_post" v-if="$page.featured.totalCount>0" :records="$page.featured.edges"/>
        <CardItem v-for="{ node } of loadedPosts" :key="node.id" :record="node" />
      </transition-group>
      <ClientOnly>
        <infinite-loading @infinite="onInfinite" spinner="bubbles">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </ClientOnly>
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
import ContentHeader from '@/components/Partials/ContentHeader'

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
    this.loadedPosts.push(...x.edges)
    $state.loaded()
  }

  pipe(
    fetch,
    then(path(['data', 'entries'])),
    then(sideEffect)
  )(`/infinity/${this.currentPage + 1}`)
}

let created = function() {
  this.loadedPosts = this.$page.entries.edges
}

export default {
  metaInfo: {
    title: 'Hello World!'
  },
  components: {
    InfiniteLoading,
    NavigationLink,
    CardItem,
    FeaturedCard,
    ContentHeader
  },
  data: () => ({
    loadedPosts: [],
    currentPage: 1
  }),
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