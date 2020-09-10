// === НАЗНАЧЕНИЕ ПЕРЕМЕННЫХ ===
// Счет, старт, плейграунд, стоп, машина
const score = document.querySelector(".score"),
    start = document.querySelector(".start"),
    gameArea = document.querySelector(".gameArea"),
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
    gameArea.innerHTML = '';
    setting.score = 0;
    score.style.top = start.offsetHeight;
    car.style.left = '125px';
    car.style.bottom = '10px';
    car.style.top = 'auto';
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
        let carRect = car.getBoundingClientRect();
        let enemyRect = e.getBoundingClientRect();
        if(carRect.top <= enemyRect.bottom && 
        carRect.bottom >= enemyRect.top &&
        carRect.left <= enemyRect.right && 
        carRect.right >= enemyRect.left){
            setting.start = false;
            console.warn("ДТП!");
            start.classList.remove('hide');
            start.textContent = 'Начать заново';
            score.style.top = start.offsetHeight;
        }
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
    setting.score += setting.speed;
    score.textContent = 'СЧЕТ: ' + setting.score;
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
/* let stopGame = () => {
    start.classList.remove("hide");
    car.classList.add("hide");
    stop.classList.add("hide");
    setting.start = false;
}; */
// Начало движения объекта
let startRun = e => {
    e.preventDefault();
    keys[e.key] = true;
};
// Конец движения объекта
let stopRun = e => {
    e.preventDefault();
    keys[e.key] = false;
};
// =============================

// === НАЗНАЧЕНИЕ СОБЫТИЙ ===
// Старт игры по клику
start.addEventListener("click", startGame);
// Нажатие кнопки
document.addEventListener("keydown", startRun);
// Отжатие кнопки
document.addEventListener("keyup", stopRun);
// =============================