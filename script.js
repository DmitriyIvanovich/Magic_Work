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
    cargoPositioningActive: false,

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
        } this.map.push([undefined, undefined])

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

    this.DOM.addEventListener('click', (event) => {
        if (!conteiner.cargoPositioningActive) {
            // print(conteiner.cargoPositioningActive)
            for (let element of CELL_LIST) {
                if (element.DOM === event.target) {
                    element.pullOut();
                    this.fun();
                }
            }
        }
    })
    this.fun = () => {
        let domComent = document.getElementById('coment');
        let nextMamNPosition = this.parrentBox.map[this.mapPosition[0] + 1][this.mapPosition[1]];
        if (nextMamNPosition !== null && nextMamNPosition !== undefined){
            print(1)
            let phrases=["Этот груз ты не можешь переместить!", "Серега, спину сломаешь!!!", "Неа", "Чуть правее", "Не сможешь сдвинуть!"];
            let phrase = phrases[Math.floor(Math.random() * phrases.length)];
            domComent.innerText=phrase;
        }
        else{
            domComent.innerText = '';  
        }
    }
    !function (elDOM) {
        // установка элемента на стартовое значение
        const START_POSITION_X = conteiner_X + 50;
        const START_POSITION_Y = 0;
        elDOM.style.left = START_POSITION_X + 'px';
        elDOM.style.top = START_POSITION_Y + 'px';
    }(this.DOM);

    !function (parrentBox, mapPosition, self) {
        //определение начальной секции обьекта на карте
        for (let i = 0; i < parrentBox.n; i++) {
            for (let j = 0; j < parrentBox.m; j++) {
                if (parrentBox.map[i][j] === null && (mapPosition[0] === null)) {
                    parrentBox.map[i][j] = self;
                    mapPosition[0] = i;
                    mapPosition[1] = j;
                }
            }
        }
    }(this.parrentBox, this.mapPosition, this);



    this.moveToX = (to) => {
        //функция дает знать о перемещении тем, что изменяется состояние активности позиционирования обьекта
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
    };
    this.moveToCection = (toX, toY) => {
        //перемещение происходит спеерва по оси У а потом по Х!!!
        this.activPositioning = true;
        const moveToPositionX = toX * this.listSize[0];
        const moveToPositionY = conteiner_Y - SIZE_CELL_Y - toY * this.listSize[1];

        this.moveToY(moveToPositionY)
        let clock1 = setInterval(() => {
            if (moveToPositionY === parseInt(this.DOM.style.top)) {
                this.moveToX(moveToPositionX);
                clearTimeout(clock1);
            }
        }, 20)
        let clock2 = setInterval(() => {
            if (moveToPositionX === parseInt(this.DOM.style.left)) {
                clearTimeout(clock2);
                this.actionsAfterMovement();
            }
        }, 20)
    }
    this.actionsAfterMovement = () => {
        //действия, которые выполняются после завершения движения ячеек
        let cellsmoveActive;
        for (let el of CELL_LIST) {
            if (el.activPositioning === true) {
                cellsmoveActive = true;
                break;
            }
        }
        if (!cellsmoveActive){
            conteiner.cargoPositioningActive = false;
        }
    }
    this.moveToCectionX = (to) => {
        this.moveToCection(to, this.mapPosition[1])
    }
    this.moveToCectionY = (to) => {
        this.moveToCection(this.mapPosition[1], to)
    }

    this.moveInConteiner = () => {
        conteiner.cargoPositioningActive = true;
        setTimeout(() => {
            const homeXPosition = this.mapPosition[0];
            const homeYPosition = this.mapPosition[1];
            this.moveToCection(homeXPosition, homeYPosition);
        }, 700)
    }
    this.pullOut = () => {
        let nextMamNPosition = this.parrentBox.map[this.mapPosition[0] + 1][this.mapPosition[1]];
        if (nextMamNPosition === null || nextMamNPosition === undefined) {
            // print("fff")
            this.moveToCectionX(this.parrentBox.n + 0.2);
            this.parrentBox.map[this.mapPosition[0]][this.mapPosition[1]] = null;
            let clock = setInterval(() => {
                if (this.activPositioning === false) {
                    clearTimeout(clock)
                    setTimeout(() => {
                        this.delCell();
                    }, 700);
                }
            }, 100)
        }
        else {
            let DataListRowWithVoidCection;
            let NumberRowWithVoidCextion;
            let parrentMapList = this.parrentBox.map
            for (let i = 0; i < parrentMapList.length; i++) {
                for (let j = 0; j < parrentMapList[i].length; j++) {
                    if (parrentMapList[i][j] === null && DataListRowWithVoidCection === undefined) {
                        NumberRowWithVoidCextion = i;
                        DataListRowWithVoidCection = parrentMapList[i]
                        // print(DataListRowWithVoidCection)
                        // print(NumberRowWithVoidCextion)
                    }
                }
            }
        }
    }
    this.delCell = () => {
        this.DOM.remove();
        CELL_LIST.splice(CELL_LIST.indexOf(this), 1)
        if (CELL_LIST.length === 0) {
            alert("молодец!")
        }
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
        cell.moveInConteiner();
        CELL_LIST.push(cell)
    }
}

function main() {
    createCells(7);
}

main();