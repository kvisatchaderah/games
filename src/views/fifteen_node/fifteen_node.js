export default {
  // data
  data() {
    return {
      cube_key: 0,
      keydown_data: {
        ArrowUp: this.keydown_arrow_up,
        ArrowDown: this.keydown_arrow_down,
        ArrowRight: this.keydown_arrow_right,
        ArrowLeft: this.keydown_arrow_left,
      },
      game_settings_in_node: {
        row_quantity: 4,
        col_quantity: 4,
      },
      game_settings: { row_quantity: 4, col_quantity: 4 },
      matrix: null,
      win: false,
    }
  },

  // components
  components: { BFormInput, BButton },

  // computed
  computed: {
    cube_quantity() {
      return this.game_settings.row_quantity * this.game_settings.col_quantity
    },
    cube_width() {
      return 100 / this.game_settings.col_quantity
    },
    cube_height() {
      return 100 / this.game_settings.row_quantity
    },
  },

  // create
  mounted() {
    this.start_game()
    this.add_window_listener()
  },

  // methods
  methods: {
    //
    // init game
    //
    set_game_settings() {
      this.game_settings = { ...this.game_settings_in_node }
    },

    set_matrix() {
      this.matrix = new Array(this.cube_quantity)
        .fill(null)
        .map(
          (el, i) =>
            (el = {
              y: this.get_row(i),
              x: this.get_col(i),
              error: false,
            }),
        )
        .sort((a, b) => Math.random() - Math.random())
        .map((el, i) => {
          return { ...el, num: i }
        })
    },

    get_col(num) {
      return num % this.game_settings.col_quantity
    },

    get_row(num) {
      return Math.floor(num / this.game_settings.col_quantity)
    },

    start_game() {
      this.set_game_settings()
      this.set_matrix()
    },

    //
    // control
    //
    is_change_pos_possible(num) {
      const delta_x = Math.abs(this.matrix[num].x - this.matrix[0].x)
      const delta_y = Math.abs(this.matrix[num].y - this.matrix[0].y)

      if ((delta_x == 1 && delta_y == 0) || (delta_x == 0 && delta_y == 1))
        return true
      else return false
    },

    change_pos(num) {
      const res = { x: this.matrix[num].x, y: this.matrix[num].y }
      this.matrix[num] = {
        ...this.matrix[num],
        ...{ x: this.matrix[0].x, y: this.matrix[0].y },
      }
      this.matrix[0] = {
        ...this.matrix[0],
        ...res,
      }
      if (this.is_win()) this.set_win()
      this.matrix = [...this.matrix]
    },

    //
    // win-error
    //
    right_pos_for_cube(num) {
      const cur_c = this.matrix[num]
      const prev_c = this.matrix[num - 1]
      if (
        (cur_c.x == prev_c.x + 1 && cur_c.y == prev_c.y) ||
        (cur_c.x == 0 && cur_c.y == prev_c.y + 1)
      )
        return true
      else return false
    },

    is_win() {
      for (let i = 2; i < this.matrix.length; i++)
        if (!this.right_pos_for_cube(i)) return false
      return true
    },

    set_error(num) {
      this.matrix[num].error = true
      this.cube_key++
      setTimeout(() => {
        this.matrix[num].error = false
      }, 400)
    },

    set_win() {
      this.win = true
      setTimeout(() => {
        this.win = false
      }, 1000)
    },

    //
    // event
    //

    //  click
    click_cube(num) {
      if (this.is_change_pos_possible(num)) this.change_pos(num)
      else this.set_error(num)
    },

    // key_down
    keydown_arrow_down(el) {
      if (el.x == this.matrix[0].x && el.y + 1 == this.matrix[0].y) return true
      else return false
    },
    keydown_arrow_up(el) {
      if (el.x == this.matrix[0].x && el.y - 1 == this.matrix[0].y) return true
      else return false
    },
    keydown_arrow_right(el) {
      if (el.x + 1 == this.matrix[0].x && el.y == this.matrix[0].y) return true
      else return false
    },
    keydown_arrow_left(el) {
      if (el.x - 1 == this.matrix[0].x && el.y == this.matrix[0].y) return true
      else return false
    },

    key_down(event) {
      const index = this.matrix.findIndex((el) =>
        this.keydown_data[`${event.key}`](el),
      )
      if (index != -1) this.change_pos(index)
    },

    check_key_down(event) {
      return this.keydown_data[`${event.key}`] ? this.key_down(event) : false
    },

    add_window_listener() {
      window.addEventListener('keydown', this.check_key_down)
    },
  },
}
