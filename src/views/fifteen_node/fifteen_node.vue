<template>
  <section id="fifteen" class="fifteen">
    <div class="game_control">
      <!-- settings -->
      <input
        v-model="game_settings_in_node.row_quantity"
        class="btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="start_game"
      />
      <input
        v-model="game_settings_in_node.col_quantity"
        class="btn-dark m-1"
        type="number"
        min="1"
        max="10"
        @keydown.stop
        @keydown.enter="start_game"
      />
      <!-- /settings -->

      <!-- start -->
      <button class="btn-dark m-1" type="button" @click="start_game"
        >Старт</button
      >
      <!-- /start -->
    </div>

    <!-- game_zone -->
    <div
      class="game_zone"
      :class="{ win: win }"
      :style="{
        'padding-bottom':
          (100 * game_settings.row_quantity) / game_settings.col_quantity + '%',
      }"
    >
      <div
        v-for="el in matrix"
        :key="el.num"
        class="cube"
        :class="{ note_event: el.num == 0, error: el.error }"
        :style="{
          width: cube_width + '%',
          height: cube_height + '%',
          transform: `translate3d(
						${100 * el.x}%,
						${100 * el.y}%,
            0
          )`,
        }"
        @click="click_cube(el.num)"
      >
        {{ el.num }}
      </div>
    </div>
    <!-- /game_zone -->
  </section>
</template>

<script>
  import script from './fifteen_node.js'
  export default script
</script>

<style lang="sass" scoped>
  @import 'fifteen_node.sass'
</style>
