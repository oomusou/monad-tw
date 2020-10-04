<template>
  <navigation-link>
    <content-header :title="$static.metadata.siteName" :sub="$static.metadata.siteDescription" image="phoenix-han-Nqdh0G8rdCc-unsplash.jpg"></content-header>
    <div class="container mx-auto">
      <div class="flex flex-wrap my-4">
        <FeaturedCard v-if="isShowFeaturedCard" :records="$page.featured.edges"/>
        <CardItem v-for="edge in $page.entries.edges" :key="edge.node.id" :record="edge.node"/>
      </div>
    </div>
  </navigation-link>
</template>

<script>
import NavigationLink from '@/layouts/NavigationLink'
import ContentHeader from '@/components/Partials/ContentHeader'
import FeaturedCard from '@/components/Content/FeaturedCard'
import CardItem from '@/components/Content/CardItem'

let isShowFeaturedCard = function() {
  let { totalCount } = this.$page.featured
  return totalCount > 0
}

export default {
  metaInfo: {
    title: 'Hello World!'
  },
  components: {
    NavigationLink,
    CardItem,
    FeaturedCard,
    ContentHeader
  },
  computed: {
    isShowFeaturedCard
  }
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
  entries: allBlog(perPage: 24, page: $page, sortBy:"created") @paginate {
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