<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-text-field
          label="書籍名検索"
          v-model="title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-select
          label="ジャンル検索"
          :items="genres"
          v-model="genre"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-btn @click="searchBooks">
          検索
        </v-btn>
        <v-btn>検索条件クリア</v-btn>
        <v-btn @click="openAddDialog">
          新規登録
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: {
    genres: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      genre: '',
      title: ''
    }
  },
  created () {},
  computed: {},
  methods: {
    openAddDialog () {
      this.$emit('openAddDialog')
    },
    searchBooks () {
      this.$emit('searchBooks', this.title, this.genre)
    }
  }
}
</script>
