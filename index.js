import init, { World } from "./pkg/game_of_life.js";

window.world = null;

const TICK_INTERVAL = 1000;

const stop = () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

const start = () => {
    intervalId = setInterval(tick, TICK_INTERVAL);
}

let tickCounter = 0;
const tick = () => {
    world.step();
    
    tickCounter++;
    document.getElementById("time").innerHTML = tickCounter;
}

window.update_js = (x, y, value) => {
    let wel = document.getElementById('world');
    let col = wel.querySelector(`tr:nth-child(${x + 1})`);
    if (col) {
        let cel = col.querySelector(`td:nth-child(${y + 1})`);
        if (cel) { 
            cel.classList = value ? 'alive' : 'dead';
        }
    }
}

var intervalId = 0;
let isDragging = false;

document.addEventListener('mouseup', () => { isDragging = false; });

const activateCell = (el, row, col) => {
    world.set_value(row, col, true);
    el.classList = 'alive';
};

const run = async () => {
    await init();
    window.world = new World();


    document.getElementById('stop-button').addEventListener('click', stop);
    document.getElementById('start-button').addEventListener('click', start);
    document.getElementById('random-button').addEventListener('click', () => {
        let size = World.get_size();
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let alive = Math.random() < 0.5;
                world.set_value(i, j, alive);
                update_js(i, j, alive);
            }
        }
    });

    document.getElementById('clear-button').addEventListener('click', () => {
        let size = World.get_size();
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let alive = false;
                world.set_value(i, j, alive);
                update_js(i, j, alive);
            }
        }
    });

    let size = World.get_size();

    let wel = document.getElementById('world');
    for (let i = 0; i < size; i++) {
        var tr = document.createElement('tr');
        wel.append(tr);
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            tr.append(td);

            let ii = i;
            let jj = j;
            td.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
                activateCell(e.currentTarget, ii, jj);
            });
            td.addEventListener('mouseover', (e) => {
                if (isDragging) activateCell(e.currentTarget, ii, jj);
            });
        }
    }
};
run();

