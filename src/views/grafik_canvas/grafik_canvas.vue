<template>
  <section
    id="grafik_canvas"
    class="grafik_canvas"
  >
    <!-- settings -->
    <div class="settings d-flex mt-5 mb-3">
      <span class="m-1"> X: </span>
      <input
        v-model="settings_in_node.x_max"
        class="gc__btn btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="init_grafik"
      />
      <span class="m-1"> Y: </span>
      <input
        v-model="settings_in_node.y_max"
        class="gc__btn btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="init_grafik"
      />
    </div>
    <!-- /settings -->

    <!-- settings -->
    <div class="settings d-flex mb-3">
      <span class="m-1"> width: </span>
      <b-form-input
        v-model="settings_in_node.width"
        class="gc__btn btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="init_grafik"
      />
      <span class="m-1"> height: </span>
      <b-form-input
        v-model="settings_in_node.height"
        class="gc__btn btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="init_grafik"
      />
    </div>
    <!-- /settings -->

    <hr />

    <!-- functions -->
    <div class="functions d-flex mt-3 mb-3">
      <span
        v-for="(f, index) in functions"
        :key="index"
        class="m-1 mr-3 pb-3 pr-3"
        v-html="f.title"
        @click="new_function(f.function)"
      ></span>
    </div>
    <!-- /functions -->

    <!-- grids -->
    <canvas
      id="grids"
      class="grids"
      :width="settings.width + 'px'"
      :height="settings.height + 'px'"
    ></canvas>
    <!-- /grids -->
  </section>
</template>

<script>
import script from './grafik_canvas.js'
export default script
</script>

<style lang="sass" scoped>
@import 'grafik_canvas.sass'
</style>
