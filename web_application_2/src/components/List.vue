<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-btn @click="editItem(item)">編集</v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn @click="deleteItem(item)">削除</v-btn>
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
      console.log(`${item.title}:${item.genre}:${item.boughtAt}:${item.buyer}`)
    },
    deleteItem (item) {
      console.log(`${item.title}:${item.genre}:${item.boughtAt}:${item.buyer}`)
    }
  }
}
</script>
