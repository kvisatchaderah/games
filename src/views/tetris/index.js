'use strict';
// импорт классов
import Game from './src/game.js'
import View from './src/view.js'
import Controller from './src/controller.js'

const root    = document.getElementsByClassName('root')[0]
const rows    = 20
const columns = 10


const game       = new Game(rows, columns)
const view       = new View(root, 160, 320, 640, rows, columns)
const controller = new Controller(game, view)

// добавление новых объектов в виндоу
window.game       = game
window.view       = view
window.controller = controller