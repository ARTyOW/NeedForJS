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
    speed: 3,
    traffic: 3
};
// =============================

// === НАЗНАЧЕНИЕ ФУНКЦИЙ === 
// Максимальное кол-во элементов в пределах экрана
let getQuantityElements = heightElement => {
    return document.documentElement.clientHeight / heightElement + 1;
};
// Старт игры
let startGame = () => {
    start.classList.add("hide");
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.top = (i * 50) + "px";
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for(let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = "transparent url(\./image/gloenemy.png\) center / cover no-repeat";
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
        
    }
    stop.classList.remove("hide");
    car.classList.remove("hide");
    gameArea.appendChild(car);
    setting.start = true;
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};
// Дорога
let moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if(line.y >= document.documentElement.clientHeight){
            line.y = -100;
        }
    });
};
// Противники
let moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(e){
        e.y += setting.speed / 1.3;
        e.style.top = e.y + 'px';
        if(e.y >= document.documentElement.clientHeight){
            e.y = -100 * setting.traffic;
            e.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
};
// Геймплей
let playGame = () => {
    moveRoad();
    moveEnemy();
    if(setting.start){
        if(keys.ArrowLeft && setting.x >0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }
        if(keys.ArrowUp && setting.y >0){
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + "px";
        car.style.top = setting.y + "px";
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
