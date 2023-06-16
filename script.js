const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 500

ctx.strokeStyle = '#fff'

class Line {
	constructor(canvas) {	
		this.canvas = canvas
		this.x = Math.floor(Math.random() * this.canvas.width)
		this.y = Math.floor(Math.random() * this.canvas.height)
		this.history = [{ x: this.x, y: this.y }]
		this.lineWidth = Math.floor(Math.random() * 4 + 1)
		this.maxLength = Math.floor(Math.random() * 100 + 10)
		this.speedX = Math.random() * 1 - 0.5
		this.speedY = 7
		this.lifeSpan = this.maxLength * 2
		this.timer = 0
		this.hue = Math.floor(Math.random() * 360)
	}

	draw(context) {
		this.gradient = context.createLinearGradient(0, 0, 500, 500)
		this.gradient.addColorStop(0.2, '#ffe4e3');
		this.gradient.addColorStop(0.4, '#fae5c0');
		this.gradient.addColorStop(0.6, '#eff2aa');
		this.gradient.addColorStop(0.8, '#f59dc9');
		this.gradient.addColorStop(0.9, '#fc4952');
		// context.shadowColor = `hsl(${this.hue}, 63%, 53%)`
		context.shadowColor = '#fff'
		context.shadowBlur = 6
		context.strokeStyle = this.gradient
		context.lineWidth = this.lineWidth
		context.beginPath()
		context.moveTo(this.history[0].x, this.history[0].y)
		for (let i = 0; i < this.history.length; i++) {
			context.lineTo(this.history[i].x, this.history[i].y)
		}
		context.stroke()
	}

	update() {
		this.timer++
		if (this.timer < this.lifeSpan) {
			this.x += Math.floor(this.speedX + Math.random() * 20 - 10);
			this.y += Math.floor(this.speedY + Math.random() * 20 - 10);
			this.history.push({ x: this.x, y: this.y })
			if (this.history.length > this.maxLength) {
				this.history.shift()
			}
		} else if (this.history.length <= 1) {
			this.reset()
		} else {
			this.history.shift()
		}
	}

	reset() {
		this.x = Math.floor(Math.random() * this.canvas.width)
		this.y = Math.floor(Math.random() * this.canvas.height)
		this.history = [{ x: this.x, y: this.y }]
		this.timer = 0
	}
}


const linesArray = []
const numberOfLines = 6

for (let i = 0; i < numberOfLines; i++) {
	linesArray.push(new Line(canvas))
}

console.log(linesArray)
const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	linesArray.forEach((line) => {
		line.draw(ctx)
		line.update()
	})
	requestAnimationFrame(animate)
}

animate()
