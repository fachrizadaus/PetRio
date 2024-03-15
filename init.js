let bg;

var canvas;
var x = 1200;
var y = 600;

var snake;
var scl = 40;
var food;

var directionState = "DOWN"; // IF CHANGE THIS, DON'T FORGET TO CHANGE X and Y SPEED ON SNAKE.JS

var fps = 10;
var getFPS = [];
var newFPS = [];

let eyeSprite, eyeData;
let appleSprite, appleData;
let snakeSprite, snakeData;
let animation = [];
let animSnake = [];

var quizTime = [];
var isQuiz = false;
var answer = false;

var theQ = [];

var takePoison = [];

// TODO : Make Moving Queue For Buffer The Step Of Snake

function preload() {
    // Sound
    soundFormats("ogg", "mp3");
    mainSound = loadSound("assets/sound/snake.mp3");

    // Font
    fontGomarice = loadFont("assets/font/polypty.otf");

    // Image
    bg = loadImage("assets/img/bg3.png");
    apple = loadImage("assets/img/apple.png");
    racun = loadImage("assets/img/racun.png");

    // Sprite Data JSON
    eyeData = loadJSON('json/eyes.json');
    appleData = loadJSON("json/apple.json");
    snakeData = loadJSON('json/snake.json');

    // Sprite Image
    eyeSprite = loadImage('assets/img/blink.png');
    appleSprite = loadImage('assets/img/apples.png');
    snakeSprite = loadImage('assets/img/snake.png');
}