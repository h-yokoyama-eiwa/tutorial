<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon @click="editItem(item)">edit</v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon @click="deleteItem(item)">delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'タイトル',
          value: 'title',
          width: 400
        },
        {
          text: 'ジャンル',
          value: 'genre',
          width: 150
        },
        {
          text: '購入日',
          value: 'boughtAt',
          width: 150
        },
        {
          text: '購入者',
          value: 'buyer',
          width: 150
        },
        {
          text: '編集',
          value: 'edit',
          sortable: false,
          width: 50
        },
        {
          text: '削除',
          value: 'delete',
          sortable: false,
          width: 50
        }
      ],
      //3/28:現時点では固定のデータを設定しておく。
      items: [
        {
          title: 'test_title',
          genre: 'test_genre',
          boughtAt: '2022/02/22',
          buyer: 'test_buyer'
        },
        {
          title: 'テストタイトル',
          genre: 'テストジャンル',
          boughtAt: '2022年02月22日',
          buyer: 'テスト購入者'
        }
      ]
    }
  },
  created () {},
  computed: {},
  methods: {
    editItem (item) {
      //まだ編集機能は未実装のため、確認用のログ出力のみ実施
      console.log(`${item.title}:${item.genre}:${item.boughtAt}:${item.buyer}`)
    },
    deleteItem (item) {
      //まだ削除機能は未実装のため、確認用のログ出力のみ実施
      console.log(`${item.title}:${item.genre}:${item.boughtAt}:${item.buyer}`)
    }
  }
}
</script>
