<template>
  <div>
    <Search :genres="genres"/>
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
          boughtAt: '2022/02/22',
          buyer: 'test_buyer',
          review: 'test'
        },
        {
          id: '2',
          title: 'テストタイトル',
          genre: 'テストジャンル',
          boughtAt: '2022年02月22日',
          buyer: 'テスト購入者',
          review: 'テスト'
        }
      ],
      genres: ['test_genre', 'テストジャンル']
    }
  },
  created () {},
  computed: {},
  methods: {}
}
</script>
