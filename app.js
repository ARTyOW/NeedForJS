// === НАЗНАЧЕНИЕ ПЕРЕМЕННЫХ ===
// Счет, старт, плейграунд, стоп, машина
const score = document.querySelector(".score"),
    start = document.querySelector(".start"),
    gameArea = document.querySelector(".gameArea"),
    stop = document.querySelector(".stop"),
    car = document.createElement("div");
    car.classList.add("car");
// Клавиши управления
const keys = {
    ArrowDown: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false
};
// Стартовые настройки
const setting = {
    start: false,
    score: 0,
    speed: 3
};
// =============================

// === НАЗНАЧЕНИЕ ФУНКЦИЙ === 
// Старт игры
let startGame = () => {
    start.classList.add("hide");
    stop.classList.remove("hide");
    car.classList.remove("hide");
    gameArea.appendChild(car);
    setting.start = true;
    requestAnimationFrame(playGame);
};
// Геймплей
let playGame = () => {
    console.log("Play Game");
    if(setting.start){
        requestAnimationFrame(playGame);
    }
};
// Конец игры
let stopGame = () => {
    start.classList.remove("hide");
    car.classList.add("hide");
    stop.classList.add("hide");
    setting.start = false;
};
// Начало движения объекта
let startRun = e => {
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
};
// Конец движения объекта
let stopRun = e => {
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
};
// =============================

// === НАЗНАЧЕНИЕ СОБЫТИЙ ===
// Старт игры по клику
start.addEventListener("click", startGame);
// Конец игры по клику
stop.addEventListener("click", stopGame);
// Нажатие кнопки
document.addEventListener("keydown", startRun);
// Отжатие кнопки
document.addEventListener("keyup", stopRun);
// =============================
