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
    console.log(`update(${x}, ${y}, ${value}`);
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
const run = async () => {
    await init();
    console.log("gonna create a world")
    window.world = new World(); 


    document.getElementById('stop-button').addEventListener('click', stop);
    document.getElementById('start-button').addEventListener('click', start);

    console.log(world);
    let size = World.get_size();

    let wel = document.getElementById('world');
    for (let i = 0; i < size; i++) {
        var tr = document.createElement('tr');
        wel.append(tr);
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            tr.append(td);


            let ii = i;
            let jj = j
            td.addEventListener('click', (e) => {
                let isAlive = e.currentTarget.classList[0] == "alive" ? true : false; 
                // togle 
                isAlive = !isAlive; 
                // send to rust
                world.set_value(ii, jj, isAlive);
                // update ui
                e.currentTarget.classList = isAlive ? 'alive' : 'dead';
            });
        }
    }
};
run();

