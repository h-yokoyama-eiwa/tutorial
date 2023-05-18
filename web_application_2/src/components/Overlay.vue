<template>
  <div>
    <v-subheader>{{ovlText}}</v-subheader>
    <v-progress-linear
      indeterminate
      color="cyan"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  props: {
    ovlText: {
      type: String,
      default: ''
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
