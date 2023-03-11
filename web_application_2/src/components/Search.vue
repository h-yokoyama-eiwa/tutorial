<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          clearable
          label="書籍名検索"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          clearable
          label="ジャンル検索"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-select>
      </v-col>
      <v-col>
        <v-btn>検索</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {}
}
</script>
