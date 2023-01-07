export default class Game {
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.playField = this.createPlayField()

    this.score = 0
    this.lines = 0
    this.level = 0
    this.activePiece = this.createPiece()
    this.nextPiece = this.createPiece()
  }

  // генерация нового элемента
  createPiece() {
    const index = Math.floor(Math.random() * 7)
    const type = 'IJLOSTZ'[index]
    const piece = {}

    switch (type) {
      case 'I':
        piece.blocks = [
          [0, 0, 0, 0],
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]
        break
      case 'J':
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [0, 0, 3],
        ]
        break
      case 'L':
        piece.blocks = [
          [0, 0, 0],
          [4, 4, 4],
          [4, 0, 0],
        ]
        break
      case 'O':
        piece.blocks = [
          [5, 5],
          [5, 5],
        ]
        break
      case 'S':
        piece.blocks = [
          [0, 0, 0],
          [0, 6, 6],
          [6, 6, 0],
        ]
        break
      case 'T':
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 7],
          [0, 7, 0],
        ]
        break
      case 'Z':
        piece.blocks = [
          [0, 0, 0],
          [8, 8, 0],
          [0, 8, 8],
        ]
        break
      default:
        throw new Error('неизвестный тип фигуры')
    }

    piece.x = Math.floor((this.columns - piece.blocks[0].length) / 2)
    piece.y = 0

    return piece
  }

  // генерация пустого поля
  createPlayField() {
    const playField = []
    for (let y = 0; y < this.rows; y++) {
      playField[y] = []
      for (let x = 0; x < this.columns; x++) {
        playField[y][x] = 0
      }
    }
    return playField
  }

  // создание нового обхекта = копия игрового поля + активный блок
  getState() {
    const copyPlayField = this.createPlayField()

    for (let y = 0; y < this.playField.length; y++) {
      for (let x = 0; x < this.playField[y].length; x++) {
        copyPlayField[y][x] = this.playField[y][x]
      }
    }

    for (let y = 0; y < this.activePiece.blocks.length; y++) {
      for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
        if (this.activePiece.blocks[y][x]) {
          copyPlayField[this.activePiece.y + y][this.activePiece.x + x] =
            this.activePiece.blocks[y][x]
        }
      }
    }
    copyPlayField.color = this.activePiece.color

    return {
      score: this.score,
      lines: this.lines,
      level: this.level,
      nextPiece: this.nextPiece,
      copyPlayField,
    }
  }

  // перемещение активного блока
  movePieceLeft() {
    this.activePiece.x -= 1

    if (this.hasCollisions()) {
      this.activePiece.x += 1
    }
  }
  movePieceRight() {
    this.activePiece.x += 1

    if (this.hasCollisions()) {
      this.activePiece.x -= 1
    }
  }
  movePieceDown() {
    this.activePiece.y += 1

    if (this.hasCollisions()) {
      this.activePiece.y -= 1
      this.lockPiece()
      this.getLineStatus()
      this.createNewNextPiece()
    }
  }

  // вращение активной фигуры
  rotationRight() {
    const blocks = this.activePiece.blocks
    const temp = []
    for (let blocksY = 0; blocksY < blocks.length; blocksY++) temp[blocksY] = []

    for (let blocksY = 0; blocksY < blocks.length; blocksY++) {
      for (let blocksX = 0; blocksX < blocks[blocksY].length; blocksX++) {
        temp[blocksX][blocks.length - blocksY - 1] = blocks[blocksY][blocksX]
      }
    }

    this.activePiece.blocks = temp
    if (this.hasCollisions()) this.activePiece.blocks = blocks
  }
  rotationLeft() {
    const blocks = this.activePiece.blocks
    const temp = []
    for (let blocksY = 0; blocksY < blocks.length; blocksY++) temp[blocksY] = []

    for (let blocksY = 0; blocksY < blocks.length; blocksY++) {
      for (let blocksX = 0; blocksX < blocks[blocksY].length; blocksX++) {
        temp[blocks.length - blocksX - 1][blocksY] = blocks[blocksY][blocksX]
      }
    }

    this.activePiece.blocks = temp
    if (this.hasCollisions()) this.activePiece.blocks = blocks
  }

  // проверка на выход за край или столкновение с заполненным блоком на поле
  hasCollisions() {
    const playField = this.playField
    const { x, y, blocks } = this.activePiece

    for (let blocksY = 0; blocksY < blocks.length; blocksY++) {
      for (let blocksX = 0; blocksX < blocks[blocksY].length; blocksX++) {
        if (
          blocks[blocksY][blocksX] &&
          (playField[y + blocksY] === undefined ||
            playField[y + blocksY][x + blocksX] === undefined ||
            playField[y + blocksY][x + blocksX])
        )
          return true
      }
    }
    return false
  }

  // фиксация активного блока на поле
  lockPiece() {
    const { x, y, blocks } = this.activePiece
    const playField = this.playField

    for (let blocksY = 0; blocksY < blocks.length; blocksY++) {
      for (let blocksX = 0; blocksX < blocks[blocksY].length; blocksX++) {
        if (blocks[blocksY][blocksX]) {
          playField[y + blocksY][x + blocksX] = 1
        }
      }
    }
  }

  // проверка на то что есть полная линия
  getLineStatus() {
    for (let y = this.playField.length - 1; y > -1; y--) {
      for (let x = 0; x <= this.playField[y].length; x++) {
        if (x == this.playField[y].length) {
          this.clearLine(y)
          x = 0
        }
        if (!this.playField[y][x]) break
      }
    }
  }
  // удаление линий
  clearLine(y) {
    this.playField.splice(y, 1)
    this.playField.unshift(new Array(this.columns).fill(0))
    this.updateGameTemplate()
  }
  // прибавление счета
  updateGameTemplate() {
    this.score += this.columns * (this.level + 1)
    this.lines++
    this.level = Math.floor(this.lines * 0.1)
  }

  // новый следующий элемент
  createNewNextPiece() {
    this.activePiece = this.nextPiece
    this.nextPiece = this.createPiece()
  }
}
