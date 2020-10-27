<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap md:mb-4 md:mx-4">
      <div class="w-full mb-8">
        <ul class="flex flex-wrap mt-2">
          <li class="text-xs bg-transparent hover:text-blue-700 py-2 px-4 mr-4 mb-4 border hover:border-blue-500 border-gray-600 text-gray-700 dark:text-gray-400 rounded-full" v-for="tag in $static.tags.edges" :key="tag.node.id">
            <g-link :to="tag.node.path">{{ tag.node.title }}</g-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!--@formatter:off-->
<static-query>
query {
  tags: allTag {
    edges {
      node {
        title
        path
      }
    }
  },
  recent : allBlog(limit: 4, sort: { by: "created", order: DESC }) {
    edges {
      node {
        id
        title
        path
        image(width:230, height:130)
        humanTime: created(format: "DD MMM YYYY")
        datetime: created
        timeToRead
      }
    }
  }
}
</static-query>
<!--@formatter:on-->