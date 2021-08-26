const app = {
	shoot: false,
	score: 0,
	balls: 3,
	framesCounter: 0,
	obstacles: [],
	scoreAudio: new Audio("./sounds/mixkit-winning-a-coin-video-game-2069.wav"),
	whistleSound: new Audio("./sounds/Referee Whistle.mp3"),
	colisionSound: new Audio("./sounds/choque.mp3"),
	gameOverSound: new Audio("./sounds/game over.mp3"),
	winSound: new Audio("./sounds/victoria.mp3"),
	fallSound: new Audio("./sounds/caida.mp3"),
	ballMovementL: false,
	ballMovementR: false,
	ballMovementD: false,
	ballMovementU: false,
	ballShooting: false,
	ctx: undefined,
	canvasSize: {
		w: undefined,
		h: undefined,
	},
	playerPosition: {
		x: undefined,
		y: undefined,
	},
	ballPosition: {
		x: undefined,
		y: undefined,
	},

	init(canvas) {
		this.playSound(this.whistleSound);

		this.ctx = canvas.getContext("2d");
		this.canvasDimension();
		this.setBackgroundImage();
		this.setNewPlayer();
		this.setNewBall();
		this.setNewObstacle();

		this.setListeners();

		this.refreshCanvas();
	},

	playSound(sound) {
		sound.play();
	},

	canvasDimension() {
		this.canvasSize.w = 760;
		this.canvasSize.h = 900;

		this.playerPosition.x = this.canvasSize.w / 2 - 40;
		this.playerPosition.y = 40;

		canvas.setAttribute("width", this.canvasSize.w);
		canvas.setAttribute("height", this.canvasSize.h);
	},

	setBackgroundImage() {
		this.backgroundImage = new Image();
		this.backgroundImage.src = "./images/campo.png";
		this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvasSize.w, this.canvasSize.h);
	},
	setNewPlayer() {
		this.messi = new Player(this.ctx, 90, 90, this.canvasSize, this.canvasSize.w / 2 - 40, 40);
	},

	drawPlayer() {
		this.messi.drawPlayer();
	},

	setNewBall() {
		this.newBallImage = new Image();
		this.newBallImage.src = "./images/pelota-de-futbol.png";
		this.ballPosition.x = this.messi.playerPosX + 25;
		this.ballPosition.y = this.messi.playerPosY + 100;
		this.ctx.drawImage(this.newBallImage, this.ballPosition.x, this.ballPosition.y, 40, 40);
		console.log(this.ballPosition.y);
	},

	drawBall() {
		this.ctx.drawImage(this.newBallImage, this.ballPosition.x, this.ballPosition.y, 40, 40);
	},

	setNewObstacle() {
		this.cone = new Obstacle(this.ctx, 50, 50, this.canvasSize, Math.random() * this.canvasSize.w - 20, this.canvasSize.h);
	},

	drawObstacle() {
		this.cone.drawObstacle();
	},

	ballMove() {
		this.ballInterval = setInterval(() => {
			this.ballPosition.y += 30;
		}, 100);
		this.shoot = true;
	},

	moveBallLeft() {
		if (this.shoot === false && this.ballMovementL) {
			this.ballPosition.x -= 4;
		}
	},
	moveBallRight() {
		if (this.shoot === false && this.ballMovementR) {
			this.ballPosition.x += 4;
		}
	},
	moveBallDown() {
		if (this.shoot === false && this.ballMovementD) {
			this.ballPosition.y += 4;
		}
	},
	moveBallUp() {
		if (this.shoot === false && this.ballMovementU) {
			this.ballPosition.y -= 4;
		}
	},

	setListeners() {
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") {
				this.ballMovementL = true;
				this.messi.messiMovementL = true;
			} else if (e.key === "ArrowRight") {
				this.ballMovementR = true;
				this.messi.messiMovementR = true;
			} else if (e.key === "ArrowDown") {
				this.ballMovementD = true;
				this.messi.messiMovementD = true;
			} else if (e.key === "ArrowUp") {
				this.ballMovementU = true;
				this.messi.messiMovementU = true;
			} else if (e.code === "Space") {
				this.ballMove();
			}
		});

		document.addEventListener("keyup", (e) => {
			if (e.key === "ArrowLeft") {
				this.ballMovementL = false;
				this.messi.messiMovementL = false;
			}
			if (e.key === "ArrowRight") {
				this.ballMovementR = false;
				this.messi.messiMovementR = false;
			}
			if (e.key === "ArrowDown") {
				this.ballMovementD = false;
				this.messi.messiMovementD = false;
			}
			if (e.key === "ArrowUp") {
				this.ballMovementU = false;
				this.messi.messiMovementU = false;
			}
		});
	},

	refreshPlayerPosition() {
		this.messi.playerPosX = this.playerPosition.x;
		this.messi.playerPosY = 40;
		this.ballPosition.x = this.messi.playerPosX + 25;
		this.ballPosition.y = this.messi.playerPosY + 100;
	},

	checkBallOut() {
		if (this.ballPosition.y >= this.canvasSize.h) {
			this.refreshPlayerPosition();
			this.playSound(this.fallSound);
			this.balls--;
			this.updateScore();
			this.updateBalls();
			this.obstacles = [];
			this.shoot = false;
			clearInterval(this.ballInterval);
		}
	},

	checkGoal() {
		if (this.ballPosition.y >= this.canvasSize.h - 80 && this.ballPosition.x >= 340 && this.ballPosition.x <= 390) {
			this.refreshPlayerPosition();
			this.playSound(this.scoreAudio);
			this.shoot = false;
			this.score++;
			this.updateScore();
			clearInterval(this.ballInterval);
			this.obstacles = [];
		} else {
			this.checkBallOut();
		}
	},

	updateScore() {
		document.getElementById("score").innerHTML = `Puntos ${this.score}`;
	},

	checkColision() {
		this.obstacles.forEach((element) => {
			if (this.ballPosition.x < element.conePositionX + 50 && this.ballPosition.x + 40 > element.conePositionX && this.ballPosition.y < element.conePositionY && 50 + this.ballPosition.y > element.conePositionY) {
				this.refreshPlayerPosition();
				this.shoot = false;
				this.playSound(this.colisionSound);
				clearInterval(this.ballInterval);
				this.balls--;
				this.updateBalls();
				this.obstacles = [];
			}
		});
	},

	updateBalls() {
		document.getElementById("balls").innerText = `Balones ${this.balls}`;
	},

	checkWin() {
		if (this.score === 3) {
			clearInterval(this.intervalId);
			setTimeout(() => {
				this.ctx.fillStyle = "blue";
				this.ctx.font = "80px Verdana italic";
				this.ctx.lineWidth = 2;
				this.ctx.fillText("YOU WIN!", 190, 450);
				this.playSound(this.winSound);
			}, 100);
		}
	},

	checkLoose() {
		if (this.balls === 0) {
			clearInterval(this.intervalId);
			setTimeout(() => {
				this.ctx.fillStyle = "red";
				this.ctx.font = "80px Verdana italic";
				this.ctx.lineWidth = 2;
				this.ctx.fillText("GAME OVER", 160, 450);

				this.playSound(this.gameOverSound);
			}, 1000);
		}
	},

	sendObstacles() {
		this.framesCounter++;
		if (this.framesCounter % 25 === 0) {
			this.obstacles.push(new Obstacle(this.ctx, 50, 50, this.canvasSize, Math.random() * this.canvasSize.w - 20, this.canvasSize.h));
		}
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i].drawObstacle();
		}
	},

	refreshCanvas() {
		this.intervalId = setInterval(() => {
			this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
			this.setBackgroundImage();
			this.drawPlayer();
			this.drawBall();
			this.sendObstacles();
			this.messi.playerMoveLeft();
			this.messi.playerMoveRight();
			this.messi.playerMoveDown();
			this.messi.playerMoveUp();
			if (this.ballPosition.x > 20) {
				this.moveBallLeft();
			}
			if (this.ballPosition.x <= this.canvasSize.w - 65) {
				this.moveBallRight();
			}
			if (this.ballPosition.y <= this.canvasSize.h - 80) {
				this.moveBallDown();
			}
			if (this.ballPosition.y > 150) {
				this.moveBallUp();
			}
			this.checkGoal();
			this.checkWin();
			this.checkLoose();
			this.checkColision();
		}, 1000 / 60);
	},
};
