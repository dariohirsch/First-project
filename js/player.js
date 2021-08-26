class Player {
	constructor(ctx, width, height, canvasSize, playerPosX, playerPosY) {
		this.width = width;
		this.height = height;
		this.canvasSize = canvasSize;
		this.ctx = ctx;
		this.playerPosX = playerPosX;
		this.playerPosY = playerPosY;
		this.messiMovementL = false;
		this.messiMovementR = false;
		this.messiMovementU = false;
		this.messiMovementD = false;
		this.img = new Image();
		this.img.src = "./images/jugador-de-futbol.png";
	}

	drawPlayer() {
		this.ctx.drawImage(this.img, this.playerPosX, this.playerPosY, this.width, this.height);
	}

	playerMoveLeft() {
		if (this.playerPosX > -30 && this.messiMovementL) {
			this.playerPosX -= 4;
		}
	}

	playerMoveRight() {
		if (this.playerPosX < this.canvasSize.w - 65 && this.messiMovementR) {
			this.playerPosX += 4;
		}
	}

	playerMoveUp() {
		if (this.playerPosY > 40 && this.messiMovementU) {
			this.playerPosY -= 4;
		}
	}

	playerMoveDown() {
		if (this.playerPosY < this.canvasSize.h - 180 && this.messiMovementD) {
			this.playerPosY += 4;
		}
	}
}
