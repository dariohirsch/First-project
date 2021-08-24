class Player {
	constructor(ctx, width, height, canvasSize, playerPosX, playerPosY) {
		this.width = width;
		this.height = height;
		this.canvasSize = canvasSize;
		this.ctx = ctx;
		this.playerPosX = playerPosX;
		this.playerPosY = playerPosY;
		this.img = new Image();
		this.img.src = "/images/jugador-de-futbol.png";
	}

	drawPlayer() {
		this.ctx.drawImage(this.img, this.playerPosX, this.playerPosY, this.width, this.height);
	}

	playerMoveLeft() {
		this.playerPosX > 10 ? (this.playerPosX -= 30) : null;
	}
	playerMoveRight() {
		this.playerPosX < this.canvasSize.w - 95 ? (this.playerPosX += 30) : null;
	}
	playerMoveUp() {
		this.playerPosY > 40 ? (this.playerPosY -= 30) : null;
	}
	playerMoveDown() {
		this.playerPosY < this.canvasSize.h - 180 ? (this.playerPosY += 30) : null;
	}
}
