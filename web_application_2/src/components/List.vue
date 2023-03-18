<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">
          タイトル
        </th>
        <th class="text-left">
          ジャンル
        </th>
        <th class="text-left">
          購入日
        </th>
        <th class="text-left">
          購入者
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in books"
        :key="item.id"
      >
        <td>{{ item.title }}</td>
        <td>{{ item.genre }}</td>
        <td>{{ item.boughtAt }}</td>
        <td>{{ item.buyer }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data () {
    return {
      books: [
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
  methods: {}
}
</script>
