<template>
  <ListMaker :prop_function="add_list_item" />

  <div
    v-for="list_item in list"
    :key="list_item.id"
  >
    <hr />
    {{ list_item.id }} || {{ list_item.text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListMaker from './list_maker.vue'
import list_item from './list_item'

export default defineComponent({
  components: { ListMaker },

  data() {
    return {
      index: 'data index 2',
      list: [] as list_item[],
    }
  },

  methods: {
    add_list_item(text: string) {
      this.list.push({
        id: Math.round(1000 * Math.random()),
        text: text,
      })
    },
  },
})
</script>
