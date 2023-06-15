const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

ctx.lineWidth = 1;
ctx.strokeStyle = 'white';

class Line {
	constructor(canvas) {
		this.canvas = canvas;
		this.x = Math.random() * this.canvas.width;
		this.y = 0;
		this.history = [{ x: this.x, y: this.y }];
		this.lineWidth = Math.floor(Math.random() * 3 + 1);
		this.maxLength = Math.floor(Math.random() * 100 + 10);
		this.speedX = Math.random() * 1 - 0.5;
		this.speedY = 7;
		this.lifeSpan = this.maxLength * 2;
		this.timer = 0;
		this.hue = Math.floor(Math.random() * 360);
		this.saturation = Math.floor(Math.random() * 100);
		this.lightness = Math.floor((Math.random() + 0.6) * 100);
	}

	draw(context) {
		context.shadowColor = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		context.shadowBlur = 15;
		context.strokeStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		context.lineWidth = this.lineWidth;
		context.beginPath();
		context.moveTo(this.history[0].x, this.history[0].y);
		for (let i = 0; i < this.history.length; i++) {
			context.lineTo(this.history[i].x, this.history[i].y);
		}
		context.stroke();
	}

	update() {
		this.timer++;
		if (this.timer < this.lifeSpan) {
			this.x += this.speedX + Math.random() * 20 - 10;
			this.y += this.speedY + Math.random() * 20 - 10;
			this.history.push({ x: this.x, y: this.y });
			if (this.history.length > this.maxLength) {
				this.history.shift();
			}
		} else if (this.history.length <= 1) {
			this.reset();
		} else {
			this.history.shift();
		}
	}

	reset() {
		this.x = Math.random() * this.canvas.width;
		this.y = Math.random() * this.canvas.height;
		this.history = [{ x: this.x, y: this.y }];
		this.timer = 0;
	}
}


const linesArray = [];
const numberOfLines = 20;

for (let i = 0; i < numberOfLines; i++) {
	linesArray.push(new Line(canvas));
}

console.log(linesArray);
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	linesArray.forEach((line) => {
		line.draw(ctx);
		line.update();
	});
	requestAnimationFrame(animate);
}

animate();
