let { pipe, split, drop, join } = require('ramda')

let resolve = dir => require('path').join(__dirname, dir);

module.exports = {
  siteName: '點燈坊',
  plugins:  [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
          whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/, /vueperslide$/, /vueperslide-$/]
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    },
    {
      // 以 GraphQL 讀取 Markdown
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    },
    {
      // 以 GraphQL 讀取 Markdown
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    },
    {
      // 以 GraphQL 讀取 Markdown
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'CustomPage',
        path: './content/pages/*.md'
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title', 'content'],
        collections: [{
          typeName: 'Blog',
          indexName: 'Blog',
          fields: ['title', 'category', 'excerpt', 'content']
        }]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        'remark-autolink-headings',
        'remark-attr',
        ['gridsome-plugin-remark-prismjs-all', {
          noInlineHighlight: false,
          showLineNumbers: false,
        }],
        require('./packages/gridsome-plugin-remark-figure')
      ],
      
      processImages: false
      
    }
  },
  templates: {
    Blog: [{
      // path: '/posts/:title'
      path: node => {
        let { fileInfo: { directory, name }} = node

        let path = pipe(
          split('/'),
          drop(2),
          join('/')
        )(directory)

        return `/${path}/${name}`
      }
    }],
    CustomPage: [{
      path: '/:title',
      component: '~/templates/CustomPage.vue'
    }],
    Category: [{
      path: '/category/:title',
      component: '~/templates/Category.vue'
    }],
    Author: [{
      path: '/author/:name',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title',
      component: '~/templates/Tag.vue'
    }]
  },
  chainWebpack: config => {
      config.resolve.alias.set('@pageImage', '@/assets/images');
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}