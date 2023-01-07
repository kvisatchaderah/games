export default class View {
	//цвета для активных блоков
	static colors = [
		'',
		'grey',
		'red',
		'orange',
		'cyan',
		'blue',
		'yellow',
		'green',
		'purple'
	]


	constructor(element, widthPanel, width, height, rows, columns) {
		this.element    = element
		this.widthPanel = widthPanel
		this.width      = width
		this.height     = height

		this.blockWidth  = this.width / columns
		this.blockHeight = this.height / rows
		this.borderWidth = 4

		this.canvas = document.createElement('canvas')
			this.canvas.width  = this.width + this.widthPanel + this.borderWidth * 2
			this.canvas.height = this.height + this.borderWidth * 2
			this.context       = this.canvas.getContext('2d')
			this.element.appendChild(this.canvas)
	}


	// отрисовка стартового экрана
	renderStartScreen() {
		this.context.textAlign    = 'start'
		this.context.textBaseline = 'middle'
		this.context.fillStyle    = 'white'
		this.context.font         = 'bold 24px serif'

		this.context.fillText(
			`Press ENTER to Start`,
			(this.width + this.borderWidth * 2 + this.widthPanel) / 4,
			(this.height + this.borderWidth * 2) / 2 - 12)
	}


	// отрисовка экрана паузы
	renderPauseScreen() {
		this.context.fillStyle   = '#00000099'
		this.context.fillRect(
			0,
			0,
			this.width + this.borderWidth * 2 + this.widthPanel,
			this.height + this.borderWidth * 2)

		this.context.textAlign    = 'start'
		this.context.fillStyle    = 'white'
		this.context.font         = 'bold 24px serif'

		this.context.fillText(
			`Press ENTER to Resume`,
			(this.width + this.borderWidth * 2 + this.widthPanel) / 4,
			(this.height + this.borderWidth * 2) / 2 - 12)
	}


	// отрисовка экрана паузы
	renderEndGameScreen(score) {
		this.clearScreen()
		this.context.textAlign    = 'start'
		this.context.fillStyle    = 'white'
		this.context.font         = 'bold 24px serif'

		this.context.fillText(
			`GAME OVER`,
			(this.width + this.borderWidth * 2 + this.widthPanel) / 4,
			(this.height + this.borderWidth * 2) / 2 - 24)
		this.context.fillText(
			`Score: ${score}`,
			(this.width + this.borderWidth * 2 + this.widthPanel) / 4,
			(this.height + this.borderWidth) / 2)
		this.context.fillText(
			`Press ENTER to Start the New Game`,
			(this.width + this.borderWidth * 2 + this.widthPanel) / 4,
			(this.height + this.borderWidth * 2) / 2 + 24)
	}


	// отрисовка игры
	render(state) {
		this.clearScreen()
		this.renderPlayField(state)
		this.renderBorder(state)
		this.renderPanel(state)
	}


	// очистка предыдущего состояния поля
	clearScreen() {
		this.context.clearRect(0, 0, this.width + this.widthPanel + this.borderWidth * 2, this.height + this.borderWidth * 2)
	}


	// отрисовка поля
	renderPlayField({ copyPlayField }) {
		for (let y = 0; y < copyPlayField.length;    y++) {
		for (let x = 0; x < copyPlayField[y].length; x++) {
			if (copyPlayField[y][x]) {
				this.renderBlock(
					x * this.blockWidth + this.borderWidth,
					y * this.blockHeight + this.borderWidth,
					this.blockWidth,
					this.blockHeight,
					View.colors[copyPlayField[y][x]])
			}
		}}
	}


	// отрисовка границы
	renderBorder() {
		this.context.strokeStyle = 'white'
		this.context.lineWidth = this.borderWidth
		this.context.strokeRect(
			0,
			0,
			this.width + this.borderWidth * 2,
			this.height + this.borderWidth * 2)
	}


	// отрисовка блока
	renderBlock(x, y, width, height, color) {
		this.context.fillStyle   = `${color}`
		this.context.strokeStyle = 'black'
		this.context.lineWidth   = 2

		this.context.fillRect(x, y, width, height)
		this.context.strokeRect(x, y, width, height)
	}


	// отрисовка блока с очками
	renderPanel({ score, lines, level, nextPiece }) {
		this.context.textAlign    = 'start'
		this.context.textBaseline = 'top'
		this.context.fillStyle    = 'white'

		this.context.fillText(`Score: ${score}`, 10 + this.width + this.borderWidth * 2, 0 + this.borderWidth)
		this.context.fillText(`Lines: ${lines}`, 10 + this.width + this.borderWidth * 2, 24 + this.borderWidth)
		this.context.fillText(`Level: ${level}`, 10 + this.width + this.borderWidth * 2, 48 + this.borderWidth)
		this.context.fillText(`Next`, 10 + this.width + this.borderWidth * 2, 72 + this.borderWidth)

		for (let y = 0; y < nextPiece.blocks.length;    y++) {
		for (let x = 0; x < nextPiece.blocks[y].length; x++) {
			if (nextPiece.blocks[y][x]) {
				this.renderBlock(
					10 + this.width + this.borderWidth * 2 + x * this.blockWidth * 0.7,
					96 + this.borderWidth + y * this.blockHeight * 0.7,
					this.blockWidth * 0.7,
					this.blockHeight * 0.7,
					View.colors[nextPiece.blocks[y][x]])
			}
		}}
	}
}