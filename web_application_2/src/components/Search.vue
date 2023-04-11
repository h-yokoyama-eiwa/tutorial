<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-text-field
          clearable
          label="書籍名検索"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-select
          clearable
          label="ジャンル検索"
          :items="genres"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-btn>検索</v-btn>
        <v-btn>検索条件クリア</v-btn>
        <Add />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Add from './Add'

export default {
  components: {
    Add
  },
  props: {
    genres: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {}
}
</script>
