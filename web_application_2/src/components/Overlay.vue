<template>
  <div>
    <v-subheader>{{overlayText}}</v-subheader>
    <v-progress-linear
      indeterminate
      color="cyan"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  props: {
    overlayText: {
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
