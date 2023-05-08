<template>
  <v-dialog
    v-model="addBook"
    width="550"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        新規登録
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 primary dark grey--text text--lighten-5">
        書籍情報の登録
      </v-card-title>

      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="11"
              class="pa-0 ma-1"
            >
              <v-text-field
                label="タイトル"
                v-model="book.title"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="11"
              class="pa-0 ma-1"
            >
              <v-text-field
                label="ジャンル"
                v-model="book.genre"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="11"
              class="pa-0 ma-1"
            >
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="book.boughtAt"
                    label="購入日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="book.boughtAt"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="11"
              class="pa-0 ma-1"
            >
              <v-text-field
                label="購入者"
                v-model="book.buyer"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="11"
              class="pa-0 ma-1"
            >
              <v-textarea
                name="review"
                label="レビュー"
                v-model="book.review"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="addNewBook"
        >
          登録
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="addOverlay">
      <v-subheader>書籍情報を登録中</v-subheader>
      <v-progress-linear
        indeterminate
        color="cyan"
      ></v-progress-linear>
    </v-overlay>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      addBook: false,
      menu: false,
      book: {
        id: 0,
        title: '',
        genre: '',
        boughtAt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        buyer: '',
        review: ''
      },
      addOverlay: false
    }
  },
  created () {},
  computed: {},
  methods: {
    addNewBook () {
      this.addOverlay = true
      this.$emit('addBook', this.book, () => this.closeAddBookDialog())
    },
    async closeAddBookDialog () {
      await this.initBook()
      this.addOverlay = false
      this.addBook = false
    },
    async initBook () {
      this.$set(this.book, 'id', 0)
      this.$set(this.book, 'title', '')
      this.$set(this.book, 'genre', '')
      this.$set(this.book, 'boughtAt', (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
      this.$set(this.book, 'buyer', '')
      this.$set(this.book, 'review', '')
    }
  }
}
</script>
