const CELL_X = 150;
const CELL_Y = 100;
let lodingArea_X = 600;
let lodingArea_Y = 200;
const PADDING = 10;

let print = console.log;


let conteiner = {
    DOM: document.getElementById('conteiner'),
    width: null,
    height: null,
    n: null,
    m: null,
    cellX: null,
    cellY: null,
    map: [],
    lodingArea: document.getElementById('lodingArea'),

    load_data(cellX, cellY, lodingArea_X, lodingArea_Y) {
        this.width = lodingArea_X + PADDING * 2;
        this.height = lodingArea_Y + PADDING * 2;
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
conteiner.load_data(CELL_X, CELL_Y, lodingArea_X, lodingArea_Y);

function Cell(id, group, listSize, parrentBox, color = "red",) {
    this.id = id;               //STRING
    this.group = group;         //STRING
    this.listSize = listSize;
    this.color = color;
    this.parrentBox = parrentBox;
    this.DOM = document.createElement('div');
    this.DOM.textContent = this.id;
    this.DOM.style.background = this.color;
    this.DOM.style.width = String(this.listSize[0]) + 'px';
    this.DOM.style.height = String(this.listSize[1]) + 'px';
    this.DOM.id = id;
    this.DOM.className = 'cell';
    parrentBox.appendChild(this.DOM);

    this.create = () => {
        print("create start");
        this.DOM.style.left = '650px'

    };
    this.create();
}
let cell_1 = new Cell('URT725L', 'UU2', [CELL_X, CELL_Y], conteiner.lodingArea);
print(cell_1);
print(conteiner);
print("1ы211")

