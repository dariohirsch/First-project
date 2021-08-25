const app = {
	shoot: false,
	score: 0,
	balls: 3,
	framesCounter: 0,
	obstacles: [],
	// mainSound() {
	// 	let mainAudio = new Audio("/sounds/gol-messi.mp3");
	// 	mainAudio.play();
	// },

	scoreSound() {
		let scoreAudio = new Audio("./sounds/mixkit-winning-a-coin-video-game-2069.wav");
		scoreAudio.play();
	},
	whistleSound() {
		let whistleSound = new Audio(".sounds/Referee Whistle.mp3");
		whistleSound.play();
	},

	colisionSound() {
		let colisionSound = new Audio("./sounds/choque.mp3");
		colisionSound.play();
	},

	gameOverSound() {
		let gameOverSound = new Audio("./sounds/game over.mp3");
		gameOverSound.play();
	},

	winSound() {
		let winSound = new Audio("./sounds/victoria.mp3");
		winSound.play();
	},
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
		this.whistleSound();

		this.ctx = canvas.getContext("2d");
		this.canvasDimension();
		this.setBackgroundImage();
		this.setNewPlayer();
		this.setNewBall();
		this.setNewObstacle();

		this.setListeners();

		this.refreshCanvas();
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
		this.newBallImage.src = "./images/variante-de-balon-de-futbol.png";
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
		this.ballPosition.y += 10;
		this.shoot = true;
	},

	moveBallLeft() {
		if (this.shoot === false) {
			this.ballPosition.x -= 30;
		}
	},
	moveBallRight() {
		if (this.shoot === false) {
			this.ballPosition.x += 30;
		}
	},
	moveBallDown() {
		if (this.shoot === false) {
			this.ballPosition.y += 30;
		}
	},
	moveBallUp() {
		if (this.shoot === false) {
			this.ballPosition.y -= 30;
		}
	},

	setListeners() {
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") {
				this.ballPosition.x > 50 ? this.moveBallLeft() : null;
				this.messi.playerMoveLeft();
			} else if (e.key === "ArrowRight") {
				this.ballPosition.x <= this.canvasSize.w - 95 ? this.moveBallRight() : null;
				this.messi.playerMoveRight();
			} else if (e.key === "ArrowDown") {
				this.ballPosition.y <= this.canvasSize.h - 80 ? this.moveBallDown() : null;
				this.messi.playerMoveDown();
			} else if (e.key === "ArrowUp") {
				this.ballPosition.y > 150 ? this.moveBallUp() : null;
				this.messi.playerMoveUp();
			} else if (e.code === "Space") {
				this.ballMove();
			}
		});
	},

	checkGoal() {
		if (this.ballPosition.y >= this.canvasSize.h - 80 && this.ballPosition.x >= 360 && this.ballPosition.x <= 380) {
			this.messi.playerPosX = this.playerPosition.x;
			this.messi.playerPosY = 40;
			this.ballPosition.x = this.messi.playerPosX + 25;
			this.ballPosition.y = this.messi.playerPosY + 100;
			this.scoreSound();
			this.score++;
			this.updateScore();
			this.obstacles = [];
		}
	},

	updateScore() {
		document.getElementById("score").innerHTML = `Score ${this.score}`;
	},

	checkColision() {
		this.obstacles.forEach((element) => {
			if (this.ballPosition.x < element.conePositionX + 50 && this.ballPosition.x + 40 > element.conePositionX && this.ballPosition.y < element.conePositionY && 50 + this.ballPosition.y > element.conePositionY) {
				this.messi.playerPosX = this.playerPosition.x;
				this.messi.playerPosY = 40;
				this.ballPosition.x = this.messi.playerPosX + 25;
				this.ballPosition.y = this.messi.playerPosY + 100;
				this.colisionSound();
				this.balls--;
				this.updateBalls();
				this.obstacles = [];
			}
		});
	},

	updateBalls() {
		document.getElementById("balls").innerText = `Balls ${this.balls}`;
	},

	checkWin() {
		if (this.score === 3) {
			clearInterval(this.intervalId);
			setTimeout(() => {
				this.ctx.fillStyle = "blue";
				this.ctx.font = "80px Verdana italic";
				this.ctx.lineWidth = 2;
				this.ctx.fillText("YOU WIN!", 190, 450);
				this.winSound();
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

				this.gameOverSound();
			}, 100);
		}
	},

	refreshCanvas() {
		this.intervalId = setInterval(() => {
			this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
			this.setBackgroundImage();
			this.drawPlayer();
			this.drawBall();

			this.framesCounter++;
			if (this.framesCounter % 25 === 0) {
				this.obstacles.push(new Obstacle(this.ctx, 50, 50, this.canvasSize, Math.random() * this.canvasSize.w - 20, this.canvasSize.h));
			}
			for (let i = 0; i < this.obstacles.length; i++) {
				this.obstacles[i].drawObstacle();
			}
			this.checkGoal();
			this.checkWin();
			this.checkLoose();
			this.checkColision();
		}, 1000 / 60);
	},
};
