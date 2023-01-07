export default {
  // data
  data() {
    return {
      settings: null,
      ctx: null,
      settings_in_node: {
        x_max: 5,
        y_max: 5,
        width: 500,
        height: 500,
        dots: { step: 1, size: 2 },
        text: {
          indent: -2,
        },
        color: {
          s: '#cecece30',
          n: '#cecece',
          h: '#f5f5f5',
          graf: '#f3b840',
        },
      },
      active_function: null,
      functions: [
        {
          title: 'X<sup>0.5</sup>',
          function: (a) => {
            return a ** 0.5
          },
        },
        {
          title: '-X',
          function: (a) => {
            return -a
          },
        },
        {
          title: 'X<sup>2</sup>',
          function: (a) => {
            return a ** 2
          },
        },
        {
          title: 'X<sup>3</sup>',
          function: (a) => {
            return a ** 3
          },
        },
      ],
    }
  },

  // computed
  computed: {
    grid_width() {
      return this.settings.width / (2 * this.settings.x_max)
    },
    grid_height() {
      return this.settings.height / (2 * this.settings.y_max)
    },
  },

  // created
  created() {
    this.set_settings()
  },

  // mounted
  mounted() {
    this.init_canvas()
    this.init_grafik()
  },

  // methods
  methods: {
    //
    // init
    //

    init_canvas() {
      this.ctx = grids.getContext('2d')
    },
    clear_canvas() {
      this.ctx.clearRect(0, 0, this.settings.width, this.settings.height)
    },

    set_function(f) {
      this.active_function = f
    },
    set_settings() {
      this.settings = { ...this.settings_in_node }
    },

    init_grafik() {
      this.clear_canvas()
      this.set_settings()
      this.paint_grides()
      this.paint_legends()

      if (this.active_function) this.paint_grafik()
    },

    new_function(f) {
      this.set_function(f)
      this.init_grafik()
    },

    //
    // paint helpers
    //

    set_color(val) {
      this.ctx.strokeStyle = `${val}`
      this.ctx.fillStyle = `${val}`
    },
    set_fz(val) {
      this.ctx.font = `${val}px Roboto`
      this.ctx.textAlign = 'right'
      this.ctx.textBaseline = 'top'
    },
    set_font(fz, color) {
      this.set_color(color)
      this.set_fz(fz)
    },

    set_null_ledge(num) {
      return num ? 6 : 0 // px
    },

    get_x_canvas(num) {
      return this.settings.width / 2 + num * this.grid_width
    },
    get_y_canvas(num) {
      return this.settings.height / 2 - num * this.grid_height
    },

    //
    // paint_grid
    //

    paint_gride_horizontal(num) {
      const null_ledge = this.set_null_ledge(num)

      this.ctx.beginPath()
      this.ctx.moveTo(null_ledge, this.get_y_canvas(num))
      this.ctx.lineTo(this.settings.width - null_ledge, this.get_y_canvas(num))
      this.ctx.stroke()
      this.ctx.closePath()
    },

    paint_gride_vertical(num) {
      const null_ledge = this.set_null_ledge(num)

      this.ctx.beginPath()
      this.ctx.moveTo(this.get_x_canvas(num), null_ledge)
      this.ctx.lineTo(this.get_x_canvas(num), this.settings.height - null_ledge)
      this.ctx.stroke()
      this.ctx.closePath()
    },

    paint_grides() {
      this.set_color(this.settings.color.h)
      this.paint_gride_horizontal(0)
      this.paint_gride_vertical(0)

      this.set_color(this.settings.color.s)
      for (let i = 1; i < this.settings.y_max; i++) {
        this.paint_gride_horizontal(i)
        this.paint_gride_horizontal(-i)
      }
      for (let i = 1; i < this.settings.x_max; i++) {
        this.paint_gride_vertical(i)
        this.paint_gride_vertical(-i)
      }
    },

    //
    // paint_legend
    //

    paint_legend_horisontal(num) {
      this.ctx.fillText(
        `${num}`,
        this.get_x_canvas(num) + this.settings.text.indent,
        this.settings.height / 2 - this.settings.text.indent + 1
      )
    },

    paint_legend_vertical(num) {
      this.ctx.fillText(
        `${num}`,
        this.settings.width / 2 + this.settings.text.indent,
        this.get_y_canvas(num) - this.settings.text.indent + 1
      )
    },

    paint_legends() {
      this.set_font(16, this.settings.color.n)

      this.paint_legend_vertical(0)

      for (let i = 1; i < this.settings.y_max; i++) {
        this.paint_legend_vertical(i)
        this.paint_legend_vertical(-i)
      }
      for (let i = 1; i < this.settings.x_max; i++) {
        this.paint_legend_horisontal(i)
        this.paint_legend_horisontal(-i)
      }
    },

    //
    // paint_grafik
    //

    paint_grafik_dot(indent) {
      const x = -this.settings.x_max + indent / this.grid_width
      const y = this.active_function(x)

      this.ctx.fillRect(
        this.get_x_canvas(x),
        this.get_y_canvas(y),
        this.settings.dots.size,
        this.settings.dots.size
      )
    },

    paint_grafik() {
      this.set_color(this.settings.color.graf)

      for (let i = 0; i <= this.settings.width; i += this.settings.dots.step) {
        this.paint_grafik_dot(i)
      }
    },
  },
}
