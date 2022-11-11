const SIZE_CELL_X = 150;    //размер груза
const SIZE_CELL_Y = 100;    //размер груза
let conteiner_X = 600;      //размер контейнера
let conteiner_Y = 200;      //размер контейнера
const STEP = 25;        //шаг перемещения груза в контейнере
const DELTA_TIME = 30;  // задержка шага. влияет на частоту кадров при перемещении груза

const CELL_LIST = [];   //список из обьектов Cell т.е. грузов

let print = console.log;


const conteiner = {
    DOM: document.getElementById('conteiner'),
    width: null,
    height: null,
    n: null,
    m: null,
    cellX: null,
    cellY: null,
    map: [],

    load_data(cellX, cellY, conteiner_X, conteiner_Y) {
        this.width = conteiner_X;
        this.height = conteiner_Y;
        this.cellX = cellX;
        this.cellY = cellY;
        this.n = Math.floor(this.width / this.cellX);
        this.m = Math.floor(this.height / this.cellY);
        let mapM = [];

        for (let i = 0; i < this.n; i++) {
            for (let i = 0; i < this.m; i++) {
                mapM.push(null)
            }
            this.map.push(mapM);
            mapM = [];
        }
    },
}
// print(conteiner)
conteiner.load_data(SIZE_CELL_X, SIZE_CELL_Y, conteiner_X, conteiner_Y);


function Cell(id, group, color = "red") {
    this.id = id;               //STRING
    this.group = group;         //STRING
    this.listSize = [SIZE_CELL_X, SIZE_CELL_Y];
    this.color = color;
    this.parrentBox = conteiner;
    // print( conteiner)
    this.DOM = document.createElement('div');
    this.DOM.textContent = this.id;
    this.DOM.style.background = this.color;
    this.DOM.style.width = String(this.listSize[0]) + 'px';
    this.DOM.style.height = String(this.listSize[1]) + 'px';
    this.DOM.id = id;
    this.DOM.className = 'cell';
    this.parrentBox.DOM.appendChild(this.DOM);
    this.mapPosition = [null, null];    //массив с двумя значениями, n и m 
    this.activPositioning = false;

    !function (elDOM) {
        // установка элемента на стартовое значение
        const START_POSITION_X = 650;
        const START_POSITION_Y = 0;
        elDOM.style.left = START_POSITION_X + 'px';
        elDOM.style.top = START_POSITION_Y + 'px';
    }(this.DOM);

    !function (parrentBox, mapPosition, id) {
        //определение начальной секции обьекта на карте
        for (let i = 0; i < parrentBox.n; i++) {
            for (let j = 0; j < parrentBox.m; j++) {
                if (parrentBox.map[i][j] === null && (mapPosition[0] === null)) {
                    parrentBox.map[i][j] = id;
                    mapPosition[0] = i;
                    mapPosition[1] = j;
                }
            }
        }
    }(this.parrentBox, this.mapPosition, this.id);

    this.moveToX = (to) => {
        this.activPositioning = true;
        let START_VECTOR; // хранит начальное направление к цели. Если в ходе направление сменится, значит обьект прошел цель
        const TARGET_POSITION = to;
        const START_POSITION = parseInt(this.DOM.style.left)
        //проверка на отсутствие аргументов
        if (to === undefined || to === null) TARGET_POSITION = parseInt(this.DOM.style.left);


        START_VECTOR = Math.sign(TARGET_POSITION - START_POSITION);

        let nexStep = () => {
            //функция работает корректно тольно для перемещения обьекта вдоль одной оси! При переменщениях в разных направлениях будет скачок.
            let newPosition = parseInt(this.DOM.style.left) + STEP * START_VECTOR;
            let newVector = Math.sign(TARGET_POSITION - newPosition);

            if (newVector == 0 && newVector == 0) {  // завершение функции если обьект у цели и вектор нулевой
                this.DOM.style.left = newPosition + 'px';
                this.activPositioning = false;
                return;
            }

            if (newVector == START_VECTOR && newVector == START_VECTOR) {
                this.DOM.style.left = newPosition + 'px';
                setTimeout(nexStep, DELTA_TIME);
            }
            else {
                this.DOM.style.left = TARGET_POSITION + 'px';
                this.activPositioning = false;
                return;
            }
        }
        nexStep()
    };

    this.moveToY = (to) => {
        this.activPositioning = true;
        let START_VECTOR; // хранит начальное направление к цели. Если в ходе направление сменится, значит обьект прошел цель
        const TARGET_POSITION = to;
        const START_POSITION = parseInt(this.DOM.style.top)
        //проверка на отсутствие аргументов
        if (to === undefined || to === null) TARGET_POSITION = parseInt(this.DOM.style.top);


        START_VECTOR = Math.sign(TARGET_POSITION - START_POSITION);

        let nexStep = () => {
            //функция работает корректно тольно для перемещения обьекта вдоль одной оси! При переменщениях в разных направлениях будет скачок.
            let newPosition = parseInt(this.DOM.style.top) + STEP * START_VECTOR;
            let newVector = Math.sign(TARGET_POSITION - newPosition);

            if (newVector == 0 && newVector == 0) {        // завершение функции если обьект у цели и вектор нулевой
                this.DOM.style.top = newPosition + 'px';
                this.activPositioning = false;
                return;
            }

            if (newVector == START_VECTOR && newVector == START_VECTOR) {
                this.DOM.style.top = newPosition + 'px';
                setTimeout(nexStep, DELTA_TIME);
            }
            else {
                this.DOM.style.top = TARGET_POSITION + 'px';
                this.activPositioning = false;
                return;
            }
        }
        nexStep()
    }
    this.moveToSelfPosition = () => {
        const moveToSelfPositionX = this.mapPosition[0] * this.listSize[0];
        const moveToSelfPositionY = this.mapPosition[1] * this.listSize[1];

        this.moveToY(moveToSelfPositionY)

        let clock = setInterval(() => {
            // print(moveToSelfPositionY)
            if (moveToSelfPositionY === parseInt(this.DOM.style.top)) {
                this.moveToX(moveToSelfPositionX);
                clearTimeout(clock);
            }
        }, 1000)
    }

}

function getRandomColor() {
    const CELL_COLOR = ['red', 'yellow', 'grey', 'green'];
    let collor = CELL_COLOR[Math.floor(Math.random() * CELL_COLOR.length)];
    // print(collor)
    return collor;
}

function createCells(amount) {
    //функция генерирует заданное колличество ячеек и записывает их в глобальный массив
    for (let i = 0; i < amount; i++) {
        let cell = new Cell('URT' + String(Math.floor(Math.random() * 1000)), 'UU2', getRandomColor());
        cell.moveToSelfPosition();
        CELL_LIST.push[cell]
    }
}




function main() {
    createCells(3);
}

main();