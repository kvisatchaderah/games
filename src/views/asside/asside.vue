<template>
  <nav>
    <router-link
      v-for="component_router_link in component_router_links"
      v-key="component_router_link"
      :to="component_router_link.path"
    >
      {{ component_router_link.name }}
    </router-link>
  </nav>
</template>

<style scoped lang="sass">
@import 'asside.sass'
</style>

<script lang="ts">
import script from './asside'
export default script
</script>
