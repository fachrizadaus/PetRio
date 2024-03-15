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

  let snakeframes = snakeData.frames;
  for (let i = 0; i < snakeframes.length; i++) {
    let pos = snakeframes[i].position;
    let img = snakeSprite.get(pos.x, pos.y, pos.w, pos.h);
    animSnake.push(img);
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
    }


    for (var i = 0; i < snake.tail.length; i++) {
      if (food.x == snake.tail[i].x && food.y == snake.tail[i].y) {
        foodPos();
        console.log("MK SAMA DENGAN BADAN");
      }
    }

    /** Game Cores */
    snake.core();
    // snake.crash();
    snake.drawSnake();
    /** End Game Cores */

    if (answer) {
      if (snake.getPoison(poison)) {
        foodPos();
        takePoison.push(poison);
        answer = false;
      }

      var trueAns = theQ[3];
      var falseAns = theQ[6];

      /** Count Answer */
      var countTrue = [];
      for (var i = 0; i < trueAns.toString().length; i += 1) {
        countTrue.push(trueAns.toString().charAt(i));
      }

      var countFalse = [];
      for (var i = 0; i < falseAns.toString().length; i += 1) {
        countFalse.push(falseAns.toString().charAt(i));
      }
      /** End Count Answer */

      /** Size, Pos X, and Pos Y */
      if (countTrue.length == 3) {
        tSize = 14;
        trueTextPosX = food.x + 3;
        trueTextPosY = food.y - 1;
      } else if (countTrue.length == 2) {
        tSize = 18;
        trueTextPosX = food.x + 6;
        trueTextPosY = food.y - 1;
      } else if (countTrue.length == 1) {
        tSize = 28;
        trueTextPosX = food.x + 7;
        trueTextPosY = food.y - 2;
      }

      if (countFalse.length == 3) {
        fSize = 14;
        falseTextPosX = poison.x + 3;
        falseTextPosY = poison.y - 1;
      } else if (countFalse.length == 2) {
        fSize = 18;
        falseTextPosX = poison.x + 6;
        falseTextPosY = poison.y - 1;
      } else if (countFalse.length == 1) {
        fSize = 28;
        falseTextPosX = poison.x + 7;
        falseTextPosY = poison.y - 2;
      }
      /** End Size, Pos X, and Pos Y */

      /** Show Text */
      // image(apple, food.x, food.y, scl, scl);
      push();
      textAlign(CENTER, CENTER);
      textFont(fontGomarice);
      textSize(tSize);
      stroke("#fff");
      strokeWeight(3);
      fill("#A80000");
      text(trueAns, trueTextPosX, trueTextPosY, scl, scl);
      pop();

      // image(racun, poison.x, poison.y, scl, scl);
      push();
      textAlign(CENTER, CENTER);
      textFont(fontGomarice);
      textSize(fSize);
      stroke("#fff");
      strokeWeight(3);
      fill("#A80000");
      text(falseAns, falseTextPosX, falseTextPosY, scl, scl);
      pop();
      /** End Show Text */
    } else {
      image(animation[frameCount % animation.length], food.x, food.y, scl, scl);
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

function Quest() {
  var getRandQuestX1, getRandQuestY1, getAnswer1;
  var getRandQuestX2, getRandQuestY2, getAnswer2;
  var sym, operation;

  var getScoreOpr = 3;
  if (snake.score >= 10) {
    getScoreOpr = 4;
  }

  var getOperator = floor(random(0, getScoreOpr));
  if (getOperator == 0) {
    operation = "TAMBAH";
    sym = " + ";
  } else if (getOperator == 1) {
    operation = "KURANG";
    sym = " - ";
  } else if (getOperator == 2) {
    operation = "KALI";
    sym = " × ";
  } else if (getOperator == 3) {
    operation = "BAGI";
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

  var temp1, temp2;
  getRandQuestX1 = floor(random(0, takeRand));
  getRandQuestY1 = floor(random(0, takeRand));
  getRandQuestX2 = floor(random(0, takeRand));
  getRandQuestY2 = floor(random(0, takeRand));
  getMoreRand = floor(random(1, 4));

  /** Check Operation "TAMBAH" */
  if (operation == "TAMBAH") {
    getAnswer1 = getRandQuestX1 + getRandQuestY1;
    getAnswer2 = getRandQuestX2 + getRandQuestY2;

    /* Check Is Answer 1 Have Same Value With Answer 2??? */
    if (getAnswer1 === getAnswer2) {
      getAnswer2 = getAnswer2 + getMoreRand;
    }
    /* End Of Check Answer */
    showTheQuest(getRandQuestX1, getRandQuestY1, sym);
    if (theQ != []) {
      theQ = [];
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    } else {
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    }
  } else if (operation == "KURANG") {

    /** Check Operation "KURANG" */
    if (getRandQuestX1 < getRandQuestY1) {
      temp1 = getRandQuestX1;
      getRandQuestX1 = getRandQuestY1;
      getRandQuestY1 = temp1;
    }
    if (getRandQuestX2 < getRandQuestY2) {
      temp2 = getRandQuestX2;
      getRandQuestX2 = getRandQuestY2;
      getRandQuestY2 = temp2;
    }

    getAnswer1 = getRandQuestX1 - getRandQuestY1;
    getAnswer2 = getRandQuestX2 - getRandQuestY2;

    /* Check Is Answer 1 Have Same Value With Answer 2??? */
    if (getAnswer1 === getAnswer2) {
      getAnswer2 = getAnswer2 + getMoreRand;
    }
    /* End Of Check Answer */
    showTheQuest(getRandQuestX1, getRandQuestY1, sym);
    if (theQ != []) {
      theQ = [];
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    } else {
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    }
  } else if (operation == "KALI") {

    /** Check Operation "KALI" */
    getAnswer1 = getRandQuestX1 * getRandQuestY1;
    getAnswer2 = getRandQuestX2 * getRandQuestY2;

    /* Check Is Answer 1 Have Same Value With Answer 2??? */
    if (getAnswer1 === getAnswer2) {
      getAnswer2 = getAnswer2 + getMoreRand;
    }
    /* End Of Check Answer */
    showTheQuest(getRandQuestX1, getRandQuestY1, sym);
    if (theQ != []) {
      theQ = [];
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    } else {
      theQ.push(
        operation,
        getRandQuestX1,
        getRandQuestY1,
        getAnswer1,
        getRandQuestX2,
        getRandQuestY2,
        getAnswer2
      );
    }
  } else if (operation == "BAGI") {

    /** Check Operation "BAGI" */
    // Q * A = Q2;
    if (getRandQuestX1 > 10) {
      getRandQuestX1 = floor(random(2, 10));
    } else if (getRandQuestX2 > 10) {
      getRandQuestX1 = floor(random(2, 10));
    }

    var getValue1 = floor(random(2, getRandQuestX1));
    var getValue2 = floor(random(2, getRandQuestX2));

    if (getRandQuestY1 == 0) {
      getRandQuestY1 = getRandQuestY1 + getMoreRand;
    } else if (getRandQuestY1 > 10) {
      getRandQuestY1 = floor(random(1, 10));
    } else if (getRandQuestY2 == 0) {
      getRandQuestY2 = getRandQuestY2 + getMoreRand;
    } else if (getRandQuestY2 > 10) {
      getRandQuestY2 = floor(random(1, 10));
    }

    getRandX1 = getRandQuestY1 * getValue1;
    getRandX2 = getRandQuestY2 * getValue2;

    if (getRandX1 === getRandX2) {
      getRandX2 = getRandX2 + getMoreRand;
    }

    showTheQuest(getRandX1, getRandQuestY1, sym);
    if (theQ != []) {
      theQ = [];
      theQ.push(
        operation,
        getRandX1,
        getRandQuestY1,
        getValue1,
        getRandX2,
        getRandQuestY2,
        getValue2
      );
      console.log("GRQ: " + getRandQuestX1);
    } else {
      theQ.push(
        operation,
        getRandX1,
        getRandQuestY1,
        getValue1,
        getRandX2,
        getRandQuestY2,
        getValue2
      );
    }
  }

  console.log(theQ);
}

function showTheQuest(Q1, Q2, symbols) {
  noLoop();
  Swal.fire({
    type: "question",
    title: "<h2>" + Q1 + symbols + Q2 + "</h2>",
    confirmButtonText: "Makan Jawabannya Sekarang!",
  }).then((result) => {
    snake.score += 1;
    snake.total += 1;
    isQuiz = false;
    answer = true;
    foodPos();
    loop();
  });
}
