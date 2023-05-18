<template>
  <div>
    <Search @openAddDialog="openAddDialog" :genres="genres"/>
    <List :books="books"/>
    <v-dialog
      v-model="addBookDialog"
      width="550"
    >
      <Add @addBook="addNewBook"/>
    </v-dialog>
    <v-overlay
      :value="addOverlay"
      :z-index="zIndex"
    >
      <Overlay :ovlText="ovlText"/>
    </v-overlay>
  </div>
</template>

<script>
import Search from '@/components/Search'
import List from '@/components/List'
import Add from '@/components/Add'
import Overlay from '@/components/Overlay'

export default {
  components: {
    Search,
    List,
    Add,
    Overlay
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
      genres: ['test_genre', 'テストジャンル'],
      addBookDialog: false,
      addOverlay: false,
      ovlText: '',
      zIndex: 300
    }
  },
  created () {},
  computed: {},
  methods: {
    openAddDialog () {
      this.addBookDialog = true
    },
    maxIdSearch (books) {
      return Math.max.apply(null, books.map((book) => book.id))
    },
    async addNewBook (book) {
      try {
        this.ovlText = '書籍情報を登録中'
        this.addOverlay = true
        const maxId = this.maxIdSearch(this.books)
        this.$set(book, 'id', maxId + 1)
        await this.saveOnDatabase(book)
      } catch {
        this.onRejected()
      } finally {
        this.$set(book, 'id', 0)
        this.$set(book, 'title', '')
        this.$set(book, 'genre', '')
        this.$set(book, 'boughtAt', (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
        this.$set(book, 'buyer', '')
        this.$set(book, 'review', '')
        this.addOverlay = false
        this.addBookDialog = false
      }
    },
    async saveOnDatabase (book) {
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
    },
    onRejected () {
      alert('エラーが発生しました。')
    }
  }
}
</script>
