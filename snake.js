function Snake() {
	mainSound.play();
	mainSound.loop();
	mainSound.setVolume(0.2);

	this.x = 0;
	this.y = 0;

	this.xspeed = 1;
	this.yspeed = 0;

	this.score = 0;
	this.total = 3;

	this.tail = [];

	for (var i = this.total - 1; i >= 0; i--) {
		this.tail.unshift({
			x: i,
			y: 0
		});
	}

	var headColor = "#ff0050";

	this.crash = function () {
		for (var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			var distance = dist(this.x, this.y, pos.x, pos.y);
			if (distance < 1 || takePoison.length == 3) {
				Swal.fire({
					title: "GAME OVER",
					text: "Your Score : " + this.score,
					showCancelButton: true,
					confirmButtonText: "Restart?",
					cancelButtonText: "Nope",
					animation: false,
					customClass: {
						popup: "animated rubberBand"
					}
				}).then(result => {
					if (result.value) {
						window.location.href = "https://petrio.vercel.app";
					} else {
						/*TODO : Create starting page and then redirect to it !!!! */
					}
				});

				this.total = 3;
				this.score = 0;
				this.tail = [];

				this.direction(0, 0);
				directionState = "STOP";
				mainSound.stop();
				if (mainSound.isLooping()) {
					mainSound.noLoop();
					mainSound.stop();
				}
			}
		}
	};

	this.drawSnake = function () {
		console.log("Snake Direction:" + directionState)
		for (var i = 0; i < this.tail.length; i++) {
			push();
			fill(255 - i * 5, 150, 255 - i * 5);
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
			// image(animSnake[1], this.tail[i].x, this.tail[i].y, scl, scl);
			pop();
		}
		push();
		fill(headColor);
		rect(this.x, this.y, scl, scl);
		// image(animSnake[2], this.x, this.y, scl, scl);
		pop();
	};

	this.core = function () {
		for (var i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}
		if (this.total >= 0) {
			this.tail[this.total - 1] = createVector(this.x, this.y);
		}

		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;

		this.x = constrain(this.x, 0, width - scl);
		this.y = constrain(this.y, 0, height - scl);
	};

	this.getFood = function (pos) {
		var checkPos = dist(this.x, this.y, pos.x, pos.y);
		if (checkPos < 1) {
			this.total = this.total + 1;
			this.score = this.score + 1;
			// this.total++;
			// this.score++;
			return true;
		} else {
			return false;
		}
	};

	this.getPoison = function (pos) {
		var checkPos = dist(this.x, this.y, pos.x, pos.y);
		if (checkPos < 1) {
			this.total = this.total - 3;
			this.score = this.score - 3;
			// this.score--;
			// this.total--;
			for (var i = 0; i < 3; i++) {
				this.tail.shift();
			}
			return true;
		} else {
			return false;
		}
	};

	this.direction = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	};
}
