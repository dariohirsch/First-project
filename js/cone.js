class Obstacle {
	constructor(ctx, width, height, canvasSize, conePositionX, conePositionY) {
		this.width = width;
		this.height = height;
		this.canvasSize = canvasSize;
		this.ctx = ctx;
		this.conePositionX = conePositionX;
		this.conePositionY = conePositionY;
		this.img = new Image();
		this.img.src = "/images/cono-de-trafico.png";
	}

	drawObstacle() {
		this.ctx.drawImage(this.img, this.conePositionX, this.conePositionY, this.width, this.height);
		this.move();
	}
	move() {
		this.conePositionY -= 5;
	}
}
