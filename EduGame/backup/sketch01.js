function centerCanvas() {
    var canvasX = (windowWidth - width) / 2;
    var canvasY = (windowHeight - height) / 2;
    canvas.position(canvasX, canvasY);
}

function windowResized() {
    centerCanvas();
}

function foodPos() {
    var cols = floor(x / scl);
    var rows = floor(y / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

    poison = createVector(floor(random(cols)), floor(random(rows)));
    poison.mult(scl);
}

function setup() {
    canvas = createCanvas(x, y);
    centerCanvas();

    snake = new Snake();
    foodPos();

    for (i = 5; i <= 200; i += 5) {
        quizTime.push(i);
    }
    for (i = 10; i <= 150; i += 10) {
        getFPS.push(i);
    }
    for (i = 10; i <= 50; i += 2) {
        newFPS.push(i);
    }

    let frames = appleData.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = appleSprite.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
    }
}

function draw() {
    for (var i = 0; i <= 100; i++) {
        if (snake.score == quizTime[i]) {
            isQuiz = true;
        }
    }

    for (var i = 0; i <= 10; i++) {
        if (snake.score >= getFPS[i] + 1) {
            fps = newFPS[i];
        }
    }


    if (isQuiz == false) {
        background(bg);
        frameRate(fps);

        if (snake.getFood(food)) {
            foodPos();
            answer = false;
        }

        if (food.x == snake.x && food.y == snake.y) {
            foodPos();
            console.log("MK SAMA DENGAN KEPALA");
        } else if (poison.x == snake.x && poison.y == snake.y) {
            foodPos();
            console.log("RC SAMA DENGAN KEPALA");
        }

        for (var i = 0; i < snake.tail.length; i++) {
            if (food.x == snake.tail[i].x && food.y == snake.tail[i].y) {
                foodPos();
                console.log("MK SAMA DENGAN BADAN");
            } else if (poison.x == snake.tail[i].x && poison.y == snake.tail[i].y) {
                foodPos();
                console.log("RC SAMA DENGAN BADAN");
            }
        }

        snake.core();
        snake.crash();
        snake.drawSnake();

        if (answer) {
            if (snake.getPoison(poison)) {
                foodPos();
                takePoison.push(poison);
                answer = false;
            }

            // Count True Answer
            var trueAns;
            if (questions[2] == "TAMBAH") {
                trueAns = questions[0] + questions[1];
            } else if (questions[2] == "KURANG") {
                trueAns = questions[0] - questions[1];
            } else if (questions[2] == "KALI") {
                trueAns = questions[0] * questions[1];
            } else if (questions[2] == "BAGI") {
                trueAns = questions[0] / questions[1];
            }

            // Make False Answer
            // TODO : MAKE FALSE ANSWER (THIS NOT RIGHT)
            var falseAns = 10;

            // image(apple, food.x, food.y, scl, scl);
            // Show True Answer
            var checkAns = trueAns;
            var cntAns = [];
            var posTextFX, posTextFY, sz;
            for (var i = 0; i < checkAns.toString().length; i += 1) {
                cntAns.push(checkAns.toString().charAt(i));
            }
            if (cntAns.length == 3) {
                sz = 14;
                posTextFX = food.x + 3;
                posTextFY = food.y - 1;
            } else if (cntAns.length == 2) {
                sz = 20;
                posTextFX = food.x + 5;
                posTextFY = food.y - 1;
            } else if (cntAns.length == 1) {
                sz = 28;
                posTextFX = food.x + 7;
                posTextFY = food.y - 2;
            }
            push();
            textAlign(CENTER, CENTER);
            textFont(fontGomarice);
            textSize(sz);
            text(trueAns, posTextFX, posTextFY, scl, scl);
            pop();

            // image(racun, poison.x, poison.y, scl, scl);
            // Show False Answer
            var checkFalseAns = falseAns;
            var cntFalseAns = [];
            var posPoisonAnsX, posPoisonAnsY, szFalse;
            for (var i = 0; i < checkFalseAns.toString().length; i += 1) {
                cntFalseAns.push(checkFalseAns.toString().charAt(i));
            }
            if (cntFalseAns.length == 3) {
                szFalse = 14;
                posPoisonAnsX = poison.x + 3;
                posPoisonAnsY = poison.y - 1;
            } else if (cntFalseAns.length == 2) {
                szFalse = 20;
                posPoisonAnsX = poison.x + 5;
                posPoisonAnsY = poison.y - 1;
            } else if (cntFalseAns.length == 1) {
                szFalse = 28;
                posPoisonAnsX = poison.x + 7;
                posPoisonAnsY = poison.y - 2;
            }
            push();
            textAlign(CENTER, CENTER);
            textFont(fontGomarice);
            textSize(szFalse);
            text(falseAns, posPoisonAnsX, posPoisonAnsY, scl, scl);
            pop();
        } else {
            image(animation[(frameCount % animation.length)], food.x, food.y, scl, scl);
        }

        push();
        textSize(24);
        fill(0, 0, 0, 95);
        text("Score : " + snake.score, 8, 590);
        pop();
    } else {
        Quest();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (directionState != "DOWN") {
            snake.direction(0, -1);
            directionState = "UP";
        }
    } else if (keyCode === DOWN_ARROW) {
        if (directionState != "UP") {
            snake.direction(0, 1);
            directionState = "DOWN";
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (directionState != "LEFT") {
            snake.direction(1, 0);
            directionState = "RIGHT";
        }
    } else if (keyCode === LEFT_ARROW) {
        if (directionState != "RIGHT") {
            snake.direction(-1, 0);
            directionState = "LEFT";
        }
    }
}

function Quest() {
    var questLv;
    var sym;
    var getRand0;
    var getRand1;
    var getRandLvScore = 3;
    if (snake.score >= 10) {
        getRandLvScore = 4;
    }

    var getRandLv = floor(random(0, getRandLvScore));
    if (getRandLv == 0) {
        questLv = "TAMBAH";
        sym = " + ";
    } else if (getRandLv == 1) {
        questLv = "KURANG";
        sym = " - ";
    } else if (getRandLv == 2) {
        questLv = "KALI";
        sym = " × ";
    } else if (getRandLv == 3) {
        questLv = "BAGI";
        sym = " ÷ ";
    }

    var takeRand;
    if (snake.score >= 5) {
        takeRand = 10;
    } else if (snake.score >= 10) {
        takeRand = 20;
    } else if (snake.score >= 15) {
        takeRand = 30;
    } else if (snake.score >= 20) {
        takeRand = 40;
    } else if (snake.score >= 25) {
        takeRand = 50;
    }

    var temp;
    if (questLv != "BAGI") {
        getRand0 = floor(random(0, takeRand));
        getRand1 = floor(random(0, takeRand));
        if (questLv === "KURANG") {
            if (getRand0 < getRand1) {
                temp = getRand0;
                getRand0 = getRand1;
                getRand1 = temp;
            }
        }
    } else {
        do {
            getRand0 = floor(random(2, takeRand));
        } while (getRand0 % 2 !== 0);
        do {
            getRand1 = floor(random(2, takeRand));
        } while (getRand1 % 2 !== 0);
        if (getRand0 < getRand1) {
            temp = getRand0;
            getRand0 = getRand1;
            getRand1 = temp;
        }
    }

    if (questions == []) {
        questions.push(getRand0, getRand1, questLv);
    } else {
        questions = [];
        questions.push(getRand0, getRand1, questLv);
    }
    console.log(questions);

    noLoop();
    Swal.fire({
        type: "question",
        // title: "QUIZ",
        title: "<h2>" + getRand0 + sym + getRand1 + "</h2>",
        confirmButtonText: "YUHUUUU!!!",
    }).then(result => {
        // if (result.value) {
        snake.score += 1;
        snake.total += 1;
        isQuiz = false;
        answer = true;
        foodPos();
        loop();
        // }
    });
}