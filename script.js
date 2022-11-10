const CELL_X = 150;
const CELL_Y = 100;
let conteiner_X = 600;
let conteiner_Y = 200;
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
conteiner.load_data(CELL_X, CELL_Y, conteiner_X, conteiner_Y);


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
    parrentBox.DOM.appendChild(this.DOM);
    this.mapPosition = null;

    print(this.parrentBox)

    this.create = () => {
        // print("create start");
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
    const STEP = 4;
    this.move = (left, top) => {
        let cellStyleLeft = parseInt(this.DOM.style.left);

        if (left < cellStyleLeft) {
            let newCellStyleLeft = parseInt(cellStyleLeft) - STEP;
            if (newCellStyleLeft < 0) newCellStyleLeft = 0;
            print(newCellStyleLeft)
            this.DOM.style.left = newCellStyleLeft + 'px';
            print(this.DOM.style.left)
            if (left < newCellStyleLeft) {
                setTimeout(this.move, 20, left, top);
            }
        }
    }


}
let cell_1 = new Cell('URT725L', 'UU2', [CELL_X, CELL_Y], conteiner);
cell_1.move(0, 0);

// print(cell_1);
// print(conteiner);
print(cell_1.listSize)

