const SIZE_CELL_X = 150;
const SIZE_CELL_Y = 100;
let conteiner_X = 600;
let conteiner_Y = 200;
const PADDING = 10;

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
    this.mapPosition = null;

    print(this.parrentBox)

    this.create = () => {
        this.DOM.style.left = '650px';
        this.DOM.style.top = '0px';

        for (let i = 0; i < this.parrentBox.n; i++) {
            for (let j = 0; j < this.parrentBox.m; j++) {
                if (this.parrentBox.map[i][j] === null && !this.mapPosition) {
                    this.parrentBox.map[i][j] = this.id;
                    this.mapPosition = [i, j]
                }
            }
        }
    };
    this.create();


    this.moveToCoordinats =(toX, toY) => {
        //координата определяется верхним левым углом прямоугольника "груз"
        const STEP = 40;
        const DELTA_TIME = 30; // задержка шага. влияет на частоту кадров
        const START_VECTOR = []; // хранит начальное направление к цели. Если в ходе направление сменится, значит обьект прошел цель
        const TARGET_POSITION = [toX, toY];
        const START_POSITION = [parseInt(this.DOM.style.left), parseInt(this.DOM.style.top)]

        //проверка на отсутствие аргументов
        if (toX === undefined || toX === null) TARGET_POSITION[0] = parseInt(this.DOM.style.left);
        if (toY === undefined) TARGET_POSITION[1] = parseInt(this.DOM.style.top);


        START_VECTOR.push(Math.sign(TARGET_POSITION[0] - START_POSITION[0]), Math.sign(TARGET_POSITION[1] - START_POSITION[1]))

        let nexStep = () => {
            let newPosition = [parseInt(this.DOM.style.left) + STEP * START_VECTOR[0], parseInt(this.DOM.style.top) + STEP * START_VECTOR[1]];
            let newVector = [Math.sign(TARGET_POSITION[0] - newPosition[0]), Math.sign(TARGET_POSITION[1] - newPosition[1])];
            print("newVector: " + newVector)
            print("START_VECTOR: " + START_VECTOR)
            if (newVector[0] == START_VECTOR[0] && newVector[1] == START_VECTOR[1]) {
                print('$$$')
                // print('newPosition: ' + newPosition)
                this.DOM.style.left = newPosition[0] + 'px';
                this.DOM.style.top = newPosition[1] + 'px';
            }
            print('$$$: ' + this.DOM.style.left);

            newPosition = [parseInt(this.DOM.style.left) + STEP * START_VECTOR[0], parseInt(this.DOM.style.top) + STEP * START_VECTOR[1]];
            newVector = [Math.sign(TARGET_POSITION[0] - newPosition[0]), Math.sign(TARGET_POSITION[1] - newPosition[1])];
            print("newVector: " + newVector)
            print("START_VECTOR: " + START_VECTOR)
            if (newVector[0] == START_VECTOR[0] && newVector[1] == START_VECTOR[1]) {
                setTimeout(nexStep, DELTA_TIME)
            }
            else {
                this.DOM.style.left = TARGET_POSITION[0] + 'px';
                this.DOM.style.top = TARGET_POSITION[1] + 'px';
            }
        };

        nexStep()
    };
    this.moveToX = (to) => {
        this.moveToCoordinats(to);
    };
    this.moveToY = (to) => {
        this.moveToCoordinats(null, to);
    }



}
let cell_1 = new Cell('URT725L', 'UU2');
cell_1.moveToX(0);

