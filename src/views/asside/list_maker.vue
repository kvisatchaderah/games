<template>
  <input
    type="text"
    v-model="text"
  />
  <div @click="on_click">добавить</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      text: '',
    }
  },

  props: {
    prop_function: {
      type: Function,
    },
  },

  methods: {
    on_click() {
      this.prop_function(this.text)
      this.text = ''
    },
  },
})
</script>
