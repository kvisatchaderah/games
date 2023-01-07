export default class Controller {
	static startGame    = false
	static endGame      = false

	constructor(game, view) {
		view.renderStartScreen()
		this.listenerForKeydown()
	}


	// старт игры
	gameSteps(game, view) {
		let stepInterval = 1000

		setInterval(() => {
			game.movePieceDown()
			view.render(game.getState())
			stepInterval = 1000 - game.score
		}, stepInterval)
	}


	// эвенты на кнопки
	listenerForKeydown() {
		// let startGame = false
		// let endGame = false
		document.addEventListener('keydown', () => {
			switch(event.key) {
				case 'ArrowDown':
					event.preventDefault()
					if (this.startGame) {
						game.movePieceDown()
						view.render(game.getState())
					}
					break
				case 'ArrowRight':
					event.preventDefault()
					if (this.startGame) {
						game.movePieceRight()
						view.render(game.getState())
					}
					break
				case 'ArrowLeft':
					event.preventDefault()
					if (this.startGame) {
						game.movePieceLeft()
						view.render(game.getState())
					}
					break
				case 'Tab':
					event.preventDefault()
					if (this.startGame) {
						game.rotationRight()
						view.render(game.getState())
					}
					break
				case 'Escape':
					event.preventDefault()
					if (this.startGame) {
						game.rotationLeft()
						view.render(game.getState())
					}
					break
				// запуск отрисовки игры
				case 'Enter':
					event.preventDefault()
					if (this.endGame) {
						game.score = 0
						game.lines = 0
						game.level = 0
						game.playField = game.createPlayField()
						view.render(game.getState())
						game.startGame = false
					}
					else if (!this.startGame) {
						this.gameSteps(game, view)
						this.startGame = true
					}
					else if (this.startGame) {
						view.renderPauseScreen()
						this.startGame = false
					}
					
			}
		})
	}
}