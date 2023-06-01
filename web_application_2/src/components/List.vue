<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="books"
          class="elevation-1"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon @click="openEditDialog(item)">edit</v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon @click="openDeleteDialog(item)">delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },
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
      ]
    }
  },
  created () {},
  computed: {},
  methods: {
    openEditDialog (item) {
      this.$emit('openEditDialog', item)
    },
    openDeleteDialog (item) {
      this.$emit('openDeleteDialog', item)
    }
  }
}
</script>
