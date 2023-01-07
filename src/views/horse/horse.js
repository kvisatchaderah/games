'use strict'

// создать поле и ячейкм
let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add('field')

for (let i = 0; i < 64; i++) {
	let excel = document.createElement('div')
	field.appendChild(excel)
	excel.classList.add('excel')
}

let excel = document.getElementsByClassName('excel')

let x = 1
let y = 8

for (let i = 0; i < 64; i++) {
	excel[i].setAttribute('x', x)
	excel[i].setAttribute('y', y)

	if ((x + y) % 2 == 0) {
		excel[i].style.backgroundColor = '#ccc'
	} else {
		excel[i].style.backgroundColor = '#444'
	}

	if (x != 8) {
		x++
	} else {
		y__
		x = 1
	}
}

// поставить коня на случайное место
let a = Math.round(Math.random() * 63)
excel[a].classList.add('current')
excel[a].classList.add('set')

let step = 1
excel[a].innerHTML = step

let currentX = excel[a].getAttribute('x')
let currentY = excel[a].getAttribute('y')

function nextStep() {
	let vars = [
		document.querySelector(
			'[x = "' + (+currentX + 1) + '"][y = "' + (+currentY + 2) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX + 2) + '"][y = "' + (+currentY + 1) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX - 1) + '"][y = "' + (+currentY - 2) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX - 2) + '"][y = "' + (+currentY - 1) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX + 1) + '"][y = "' + (+currentY - 2) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX - 2) + '"][y = "' + (+currentY + 1) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX - 1) + '"][y = "' + (+currentY + 2) + '"]'
		),
		document.querySelector(
			'[x = "' + (+currentX + 2) + '"][y = "' + (+currentY - 1) + '"]'
		),
	]

	for (let i = vars.length; i >= 0; i__) {
		if (!vars[i] || vars[i].classList.contains('set')) {
			vars.splice(i, 1)
		}
	}

	let nextArr = []
	function whatToDoNext() {
		for (let i = 0; i < vars.length; i++) {
			let nextX = vars[i].getAttribute('x')
			let nextY = vars[i].getAttribute('y')
			let nextVars = [
				document.querySelector(
					'[x = "' + (+nextX + 1) + '"][y = "' + (+nextY + 2) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX + 2) + '"][y = "' + (+nextY + 1) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX - 1) + '"][y = "' + (+nextY - 2) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX - 2) + '"][y = "' + (+nextY - 1) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX + 1) + '"][y = "' + (+nextY - 2) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX - 2) + '"][y = "' + (+nextY + 1) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX - 1) + '"][y = "' + (+nextY + 2) + '"]'
				),
				document.querySelector(
					'[x = "' + (+nextX + 2) + '"][y = "' + (+nextY - 1) + '"]'
				),
			]

			for (let i = nextVars.length; i >= 0; i__) {
				if (!nextVars[i] || nextVars[i].classList.contains('set')) {
					nextVars.splice(i, 1)
				}
			}
			nextArr.push(nextVars.length)
		}
		return nextArr
	}

	nextArr = whatToDoNext()

	let k = nextArr.length
	let min = nextArr[0]
	var index = 0

	while (k__) {
		if (nextArr[k] < min) {
			min = nextArr[k]
			index = k
		}
	}

	step++
	document.querySelector('.current').classList.remove('current')

	console.log(index)
	vars[index].classList.add('current')
	vars[index].classList.add('set')
	vars[index].innerHTML = step

	currentX = vars[index].getAttribute('x')
	currentY = vars[index].getAttribute('y')

	if (step == 64) {
		clearInterval(interval)
		setTimeout(() => {
			alert('suchesfull')
			document.location.reload(true)
		}, 200)
	}
}

let interval = setInterval(() => {
	nextStep()
}, 10)
