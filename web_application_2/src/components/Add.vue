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
                    v-model="boughtAt"
                    label="購入日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="boughtAt"
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
                v-model="reviewText"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- 4/23 今時点では登録ボタンを押してもダイアログが閉じるだけ -->
        <v-btn
          color="primary"
          text
          @click="addBook = false"
        >
          登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      addBook: false,
      menu: false,
      boughtAt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      reviewText: ''
    }
  },
  created () {},
  computed: {},
  methods: {}
}
</script>
