<template>
  <div>
    <Search @openAddDialog="openAddDialog" :genres="genres"/>
    <List @openEditDialog="openEditDialog" :books="books"/>
    <v-dialog
      v-model="addBookDialog"
      width="550"
    >
      <Form @addBook="addNewBook" formType="add"/>
     </v-dialog>
    <v-dialog
      v-model="editBookDialog"
      width="550"
    >
      <Form @editBook="editBook" formType="edit" :book="this.book"/>
    </v-dialog>
    <v-overlay
      :value="overlay"
      :z-index="300"
    >
      <Overlay :ovlText="ovlText"/>
    </v-overlay>
  </div>
</template>

<script>
import Search from '@/components/Search'
import List from '@/components/List'
import Form from '@/components/Form'
import Overlay from '@/components/Overlay'
import { getToday, changeDateFormat } from '@/components/ExternalFunc'

export default {
  components: {
    Search,
    List,
    Form,
    Overlay
  },
  data () {
    return {
      books: [],
      book: {},
      genres: ['test_genre', 'テストジャンル'],
      addBookDialog: false,
      editBookDialog: false,
      overlay: false,
      ovlText: ''
    }
  },
  async created () {
    try {
      this.overlay = true
      this.ovlText = '書籍情報を取得中'
      this.books = await this.getBooksFromDatabase()
      //* 日付のフォーマット変更 *//
      //* YYYY-MM-DD hh:mm:ss ⇒ YYYY-MM-DD *//
      this.books.forEach(book => {
        this.$set(book, 'boughtAt', changeDateFormat(book.boughtAt))
      })
    } catch {
      this.onRejected()
    } finally {
      this.overlay = false
    }
  },
  computed: {},
  methods: {
    openAddDialog () {
      this.addBookDialog = true
    },
    openEditDialog (item) {
      this.book = item
      this.editBookDialog = true
    },
    maxIdSearch (books) {
      return Math.max.apply(null, books.map((book) => book.id))
    },
    async addNewBook (book) {
      try {
        this.ovlText = '書籍情報を登録中'
        this.overlay = true
        const maxId = this.maxIdSearch(this.books)
        this.$set(book, 'id', maxId + 1)
        await this.saveOnDatabase(book)
      } catch {
        this.onRejected()
      } finally {
        this.$set(book, 'id', 0)
        this.$set(book, 'title', '')
        this.$set(book, 'genre', '')
        this.$set(book, 'boughtAt', getToday())
        this.$set(book, 'buyer', '')
        this.$set(book, 'review', '')
        this.overlay = false
        this.addBookDialog = false
      }
    },
    editBook () {
      // まだ未実装
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
    async getBooksFromDatabase () {
      return new Promise(function (resolve, reject) {
        window.google.script.run
          .withSuccessHandler(function (result) {
            resolve(result)
          })
          .withFailureHandler(function (error) {
            reject(error)
          })
          .getBooks()
      })
    },
    onRejected () {
      alert('エラーが発生しました。')
    }
  }
}
</script>
