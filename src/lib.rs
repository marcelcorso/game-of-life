mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn update_js(x: usize, y: usize, value: bool);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub static SIZE: usize = 100;

#[wasm_bindgen]
pub struct World {
    cells: [[bool; SIZE]; SIZE],
}

#[wasm_bindgen]
impl World {
    #[wasm_bindgen(constructor)]
    pub fn new() -> World {
        utils::set_panic_hook();
        World {
            cells: [[false; SIZE]; SIZE],
        }
    }

    pub fn get_size() -> usize {
        SIZE
    }

    pub fn set_value(&mut self, x: usize, y: usize, value: bool) {
        if x < SIZE && y < SIZE {
            self.cells[x][y] = value;
        }
    }

    pub fn step(&mut self) {
        let mut next = [[false; SIZE]; SIZE];
        for (rowi, row) in self.cells.iter().enumerate() {
            for (celli, cell) in row.iter().enumerate() {
                let mut living_neigh_count: u32 = 0;

                for dr in [-1i32, 0, 1] {
                    for dc in [-1i32, 0, 1] {
                        if dr == 0 && dc == 0 {
                            continue;
                        } // skip self
                        let r = rowi as i32 + dr;
                        let c = celli as i32 + dc;
                        if r >= 0 && c >= 0 && r < SIZE as i32 && c < SIZE as i32 {
                            if self.cells[r as usize][c as usize] {
                                living_neigh_count += 1;
                            }
                        }
                    }
                }

                if *cell {
                    if living_neigh_count == 2 || living_neigh_count == 3 {
                        next[rowi][celli] = true;
                    } else {
                        update_js(rowi, celli, false);
                    }
                } else if living_neigh_count == 3 {
                    next[rowi][celli] = true;
                    update_js(rowi, celli, true);
                }
            }
        }

        self.cells = next;
    }
}
