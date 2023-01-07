<template>
  <Asside />

  <RouterView />
</template>

<script>
import { defineComponent } from 'vue'
import Asside from '@/views/asside/asside.vue'

export default defineComponent({
  components: { Asside },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.--active {
      color: #42b983;
    }
  }
}
</style>
