<template>
  <div>
    <Search @addBook="addNewBook" :genres="genres"/>
    <List :books="books"/>
  </div>
</template>

<script>
import Search from '@/components/Search'
import List from '@/components/List'

export default {
  components: {
    Search,
    List
  },
  data () {
    return {
      books: [
        {
          id: '1',
          title: 'test_title',
          genre: 'test_genre',
          boughtAt: '2023-01-02',
          buyer: 'test_buyer',
          review: 'test'
        },
        {
          id: '2',
          title: 'テストタイトル',
          genre: 'テストジャンル',
          boughtAt: '2022-02-22',
          buyer: 'テスト購入者',
          review: 'テスト'
        }
      ],
      genres: ['test_genre', 'テストジャンル']
    }
  },
  created () {},
  computed: {},
  methods: {
    maxIdSearch (books) {
      return Math.max.apply(null, books.map((book) => book.id))
    },
    addNewBook (book) {
      const maxId = this.maxIdSearch(this.books)
      book.id = maxId + 1

      return new Promise(function (resolve, reject) {
        window.google.script.run
          .withSuccessHandler(function (result) {
            resolve(result)
          })
          .withFailureHandler(function (error) {
            reject(error)
          })
          .updateBooksTable(book)
      })
    }
  }
}
</script>
